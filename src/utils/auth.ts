// 访问 token 缓存的 key
const ACCESS_TOKEN_KEY = "access_token";

function getAccessToken(): string {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
}

function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export { getAccessToken, setAccessToken, clearToken };

const UID_KEY: string = "Uid";

export function getUid() {
  return localStorage.getItem(UID_KEY);
}

export function setUid(uid: string) {
  return localStorage.setItem(UID_KEY, uid);
}

import { useUserStore } from "@/store";

/**
 * 权限判断
 */
export function hasPerm(value: string | string[], type: "button" | "role" = "button"): boolean {
  const { roles, perms } = useUserStore().userInfo;

  return true;
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
