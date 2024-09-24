import { resetRouter } from "@/router";
import { store } from "@/store";
import { TOKEN_KEY } from "@/enums/CacheEnum";
import { LoginReq, UserInfoResp } from "@/api/types";
import { loginApi, logoutApi } from "@/api/auth";
import { getUserInfoApi } from "@/api/account";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserInfoResp>(<UserInfoResp>{
    roles: [],
    perms: [],
  });

  // 登录
  function login(loginData: LoginReq) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData)
        .then((data) => {
          console.log("login", data);
          localStorage.setItem(TOKEN_KEY, data.data.token?.access_token); // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise<UserInfoResp>((resolve, reject) => {
      getUserInfoApi()
        .then((data) => {
          if (!data) {
            reject("Verification failed, please Login again.");
            return;
          }
          if (!data.data.roles || data.data.roles.length <= 0) {
            reject("getUserInfo: roles must be a non-null array!");
            return;
          }
          Object.assign(user.value, { ...data.data });
          resolve(data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // user logout
  function logout() {
    return new Promise<void>((resolve, reject) => {
      logoutApi()
        .then(() => {
          localStorage.setItem(TOKEN_KEY, "");
          location.reload(); // 清空路由
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // remove token
  function resetToken() {
    console.log("resetToken");
    return new Promise<void>((resolve) => {
      localStorage.setItem(TOKEN_KEY, "");
      resetRouter();
      resolve();
    });
  }

  return {
    user,
    login,
    getUserInfo,
    logout,
    resetToken,
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
