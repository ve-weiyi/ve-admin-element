import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/lab",
  name: "",
  component: Layout,
  redirect: "/lab/apifox",
  meta: {
    title: "实验室",
    icon: "el-icon-star",
    hidden: false,
    alwaysShow: true,
    params: null,
    rank: 90,
  },
  children: [
    {
      path: "/lab/apifox",
      component: () => import("@/views/admin/lab/apifox.vue"),
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
    {
      path: "/lab/gitlink",
      component: () => import("@/views/admin/lab/gitlink.vue"),
      name: "GitLink",
      meta: {
        title: "博客前台",
        icon: "document",
        hidden: false,
        alwaysShow: false,
        params: null,
      },
    },
    {
      path: "/lab/websocket",
      component: () => import("@/views/admin/lab/websocket.vue"),
      name: "WebSocket",
      meta: {
        title: "WebSocket",
        icon: "el-icon-chat-line-square",
        hidden: false,
        alwaysShow: false,
        params: null,
      },
    },
  ],
} satisfies RouteRecordRaw;
