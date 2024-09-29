import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/document",
  name: "document",
  component: Layout,
  redirect: "/document/api",
  meta: {
    title: "接口文档",
    icon: "api",
    hidden: false,
    alwaysShow: true,
    params: null,
    rank: 90,
  },
  children: [
    {
      path: "/document/api",
      component: () => import("@/views/admin/document/api/apifox.vue"),
      name: "Apifox",
      meta: {
        title: "Apifox",
        icon: "api",
        hidden: false,
        keepAlive: true,
        alwaysShow: false,
        params: null,
      },
    },
    // {
    //   path: "/mine/info",
    //   component: () => import("@/views/admin/mine/info/Info.vue"),
    //   name: "/mine/info",
    //   meta: { title: "个人信息", keepAlive: true },
    // },
    // {
    //   path: "/mine/identity",
    //   component: () => import("@/views/admin/mine/identity/Identity.vue"),
    //   name: "/mine/identity",
    //   meta: { title: "身份认证", keepAlive: true },
    // },
    // {
    //   path: "/mine/history",
    //   component: () => import("@/views/admin/mine/history/History.vue"),
    //   name: "/mine/history",
    //   meta: { title: "登录历史", keepAlive: true },
    // },
  ],
} satisfies RouteRecordRaw;
