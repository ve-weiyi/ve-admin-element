import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

export default {
  path: "/devtools",
  name: "",
  component: Layout,
  redirect: "/devtools/apifox",
  meta: {
    title: "开发工具",
    icon: "el-icon-star",
    hidden: false,
    alwaysShow: true,
    params: {},
    rank: 8,
  },
  children: [
    {
      path: "/devtools/doc",
      name: "Doc",
      meta: {
        title: "接口文档",
        hidden: false,
        keepAlive: true,
        alwaysShow: false,
        params: {},
      },
      children: [
        {
          path: "/devtools/doc/apifox",
          component: () => import("@/views/admin/devtools/doc/apifox.vue"),
          name: "Apifox",
          meta: {
            title: "接口文档(内嵌)",
            icon: "api",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: {},
          },
        },
        {
          path: "https://admin.veweiyi.cn/admin-api/v1/swagger/index.html",
          component: Layout,
          name: "Swagger",
          meta: {
            title: "接口文档(外链)",
            icon: "document",
            hidden: false,
            alwaysShow: false,
            params: {},
          },
        },
      ],
    },
    {
      path: "/devtools/websocket",
      component: () => import("@/views/admin/devtools/websocket/websocket.vue"),
      name: "WebSocket",
      meta: {
        title: "WebSocket",
        icon: "el-icon-chat-line-square",
        hidden: false,
        alwaysShow: false,
        params: {},
      },
    },
  ],
} satisfies RouteRecordRaw;
