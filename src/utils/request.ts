import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStoreHook } from "@/store/modules/user";
import { ResultEnum } from "@/enums/ResultEnum";
import { TOKEN_KEY } from "@/enums/CacheEnum";
import qs from "qs";
import MD5 from "crypto-js/md5";

function signWithSalt(message: string, salt: string): string {
  const saltedMessage = salt + message;
  return MD5(saltedMessage).toString();
}

function getTimestampInSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

// 创建 axios 实例
const service = axios.create({
  baseURL: "/",
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
  paramsSerializer: (params) => {
    return qs.stringify(params);
  },
});

const HeaderAuthorization = "Authorization";
const HeaderUid = "Uid";
const HeaderToken = "Token";
const HeaderTerminal = "Terminal";
const HeaderTimestamp = "Timestamp";

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem(TOKEN_KEY);
    // 请求带token
    const dv = "device_id";
    const ts = getTimestampInSeconds().toString();
    const tk = accessToken;
    const uid = 3;
    console.log("accessToken", accessToken);
    if (tk) {
      config.headers = Object.assign({}, config.headers, {
        [HeaderAuthorization]: tk,
        [HeaderUid]: uid,
        [HeaderToken]: signWithSalt(dv, ts),
        [HeaderTerminal]: dv,
        [HeaderTimestamp]: ts,
      });
    } else {
      // 未登录时的加密方式
      config.headers = Object.assign({}, config.headers, {
        [HeaderToken]: signWithSalt(dv, ts),
        [HeaderTerminal]: dv,
        [HeaderTimestamp]: ts,
      });
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 检查配置的响应类型是否为二进制类型（'blob' 或 'arraybuffer'）, 如果是，直接返回响应对象
    if (
      response.config.responseType === "blob" ||
      response.config.responseType === "arraybuffer"
    ) {
      return response;
    }

    const { code, data, msg } = response.data;
    if (code === ResultEnum.SUCCESS) {
      return response.data;
    }

    ElMessage.error(msg || "系统出错");
    return Promise.reject(new Error(msg || "Error"));
  },
  (error: any) => {
    // 异常处理
    if (error.response.data) {
      const { code, msg } = error.response.data;
      if (code === ResultEnum.TOKEN_INVALID) {
        ElNotification({
          title: "提示",
          message: "您的会话已过期，请重新登录",
          type: "info",
        });
        useUserStoreHook()
          .resetToken()
          .then(() => {
            location.reload();
          });
      } else {
        ElMessage.error(msg || "系统出错");
      }
    }
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default service;
