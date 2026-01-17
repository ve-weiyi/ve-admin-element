import type { App } from "vue";
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layouts/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },

  {
    path: "/oauth/login/:platform",
    component: () => import("@/views/oauth/index.vue"),
    meta: { hidden: true },
  },

  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/admin/home/Home.vue"),
        name: "Home",
        meta: {
          title: "首页",
          icon: "homepage",
          affix: true,
          keepAlive: true,
        },
      },
      {
        path: "401",
        component: () => import("@/views/error/401.vue"),
        meta: { hidden: true },
      },
      {
        path: "404",
        component: () => import("@/views/error/404.vue"),
        meta: { hidden: true },
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/profile/index.vue"),
        meta: { title: "个人中心", icon: "user", hidden: true },
      },
    ],
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  // 使用createWebHashHistory模式会导致第三方授权回调无法识别查询参数
  history: createWebHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 全局注册 router
export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
