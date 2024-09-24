import { RouteRecordRaw } from "vue-router";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/user",
  name: "monitor",
  component: Layout,
  redirect: "/user/list",
  meta: {
    title: "系统监控",
    icon: "user",
    rank: 50,
  },
  children: [
    {
      path: "/monitor/online",
      component: () => import("@/views/blog/monitor/online/index.vue"),
      name: "online",
      meta: { title: "在线用户", icon: "user-filled" },
    },
    {
      path: "/monitor/state",
      component: () => import("@/views/blog/monitor/state/State.vue"),
      name: "state",
      meta: { title: "服务器状态", icon: "user-filled" },
    },
  ],
} satisfies RouteRecordRaw;
