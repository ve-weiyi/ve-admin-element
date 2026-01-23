import { useUserStoreHook } from "@/store/modules/user";
import router from "@/router";

/**
 * 应用名称
 */
export const APP_NAME = "admin-web";

/**
 * 存储键名常量
 */
export const STORAGE_KEYS = {
  UID: `${APP_NAME}:auth:uid`,
  ACCESS_TOKEN: `${APP_NAME}:auth:access_token`,
  REFRESH_TOKEN: `${APP_NAME}:auth:refresh_token`,
  TERMINAL_ID: `${APP_NAME}:auth:terminal_id`,
  REMEMBER_ME: `${APP_NAME}:auth:remember_me`,
} as const;

/**
 * 本地凭证与偏好的读写
 */
export const AuthStorage = {
  getUid() {
    const isRememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    const storage = isRememberMe ? localStorage : sessionStorage;
    return storage.getItem(STORAGE_KEYS.UID);
  },
  getAccessToken() {
    const isRememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    const storage = isRememberMe ? localStorage : sessionStorage;
    return storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
  getRefreshToken() {
    const isRememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    const storage = isRememberMe ? localStorage : sessionStorage;
    return storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  },
  setTokens(uid: string, accessToken: string, refreshToken: string) {
    const isRememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    const storage = isRememberMe ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.UID, uid);
    storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },
  getTerminalId() {
    const isRememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    const storage = isRememberMe ? localStorage : sessionStorage;
    return storage.getItem(STORAGE_KEYS.TERMINAL_ID);
  },
  setTerminalId(tid: string) {
    const isRememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
    const storage = isRememberMe ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.TERMINAL_ID, tid);
  },
  getRememberMe() {
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
  },
  setRememberMe(rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, "true");
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    }
  },
  clearAuth() {
    // localStorage.clear();
    // sessionStorage.clear();
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },
};

/**
 * 权限判断
 */
export function hasPerm(value: string | string[], type: "button" | "role" = "button"): boolean {
  return true;
  // const { roles, perms } = useUserStoreHook().userInfo;
  //
  // if (!roles || !perms) {
  //   return false;
  // }
  //
  // // 超级管理员拥有所有权限
  // if (type === "button" && roles.includes(ROLE_ROOT)) {
  //   return true;
  // }
  //
  // const auths = type === "button" ? perms : roles;
  // return typeof value === "string"
  //   ? auths.includes(value)
  //   : value.some((perm) => auths.includes(perm));
}

/**
 * 重定向到登录页面
 */
export async function redirectToLogin(message: string = "请重新登录"): Promise<void> {
  ElNotification({
    title: "提示",
    message,
    type: "warning",
    duration: 3000,
  });

  await useUserStoreHook().resetAllState();

  try {
    // 跳转到登录页，保留当前路由用于登录后跳转
    const currentPath = router.currentRoute.value.fullPath;
    await router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
  } catch (error) {
    console.error("Redirect to login error:", error);
    // 强制跳转，即使路由重定向失败
    window.location.href = "/login";
  }
}
