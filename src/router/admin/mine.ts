import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/mine",
  name: "",
  component: Layout,
  redirect: "/mine/info",
  meta: {
    title: "个人中心",
    icon: "el-icon-user",
    rank: 100,
    alwaysShow: true,
  },
  children: [
    {
      path: "/mine/info",
      component: () => import("@/views/admin/mine/Mine.vue"),
      name: "Mine",
      meta: { title: "个人信息" },
    },
    // {
    //   path: "/mine/info",
    //   component: () => import("@/views/admin/mine/info/Info.vue"),
    //   name: "Info",
    //   meta: { title: "个人信息", keepAlive: true },
    // },
    // {
    //   path: "/mine/identity",
    //   component: () => import("@/views/admin/mine/identity/Identity.vue"),
    //   name: "Identity",
    //   meta: { title: "身份认证", keepAlive: true },
    // },
    // {
    //   path: "/mine/history",
    //   component: () => import("@/views/admin/mine/history/History.vue"),
    //   name: "History",
    //   meta: { title: "登录历史", keepAlive: true },
    // },
  ],
} satisfies RouteRecordRaw;
