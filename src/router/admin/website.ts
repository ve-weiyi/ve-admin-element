import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/website",
  name: "",
  component: Layout,
  redirect: "/website/profile",
  meta: {
    title: "网站管理",
    icon: "el-icon-operation",
    rank: 80,
  },
  children: [
    {
      path: "/website/profile",
      component: () => import("@/views/admin/website/profile/Profile.vue"),
      name: "Config",
      meta: { title: "网站设置" },
    },
    {
      path: "/website/talk",
      component: () => import("@/views/admin/website/talk/Talk.vue"),
      name: "Talk",
      meta: { title: "说说管理" },
    },
    {
      path: "/website/friend",
      component: () => import("@/views/admin/website/friend/Friend.vue"),
      name: "Friend",
      meta: { title: "友链管理" },
    },
    {
      path: "/website/about",
      component: () => import("@/views/admin/website/about/About.vue"),
      name: "AboutMe",
      meta: { title: "关于我" },
    },
  ],
} satisfies RouteRecordRaw;
