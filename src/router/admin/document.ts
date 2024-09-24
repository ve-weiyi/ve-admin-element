import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/document",
  name: "",
  component: Layout,
  redirect: "/document/apifox",
  meta: {
    title: "接口文档",
    icon: "api",
    hidden: false,
    alwaysShow: true,
    params: null,
    rank: 90,
  },
  children: [
    {
      path: "/document/apifox",
      component: () => import("@/views/admin/document/api/apifox.vue"),
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
  ],
} satisfies RouteRecordRaw;
