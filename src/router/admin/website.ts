import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

export default {
  path: "/website",
  name: "",
  component: Layout,
  redirect: "/website/profile",
  meta: {
    title: "网站管理",
    icon: "el-icon-setting",
    rank: 8,
  },
  children: [
    {
      path: "/website/notice",
      component: () => import("@/views/admin/website/notice/Notice.vue"),
      name: "Notice",
      meta: { title: "通知管理", keepAlive: true },
    },
  ],
} satisfies RouteRecordRaw;
