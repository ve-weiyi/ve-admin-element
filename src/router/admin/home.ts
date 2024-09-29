import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/welcome",
  name: "/welcome",
  component: Layout,
  redirect: "/home",
  meta: {
    icon: "el-icon-home-filled",
    title: "首页",
    rank: 0,
  },
  children: [
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/admin/home/Home.vue"),
      meta: {
        title: "首页",
      },
    },
  ],
} satisfies RouteRecordRaw;
