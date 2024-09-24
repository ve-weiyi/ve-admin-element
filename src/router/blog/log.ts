import { RouteRecordRaw } from "vue-router";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/log",
  name: "log-management", // router.push
  component: Layout,
  redirect: "/log/operation",
  meta: {
    title: "日志管理",
    icon: "document",
    rank: 70,
  },
  children: [
    {
      path: "/log/operation",
      component: () => import("@/views/blog/log/Operation.vue"),
      name: "operation",
      meta: { title: "操作日志", showParent: true, keepAlive: true },
    },
  ],
} satisfies RouteRecordRaw;
