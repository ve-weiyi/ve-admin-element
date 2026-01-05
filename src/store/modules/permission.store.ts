import type { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { store } from "@/store";
import router from "@/router";
import { UserAPI } from "@/api/user";
import type { UserMenu } from "@/api/types";

// 动态导入所有路由模块
const routeModules = import.meta.glob("@/router/admin/*.ts", { eager: true });
const viewModules = import.meta.glob("/src/views/**/*.{vue,tsx}");
const Layout = () => import("@/layout/index.vue");

// 常量定义
const LAYOUT_COMPONENT = "Layout";
const ERROR_404_PATH = "../../views/error/404.vue";
const USE_MOCK_ENV = import.meta.env.VITE_USE_MOCK_MENU === "true";

// 路由缓存
const routeCache = new Map<string, any>();

export const usePermissionStore = defineStore("permission", () => {
  // 储所有路由，包括静态路由和动态路由
  const routes = ref<RouteRecordRaw[]>([]);
  // 混合模式左侧菜单路由
  const mixedLayoutLeftRoutes = ref<RouteRecordRaw[]>([]);
  // 路由是否加载完成
  const isRoutesLoaded = ref(false);

  /**
   * 生成动态路由
   */
  const generateRoutes = async (): Promise<RouteRecordRaw[]> => {
    try {
      let dynamicRoutes: RouteRecordRaw[];

      if (USE_MOCK_ENV) {
        dynamicRoutes = getMockRoutes();
      } else {
        try {
          const { data } = await UserAPI.getUserMenusApi();
          dynamicRoutes = transformRoutes(data.list);
        } catch (error) {
          console.warn("获取用户菜单失败，使用模拟路由:", error);
          dynamicRoutes = getMockRoutes();
        }
      }

      routes.value = [...constantRoutes, ...dynamicRoutes];
      isRoutesLoaded.value = true;
      return dynamicRoutes;
    } catch (error) {
      console.error("生成路由失败:", error);
      throw error;
    }
  };

  /**
   * 获取模拟路由数据（按rank排序）
   */
  const getMockRoutes = (): RouteRecordRaw[] => {
    const routes = Object.values(routeModules)
      .map((module) => (module as any).default)
      .filter((route) => route)
      .sort((a, b) => {
        const rankA = a.meta?.rank || 999;
        const rankB = b.meta?.rank || 999;
        return rankA - rankB;
      });

    return routes;
  };

  /**
   * 根据父菜单路径设置混合模式左侧菜单
   *
   * @param parentPath 父菜单的路径，用于查找对应的菜单项
   */
  const setMixedLayoutLeftRoutes = (parentPath: string) => {
    const matchedItem = routes.value.find((item) => item.path === parentPath);
    if (matchedItem && matchedItem.children) {
      mixedLayoutLeftRoutes.value = matchedItem.children;
    }
  };

  /**
   * 重置路由
   */
  const resetRouter = () => {
    //  从 router 实例中移除动态路由
    routes.value.forEach((route) => {
      if (route.name && !constantRoutes.find((r) => r.name === route.name)) {
        router.removeRoute(route.name);
      }
    });

    // 清空本地存储的路由和菜单数据
    routes.value = [];
    mixedLayoutLeftRoutes.value = [];
    isRoutesLoaded.value = false;
  };

  return {
    routes,
    mixedLayoutLeftRoutes,
    isRoutesLoaded,
    generateRoutes,
    getMockRoutes,
    setMixedLayoutLeftRoutes,
    resetRouter,
  };
});

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

/**
 * 在组件外使用 Pinia store 实例
 */
export const usePermissionStoreHook = () => usePermissionStore(store);
