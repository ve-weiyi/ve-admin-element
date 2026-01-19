import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

export default {
  path: "/social",
  name: "",
  component: Layout,
  redirect: "/social/about",
  meta: {
    title: "社交管理",
    icon: "el-icon-link",
    rank: 3,
  },
  children: [
    {
      path: "/social/talk",
      component: () => import("@/views/admin/social/talk/Talk.vue"),
      name: "Talk",
      meta: { title: "说说管理" },
    },
    {
      path: "/social/friend",
      component: () => import("@/views/admin/social/friend/Friend.vue"),
      name: "Friend",
      meta: { title: "友链管理" },
    },
  ],
} satisfies RouteRecordRaw;
