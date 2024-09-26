import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/mine",
  name: "mine-management",
  component: Layout,
  redirect: "/mine/userinfo",
  meta: {
    title: "个人中心",
    icon: "el-icon-user",
    rank: 90,
  },
  children: [
    {
      path: "/mine",
      component: () => import("@/views/admin/mine/Mine.vue"),
      name: "/mine",
      meta: { title: "个人信息", keepAlive: true },
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
