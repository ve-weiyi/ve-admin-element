import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/mine",
  name: "mine-management",
  component: Layout,
  redirect: "/mine/userinfo",
  meta: {
    title: "个人中心",
    icon: "user",
    rank: 90,
  },
  children: [
    {
      path: "/mine/userinfo",
      component: () => import("@/views/blog/mine/me/Me.vue"),
      name: "/mine/userinfo",
      meta: { title: "个人信息", keepAlive: true },
    },
    // {
    //   path: "/mine/identity",
    //   component: () => import("@/views/blog/mine/identity/Identity.vue"),
    //   name: "/mine/identity",
    //   meta: { title: "身份认证", keepAlive: true },
    // },
    {
      path: "/mine/history",
      component: () => import("@/views/blog/mine/history/History.vue"),
      name: "/mine/history",
      meta: { title: "登录历史", keepAlive: true },
    },
  ],
} satisfies RouteRecordRaw;
