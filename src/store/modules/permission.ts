import { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/router";
import { store } from "@/store";
import { getUserMenusApi } from "@/api/user";
import { UserMenu } from "@/api/types";

const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

export const usePermissionStore = defineStore("permission", () => {
  /** 所有路由，包括静态和动态路由 */
  const routes = ref<RouteRecordRaw[]>([]);
  /** 混合模式左侧菜单 */
  const mixLeftMenus = ref<RouteRecordRaw[]>([]);

  /**
   * 生成动态路由
   */
  function generateRoutes() {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      getUserMenusApi()
        .then((data) => {
          // const dynamicRoutes = transformRoutes(data.data.list);
          const dynamicRoutes = [];
          routes.value = constantRoutes.concat(dynamicRoutes);
          resolve(dynamicRoutes);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 混合模式菜单下根据顶部菜单路径设置左侧菜单
   *
   * @param topMenuPath - 顶部菜单路径
   */
  const setMixLeftMenus = (topMenuPath: string) => {
    const matchedItem = routes.value.find((item) => item.path === topMenuPath);
    if (matchedItem && matchedItem.children) {
      mixLeftMenus.value = matchedItem.children;
    }
  };

  return {
    routes,
    generateRoutes,
    mixLeftMenus,
    setMixLeftMenus,
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
        tmpRoute.component = modules[`../../views/error-page/404.vue`];
      }
    }

    if (tmpRoute.children) {
      tmpRoute.children = transformRoutes(route.children!);
    }

    asyncRoutes.push(tmpRoute);
  });

  return asyncRoutes;
};

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

  console.log("findComponent", v, modulesRoutesKeys[index]);
  return modulesRoutes[modulesRoutesKeys[index]];
};

/**
 * 在组件外使用 Pinia store 实例
 * @see https://pinia.vuejs.org/core-concepts/outside-component-usage.html
 */
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
