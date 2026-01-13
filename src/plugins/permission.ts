import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import NProgress from "@/utils/nprogress";
import { getAccessToken, getTerminalId, setTerminalId } from "@/utils/token";
import router from "@/router";
import { usePermissionStore, useUserStore } from "@/store";
import { AuthAPI } from "@/api/auth";

// 获取客户端信息
const getClientInfo = async (): Promise<void> => {
  try {
    const res = await AuthAPI.getClientInfoApi();
    setTerminalId(res.data.terminal_id);
  } catch {
    console.error("获取客户端信息失败");
  }
};

export function setupPermission() {
  const whiteList = ["/login"];

  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    if (!getTerminalId()) {
      await getClientInfo();
    }

    try {
      const isLoggedIn = !!getAccessToken(); // 判断是否登录

      // 未登录处理
      if (!isLoggedIn) {
        if (whiteList.includes(to.path)) {
          next();
        } else {
          next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
          NProgress.done();
        }
        return;
      }

      // 已登录登录页重定向
      if (to.path === "/login") {
        next({ path: "/" });
        return;
      }

      const permissionStore = usePermissionStore();
      const userStore = useUserStore();

      // 动态路由生成
      if (!permissionStore.isRoutesLoaded) {
        if (!userStore.userInfo?.roles?.length) {
          await userStore.getUserInfo();
        }

        const dynamicRoutes = await permissionStore.generateRoutes();
        dynamicRoutes.forEach((route: RouteRecordRaw) => {
          router.addRoute(route);
        });

        next({ ...to, replace: true });
        return;
      }

      // 路由404检查
      if (to.matched.length === 0) {
        next("/404");
        return;
      }

      // 动态标题设置
      const title = (to.params.title as string) || (to.query.title as string);
      if (title) {
        to.meta.title = title;
      }

      next();
    } catch (error) {
      // 错误处理：重置状态并跳转登录
      console.error("Route guard error:", error);
      await useUserStore().clearSessionAndCache();
      next("/login");
      NProgress.done();
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
