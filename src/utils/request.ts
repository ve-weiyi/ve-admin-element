import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import MD5 from "crypto-js/md5";
import { APP_NAME, AuthStorage, redirectToLogin } from "./auth";
import { useUserStoreHook } from "@/store/modules/user";

const HeaderAppName = "App-Name";
const HeaderTimestamp = "Timestamp";
const HeaderXTerminalId = "X-Terminal-Id";
const HeaderXTerminalToken = "X-Terminal-Token";

const HeaderUid = "Uid";
const HeaderToken = "Token";
const HeaderAuthorization = "Authorization";

const axiosInstance = axios.create({
  baseURL: "",
  timeout: 10000,
  withCredentials: false, // 禁用 Cookie
  // 请求头
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // 请求携带用户token
    const uid = AuthStorage.getUid();
    const accessToken = AuthStorage.getAccessToken();
    // 签名
    const terminalId = AuthStorage.getTerminalId() || "";
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const terminalToken = MD5(terminalId + timestamp).toString();

    config.headers = Object.assign({}, config.headers, {
      [HeaderAppName]: APP_NAME,
      [HeaderTimestamp]: timestamp,
      [HeaderXTerminalId]: terminalId,
      [HeaderXTerminalToken]: terminalToken,
      [HeaderUid]: uid,
      [HeaderAuthorization]: accessToken,
    });
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
// 配置响应拦截器
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    // 检查配置的响应类型是否为二进制类型（'blob' 或 'arraybuffer'）, 如果是，直接返回响应对象
    if (response.config.responseType === "blob" || response.config.responseType === "arraybuffer") {
      return response;
    }

    const { code, data, msg } = response.data;

    // 接口响应成功，判断业务错误码
    switch (code) {
      case 200:
        break;
      case 400:
        return Promise.reject(new Error(msg || "请求参数错误"));
      case 401:
        return Promise.reject(new Error(msg || "用户未登录"));
      case 402:
        return retryWithRefresh(response.config);
      case 403:
        return Promise.reject(new Error(msg || "无权限访问"));
      default:
        return Promise.reject(new Error(msg || "系统错误"));
    }
    return response.data;
  },
  async (error: AxiosError) => {
    console.error("request error", error); // for debug
    let { message } = error;
    if (message == "Network Error") {
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

// 对外暴露
export default axiosInstance;

// ============================================
// Token 刷新重试
// ============================================

type Pending = { resolve: (v: unknown) => void; reject: (e: Error) => void };

let refreshing = false;
const queue: Pending[] = [];

async function retryWithRefresh(config: InternalAxiosRequestConfig): Promise<unknown> {
  return new Promise((resolve, reject) => {
    queue.push({ resolve, reject });

    if (refreshing) return;
    refreshing = true;

    useUserStoreHook()
      .refreshToken({
        user_id: AuthStorage.getUid() || "",
        grant_type: "refresh_token",
        refresh_token: AuthStorage.getRefreshToken() || "",
      })
      .then(() => {
        queue.forEach(({ resolve }) => axiosInstance(config).then(resolve).catch(reject));
      })
      .catch(async () => {
        queue.forEach(({ reject }) => reject(new Error("Token refresh failed")));
        await redirectToLogin("登录已过期，请重新登录");
      })
      .finally(() => {
        queue.length = 0;
        refreshing = false;
      });
  });
}
