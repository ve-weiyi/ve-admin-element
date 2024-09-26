import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/user",
  name: "monitor",
  component: Layout,
  redirect: "/monitor/online",
  meta: {
    title: "系统监控",
    icon: "el-icon-monitor",
    rank: 50,
  },
  children: [
    {
      path: "/monitor/online",
      component: () => import("@/views/admin/monitor/online/Online.vue"),
      name: "online",
      meta: { title: "在线用户" },
    },
    {
      path: "/monitor/state",
      component: () => import("@/views/admin/monitor/state/State.vue"),
      name: "state",
      meta: { title: "服务器状态" },
    },
  ],
} satisfies RouteRecordRaw;
