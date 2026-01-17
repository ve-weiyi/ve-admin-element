import { store } from "@/store";
import { AuthStorage } from "@/utils/auth";
import { usePermissionStoreHook } from "@/store/modules/permission";
import { useTagsViewStore } from "@/store";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<any>({} as any);
  const rememberMe = ref(AuthStorage.getRememberMe());

  function login(loginRequest: any) {
    return new Promise<void>((resolve, reject) => {
      rememberMe.value = loginRequest.rememberMe ?? false;
      AuthStorage.setTokens("mock-token", "mock-refresh-token", rememberMe.value);
      resolve();
    });
  }

  function getUserInfo() {
    return new Promise<any>((resolve, reject) => {
      const mockData: any = {
        userId: "1",
        username: "admin",
        nickname: "管理员",
        avatar: "https://foruda.gitee.com/avatar/1676896186784283273/716974_youlaitech_1578975358.png",
        roles: ["ADMIN"],
        perms: ["*:*:*"],
      };
      Object.assign(userInfo.value, mockData);
      resolve(mockData);
    });
  }

  function logout() {
    return new Promise<void>((resolve) => {
      resetAllState();
      resolve();
    });
  }

  function resetAllState() {
    resetUserState();
    usePermissionStoreHook().resetRouter();
    useTagsViewStore().delAllViews();
    return Promise.resolve();
  }

  function resetUserState() {
    AuthStorage.clearAuth();
    userInfo.value = {} as any;
  }

  function refreshToken() {
    const refreshToken = AuthStorage.getRefreshToken();
    if (!refreshToken) {
      return Promise.reject(new Error("没有有效的刷新令牌"));
    }
    return new Promise<void>((resolve) => {
      AuthStorage.setTokens("mock-token", "mock-refresh-token", AuthStorage.getRememberMe());
      resolve();
    });
  }

  return {
    userInfo,
    rememberMe,
    isLoggedIn: () => !!AuthStorage.getAccessToken(),
    getUserInfo,
    login,
    logout,
    resetAllState,
    resetUserState,
    refreshToken,
  };
});

export function useUserStoreHook() {
  return useUserStore(store);
}
