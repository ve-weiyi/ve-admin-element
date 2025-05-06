import type { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { store } from "@/store";
import router from "@/router";

import { UserAPI } from "@/api/user";
import type { UserMenu } from "@/api/types";

import article from "@/router/admin/article";
import message from "@/router/admin/message";
import resource from "@/router/admin/resource";
import system from "@/router/admin/system";
import log from "@/router/admin/log";
import website from "@/router/admin/website";
import monitor from "@/router/admin/monitor";
import lab from "@/router/admin/lab";
import mine from "@/router/admin/mine";

const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

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
  function generateRoutes() {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      // console.log("generateRoutes", import.meta.env.VITE_USE_MOCK_MENU);
      if (import.meta.env.VITE_USE_MOCK_MENU == "true") {
        const dynamicRoutes = getMockRoutes();
        routes.value = [...constantRoutes, ...dynamicRoutes];
        isRoutesLoaded.value = true;
        resolve(dynamicRoutes);
        return;
      }
      UserAPI.getUserMenusApi()
        .then((data) => {
          const dynamicRoutes = transformRoutes(data.data.list);
          // const dynamicRoutes = [];
          routes.value = [...constantRoutes, ...dynamicRoutes];
          isRoutesLoaded.value = true;
          console.log("use user routes", dynamicRoutes);
          resolve(dynamicRoutes);
        })
        .catch((error) => {
          // reject(error);
          const dynamicRoutes = getMockRoutes();
          routes.value = [...constantRoutes, ...dynamicRoutes];
          isRoutesLoaded.value = true;
          console.log("use mock routes", dynamicRoutes);
          resolve(dynamicRoutes);
        });
    });
  }

  function getMockRoutes(): RouteRecordRaw[] {
    const dynamicRoutes = [];
    dynamicRoutes.push(article);
    dynamicRoutes.push(message);
    dynamicRoutes.push(resource);
    dynamicRoutes.push(log);
    dynamicRoutes.push(monitor);
    dynamicRoutes.push(system);
    dynamicRoutes.push(website);
    dynamicRoutes.push(lab);
    dynamicRoutes.push(mine);
    return dynamicRoutes;
  }

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
const transformRoutes = (routes: UserMenu[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmpRoute = { ...route } as any as RouteRecordRaw;
    // 顶级目录，替换为 Layout 组件
    if (tmpRoute.component?.toString() == "Layout") {
      tmpRoute.component = Layout;
    } else if (tmpRoute.component?.toString().includes("layout")) {
      tmpRoute.component = Layout;
    } else {
      // 其他菜单，根据组件路径动态加载组件
      // const component = modules[`../../views/${tmpRoute.component}.vue`];

      const component = findComponent(route);
      if (component) {
        tmpRoute.component = component;
      } else {
        tmpRoute.component = modules[`../../views/error/404.vue`];
      }
    }

    if (tmpRoute.children) {
      tmpRoute.children = transformRoutes(route.children!);
    }

    asyncRoutes.push(tmpRoute);
  });

  return asyncRoutes;
};

/**
 * 在组件外使用 Pinia store 实例
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}

const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");
const findComponent = (v: UserMenu) => {
  const modulesRoutesKeys = Object.keys(modulesRoutes);
  // 对后端传component组件路径和不传做兼容（如果后端传component组件路径，那么path可以随便写，如果不传，component组件路径会跟path保持一致）
  const index = v?.component
    ? modulesRoutesKeys.findIndex((ev) => {
        const component = v.component as any;
        return ev.includes(component) || component.includes(ev);
      })
    : modulesRoutesKeys.findIndex((ev) => {
        return ev.includes(v.path as any);
      });

  // console.log("findComponent", v, modulesRoutesKeys[index]);
  return modulesRoutes[modulesRoutesKeys[index]];
};
