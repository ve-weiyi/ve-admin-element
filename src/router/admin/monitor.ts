import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/user",
  name: "",
  component: Layout,
  redirect: "/monitor/online",
  meta: {
    title: "系统监控",
    icon: "el-icon-monitor",
    rank: 7,
  },
  children: [
    {
      path: "/monitor/online",
      component: () => import("@/views/admin/monitor/online/Online.vue"),
      name: "Online",
      meta: { title: "在线用户" },
    },
    {
      path: "/monitor/state",
      component: () => import("@/views/admin/monitor/state/State.vue"),
      name: "State",
      meta: { title: "服务器状态" },
    },
  ],
} satisfies RouteRecordRaw;
