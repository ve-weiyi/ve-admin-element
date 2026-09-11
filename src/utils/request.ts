/**
 * 请求实例
 *
 * @description
 * 采用信封响应契约：拦截器返回完整响应体，由调用方按业务码判定结果。
 */
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import { ApiCodeEnum } from "@/enums/api";
import { useUserStoreHook } from "@/stores/user";
import { usePermissionStoreHook } from "@/stores/permission";
import { APP_NAME, AuthStorage, redirectToLogin } from "@/utils/auth";

const HeaderAppName = "App-Name";
const HeaderTimestamp = "Timestamp";
const HeaderXDeviceId = "X-Device-Id";
const HeaderXDeviceToken = "X-Device-Token";

const HeaderUid = "Uid";
const HeaderAuthorization = "Authorization";

// 记录已重试的请求，防止无限循环
const retriedConfigs = new WeakSet<InternalAxiosRequestConfig>();

// HTTP 请求实例
const http = axios.create({
  baseURL: "",
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
  // 数组参数序列化为 ids=1&ids=2，而非 ids[]=1&ids[]=2
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

// 请求拦截器
http.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const uid = AuthStorage.getUid();
    const accessToken = AuthStorage.getAccessToken();
    const deviceId = AuthStorage.getDeviceId() || "";
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(deviceId + timestamp)
    );
    const deviceToken = Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    config.headers = Object.assign({}, config.headers, {
      [HeaderAppName]: APP_NAME,
      [HeaderTimestamp]: timestamp,
      [HeaderXDeviceId]: deviceId,
      [HeaderXDeviceToken]: deviceToken,
      [HeaderUid]: uid,
      [HeaderAuthorization]: accessToken,
    });
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 响应拦截器
http.interceptors.response.use(
  async (response: AxiosResponse<ApiResponse>) => {
    // 二进制数据直接返回
    if (response.config.responseType === "blob" || response.config.responseType === "arraybuffer") {
      return response;
    }

    const { code, msg } = response.data;

    switch (code) {
      case ApiCodeEnum.SUCCESS:
        break;

      case ApiCodeEnum.ACCESS_TOKEN_INVALID: {
        // Token 过期：尝试刷新 token 后自动重试一次
        const { config } = response;
        if (retriedConfigs.has(config)) {
          await redirectToLogin("登录已过期，请重新登录");
          return Promise.reject(new Error("Token Invalid"));
        }
        retriedConfigs.add(config);
        try {
          const userStore = useUserStoreHook();
          await userStore.refreshTokenOnce();
          const token = AuthStorage.getAccessToken();
          if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
          }
          return http(config);
        } catch {
          await redirectToLogin("登录已过期，请重新登录");
          return Promise.reject(new Error("Token refresh failed"));
        }
      }

      case ApiCodeEnum.REFRESH_TOKEN_INVALID:
        // Refresh token 失效：无法续期，跳转登录
        await redirectToLogin("登录已过期，请重新登录");
        return Promise.reject(new Error(msg || "Token Invalid"));

      case ApiCodeEnum.PERMISSION_DENIED: {
        // 权限不足：刷新权限快照后提示
        const permissionStore = usePermissionStoreHook();
        await permissionStore.reloadPermissionSnapshotOnce();
        ElMessage.error(msg || "权限不足");
        return Promise.reject(new Error(msg || "权限不足"));
      }

      default:
        ElMessage.error(msg || "请求失败");
        return Promise.reject(new Error(msg || "请求失败"));
    }

    return response.data as any;
  },

  (error: AxiosError) => {
    console.error("request error", error); // for debug

    const { response } = error;
    if (!response) {
      ElMessage.error("网络连接失败");
      return Promise.reject(error);
    }

    let message = error.message;
    if (message === "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substring(message.length - 3) + "异常";
    }
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

export default http;
