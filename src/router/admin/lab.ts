import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

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
    rank: 9,
  },
  children: [
    {
      path: "/lab/doc",
      name: "Doc",
      meta: {
        title: "接口文档",
        hidden: false,
        keepAlive: true,
        alwaysShow: false,
        params: null,
      },
      children: [
        {
          path: "/lab/doc/apifox",
          component: () => import("@/views/admin/lab/doc/apifox.vue"),
          name: "Apifox",
          meta: {
            title: "接口文档(内嵌)",
            icon: "api",
            hidden: false,
            keepAlive: true,
            alwaysShow: false,
            params: null,
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
            params: null,
          },
        },
      ],
    },
    {
      path: "/lab/websocket",
      component: () => import("@/views/admin/lab/websocket/websocket.vue"),
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
