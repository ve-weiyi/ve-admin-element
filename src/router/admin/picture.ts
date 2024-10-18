import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/picture",
  name: "",
  component: Layout,
  redirect: "/picture/albums",
  meta: {
    title: "图片管理",
    icon: "el-icon-picture",
    rank: 30,
  },
  children: [
    {
      path: "/picture/albums",
      name: "Albums",
      component: () => import("@/views/admin/picture/album/Album.vue"),
      meta: { title: "相册管理" },
    },
    {
      path: "/picture/albums/:id",
      name: "Photo",
      component: () => import("@/views/admin/picture/album/Photo.vue"),
      meta: { title: "相册详情", hidden: true },
    },
    {
      path: "/picture/photo/delete",
      name: "PhotoDelete",
      component: () => import("@/views/admin/picture/album/Delete.vue"),
      meta: { title: "相片回收站", hidden: true },
    },
    {
      path: "/picture/banner",
      component: () => import("@/views/admin/picture/banner/Banner.vue"),
      name: "Banner",
      meta: { title: "页面管理" },
    },
  ],
} satisfies RouteRecordRaw;
