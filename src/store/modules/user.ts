import { store } from "@/store";
import { AuthStorage } from "@/utils/auth";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { useTagsViewStore } from "@/store";
import type {
  EmailLoginReq,
  LoginReq,
  LoginResp,
  PhoneLoginReq,
  RefreshTokenReq,
  ThirdLoginReq,
  UserInfoResp,
} from "@/api/types";
import { AuthAPI } from "@/api/auth";
import { UserAPI } from "@/api/user";

export const useUserStore = defineStore("user", () => {
  // 用户信息
  const userInfo = ref<UserInfoResp>({} as UserInfoResp);
  // 记住我状态
  const rememberMe = ref(AuthStorage.getRememberMe());

  /**
   * 登录
   */
  function login(loginData: LoginReq) {
    return new Promise<LoginResp>((resolve, reject) => {
      AuthAPI.loginApi(loginData)
        .then((res) => {
          console.log("login", res);
          AuthStorage.setTokens(
            res.data.user_id,
            res.data.token?.access_token,
            res.data.token?.refresh_token
          );
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 邮箱登录
   */
  function emailLogin(loginData: EmailLoginReq) {
    return new Promise<LoginResp>((resolve, reject) => {
      AuthAPI.emailLoginApi(loginData)
        .then((res) => {
          console.log("emailLogin", res);
          AuthStorage.setTokens(
            res.data.user_id,
            res.data.token?.access_token,
            res.data.token?.refresh_token
          );
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 手机验证码登录
   */
  function phoneLogin(loginData: PhoneLoginReq) {
    return new Promise<LoginResp>((resolve, reject) => {
      AuthAPI.phoneLoginApi(loginData)
        .then((res) => {
          console.log("phoneLogin", res);
          AuthStorage.setTokens(
            res.data.user_id,
            res.data.token?.access_token,
            res.data.token?.refresh_token
          );
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 第三方登录
   */
  function thirdLogin(loginData: ThirdLoginReq) {
    return new Promise<LoginResp>((resolve, reject) => {
      AuthAPI.thirdLoginApi(loginData)
        .then((res) => {
          console.log("thirdLogin", res);
          AuthStorage.setTokens(
            res.data.user_id,
            res.data.token?.access_token,
            res.data.token?.refresh_token
          );
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 获取用户信息
   */
  function getUserInfo() {
    return new Promise<UserInfoResp>((resolve, reject) => {
      UserAPI.getUserInfoApi()
        .then((res) => {
          if (!res) {
            reject("Verification failed, please Login again.");
            return;
          }
          Object.assign(userInfo.value, { ...res.data });
          resolve(res.data);
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
          // 重置所有系统状态
          resetAllState();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 重置所有系统状态
   * 统一处理所有清理工作，包括用户凭证、路由、缓存等
   */
  function resetAllState() {
    // 1. 重置用户状态
    resetUserState();

    // 2. 重置其他模块状态
    // 重置路由
    usePermissionStoreHook().resetRouter();
    // 清除标签视图
    useTagsViewStore().delAllViews();

    return Promise.resolve();
  }

  /**
   * 重置用户状态
   * 仅处理用户模块内的状态
   */
  function resetUserState() {
    // 清除用户凭证
    AuthStorage.clearAuth();
    // 重置用户信息
    userInfo.value = {} as any;
  }

  /**
   * 刷新 token
   */
  function refreshToken(refreshData: RefreshTokenReq) {
    if (!refreshData.refresh_token) {
      return Promise.reject(new Error("没有有效的刷新令牌"));
    }

    return new Promise<LoginResp>((resolve, reject) => {
      AuthAPI.refreshTokenApi(refreshData)
        .then((res) => {
          // 更新令牌，保持当前记住我状态
          AuthStorage.setTokens(
            res.data.user_id,
            res.data.token?.access_token,
            res.data.token?.refresh_token
          );
          resolve(res.data);
        })
        .catch((error) => {
          console.log(" refreshToken  刷新失败", error);
          reject(error);
        });
    });
  }

  return {
    userInfo,
    rememberMe,
    isLoggedIn: () => !!AuthStorage.getAccessToken(),
    getUserInfo,
    login,
    emailLogin,
    phoneLogin,
    thirdLogin,
    logout,
    resetAllState,
    resetUserState,
    refreshToken,
  };
});

/**
 * 在组件外部使用UserStore的钩子函数
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function useUserStoreHook() {
  return useUserStore(store);
}
