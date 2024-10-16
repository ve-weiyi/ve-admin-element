import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/resource",
  name: "resource",
  component: Layout,
  redirect: "/resource/file",
  meta: {
    title: "资源管理",
    icon: "el-icon-folder",
    rank: 90,
    alwaysShow: true,
  },
  children: [
    {
      path: "/resource/file",
      component: () => import("@/views/admin/resource/file/index.vue"),
      name: "/resource/file",
      meta: { title: "文件管理", keepAlive: true },
    },
  ],
} satisfies RouteRecordRaw;
