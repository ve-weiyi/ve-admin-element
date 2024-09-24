import { store } from "@/store";
import { usePermissionStoreHook } from "@/store/modules/permission";

import type { LoginReq, UserInfoResp } from "@/api/types";
import { loginApi, logoutApi } from "@/api/auth";
import { getUserInfoApi } from "@/api/user";

import { clearToken, setAccessToken, setUid } from "@/utils/auth";

export const useUserStore = defineStore("user", () => {
  const userInfo = useStorage<UserInfoResp>("userInfo", {} as UserInfoResp);

  /**
   * 登录
   *
   * @param {LoginFormData}
   * @returns
   */
  function login(loginData: LoginReq) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((data) => {
          console.log("login", data);
          setAccessToken(data.data.token?.access_token); // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          setUid(data.data.token?.user_id);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 获取用户信息
   *
   * @returns {UserInfo} 用户信息
   */
  function getUserInfo() {
    return new Promise<UserInfoResp>((resolve, reject) => {
      getUserInfoApi()
        .then((data) => {
          if (!data) {
            reject("Verification failed, please Login again.");
            return;
          }
          Object.assign(userInfo.value, { ...data.data });
          resolve(data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 登出
   */
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          resetUserSession();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 重置用户会话
   *
   * @returns
   */
  function resetUserSession() {
    return new Promise<void>((resolve) => {
      clearToken();
      usePermissionStoreHook().resetRouter();
      resolve();
    });
  }

  return {
    userInfo,
    getUserInfo,
    login,
    logout,
    resetUserSession,
  };
});

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useUserStoreHook() {
  return useUserStore(store);
}
