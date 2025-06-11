import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import MD5 from "crypto-js/md5";
import { useUserStore } from "@/store";
import { getAccessToken, getUid } from "./auth";

const HeaderAppName = "App-Name";
const HeaderTimestamp = "Timestamp";
const HeaderTerminalId = "Terminal-Id";
const HeaderXTsToken = "X-Ts-Token";

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
    const uid = getUid();
    const accessToken = getAccessToken();
    // 签名
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const sign = MD5(`${timestamp}${uid}${accessToken}`).toString();

    config.headers = Object.assign({}, config.headers, {
      [HeaderAppName]: "admin-web",
      [HeaderUid]: uid,
      [HeaderAuthorization]: accessToken,
      [HeaderTimestamp]: timestamp,
      [HeaderXTsToken]: sign,
    });
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
// 配置响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 检查配置的响应类型是否为二进制类型（'blob' 或 'arraybuffer'）, 如果是，直接返回响应对象
    if (response.config.responseType === "blob" || response.config.responseType === "arraybuffer") {
      return response;
    }

    const { code, data, msg } = response.data;

    // 接口错误码
    switch (code) {
      case 200:
        break;
      case 401:
        ElMessage.error("用户未登录");
        return Promise.reject(msg);
      case 402:
        useUserStore().clearSessionAndCache();
        ElMessage.error("用户登录过期");
        return Promise.reject(msg);
      case 403:
        ElMessage.error("无权限访问");
        return Promise.reject(msg);
      case 500:
        ElMessage.error(msg);
        return Promise.reject(msg);
      default:
        ElMessage.error(msg || "系统出错");
        return Promise.reject(new Error(msg || "Error"));
    }
    return response.data;
  },
  (error: AxiosError) => {
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
