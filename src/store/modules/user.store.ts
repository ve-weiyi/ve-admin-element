import { store } from "@/store";
import { usePermissionStoreHook } from "@/store/modules/permission.store";

import type { LoginReq, UserInfoResp } from "@/api/types";
import { AuthAPI } from "@/api/auth";
import { UserAPI } from "@/api/user";

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
      AuthAPI.loginApi(loginData)
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
      UserAPI.getUserInfoApi()
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
      AuthAPI.logoutApi()
        .then(() => {
          clearSessionAndCache();
          location.reload();
          resolve();
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {});
    });
  }

  /**
   * 清除用户会话和缓存
   */
  function clearSessionAndCache() {
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
    clearSessionAndCache,
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
