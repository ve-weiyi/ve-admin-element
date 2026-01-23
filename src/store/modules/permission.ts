import type { RouteRecordRaw } from "vue-router";
import router, { constantRoutes } from "@/router";
import { store } from "@/store";
import { UserAPI } from "@/api/user";
import type { UserMenu } from "@/api/types";

export const usePermissionStore = defineStore("permission", () => {
  // 所有路由（静态路由 + 动态路由）
  const routes = ref<RouteRecordRaw[]>([]);
  // 混合布局的左侧菜单路由
  const mixLayoutSideMenus = ref<RouteRecordRaw[]>([]);
  // 动态路由是否已生成
  const isRouteGenerated = ref(false);

  /** 生成动态路由 */
  async function generateRoutes(): Promise<RouteRecordRaw[]> {
    try {
      let dynamicRoutes: RouteRecordRaw[];

      if (USE_MOCK_ENV) {
        dynamicRoutes = getMockRoutes();
      } else {
        try {
          const res = await UserAPI.getUserMenusApi();
          const list = res?.data?.list ?? [];
          dynamicRoutes = list.length == 0 ? getMockRoutes() : transformRoutes(list);
        } catch (error) {
          console.warn("获取用户菜单失败，使用模拟路由:", error);
          dynamicRoutes = getMockRoutes();
        }
      }

      routes.value = [...constantRoutes, ...dynamicRoutes];
      isRouteGenerated.value = true;

      return dynamicRoutes;
    } catch (error) {
      console.error("生成路由失败:", error);
      // 路由生成失败，重置状态
      isRouteGenerated.value = false;
      throw error;
    }
  }

  /**
   * 获取模拟路由数据（按rank排序）
   */
  const getMockRoutes = (): RouteRecordRaw[] => {
    return Object.values(routeModules)
      .map((module) => (module as any).default)
      .filter((route) => route)
      .sort((a, b) => {
        const rankA = a.meta?.rank || 999;
        const rankB = b.meta?.rank || 999;
        return rankA - rankB;
      });
  };

  /** 设置混合布局左侧菜单 */
  const setMixLayoutSideMenus = (parentPath: string) => {
    const parentMenu = routes.value.find((item) => item.path === parentPath);
    mixLayoutSideMenus.value = parentMenu?.children || [];
  };

  /** 重置路由状态 */
  const resetRouter = () => {
    // 移除动态添加的路由
    const constantRouteNames = new Set(constantRoutes.map((route) => route.name).filter(Boolean));
    routes.value.forEach((route) => {
      if (route.name && !constantRouteNames.has(route.name)) {
        router.removeRoute(route.name);
      }
    });

    // 重置所有状态
    routes.value = [...constantRoutes];
    mixLayoutSideMenus.value = [];
    isRouteGenerated.value = false;
  };

  return {
    routes,
    mixLayoutSideMenus,
    isRouteGenerated,
    generateRoutes,
    getMockRoutes,
    setMixLayoutSideMenus,
    resetRouter,
  };
});

/** 非组件环境使用权限store */
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}

// 动态导入所有路由模块
const routeModules = import.meta.glob("@/router/admin/*.ts", { eager: true });
const viewModules = import.meta.glob("/src/views/**/*.{vue,tsx}");
const Layout = () => import("@/layouts/index.vue");

// 常量定义
const LAYOUT_COMPONENT = "Layout";
const ERROR_404_PATH = "@/views/error/404.vue";
const USE_MOCK_ENV = import.meta.env.VITE_USE_MOCK_MENU === "true";

// 路由缓存
const routeCache = new Map<string, any>();
/**
 * 转换路由数据为组件
 */
const transformRoutes = (routes: UserMenu[]): RouteRecordRaw[] => {
  return routes.map((route) => {
    const transformedRoute = { ...route } as any as RouteRecordRaw;

    // 设置组件
    transformedRoute.component = getRouteComponent(route);

    // 递归处理子路由
    if (route.children?.length) {
      transformedRoute.children = transformRoutes(route.children);
    }

    return transformedRoute;
  });
};

/**
 * 获取路由组件
 */
const getRouteComponent = (route: UserMenu) => {
  const componentStr = route.component?.toString();

  // 布局组件
  if (componentStr === LAYOUT_COMPONENT || componentStr?.includes("layout")) {
    return Layout;
  }

  // 动态组件
  const component = findComponent(route);
  return component || viewModules[ERROR_404_PATH];
};

/**
 * 查找组件
 */
const findComponent = (route: UserMenu) => {
  const cacheKey = route.component || route.path;
  if (routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey);
  }

  const moduleKeys = Object.keys(viewModules);
  const targetPath = route.component || route.path;

  const matchedKey = moduleKeys.find((key) => key.includes(targetPath) || targetPath.includes(key));

  const component = matchedKey ? viewModules[matchedKey] : null;

  if (component) {
    routeCache.set(cacheKey, component);
  }

  return component;
};
