import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

export default {
  path: "/website",
  name: "",
  component: Layout,
  redirect: "/website/page",
  meta: {
    title: "站点设置",
    icon: "el-icon-setting",
    rank: 7,
  },
  children: [
    {
      path: "/website/config",
      component: () => import("@/views/admin/website/config/Config.vue"),
      name: "Config",
      meta: { title: "网站配置", keepAlive: true },
    },
    {
      path: "/website/page",
      component: () => import("@/views/admin/website/page/Page.vue"),
      name: "Page",
      meta: { title: "页面配置", keepAlive: true },
    },
    {
      path: "/website/about",
      component: () => import("@/views/admin/website/about/About.vue"),
      name: "About",
      meta: { title: "关于我", keepAlive: true },
    },
    {
      path: "/website/state",
      component: () => import("@/views/admin/website/state/State.vue"),
      name: "ServerState",
      meta: { title: "服务器状态", keepAlive: true },
    },
  ],
} satisfies RouteRecordRaw;
