import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/resource",
  name: "",
  component: Layout,
  redirect: "/resource/file",
  meta: {
    title: "资源管理",
    icon: "el-icon-folder",
    rank: 40,
    alwaysShow: true,
  },
  children: [
    {
      path: "/resource/file",
      component: () => import("@/views/admin/resource/file/index.vue"),
      name: "File",
      meta: { title: "文件管理", keepAlive: true },
    },
    {
      path: "/picture",
      name: "",
      // component: Layout,
      redirect: "/picture/albums",
      meta: {
        title: "图片管理",
        icon: "el-icon-picture",
        rank: 30,
        hidden: false,
      },
      children: [
        {
          path: "/picture/albums",
          name: "Albums",
          component: () => import("@/views/admin/resource/picture/album/Album.vue"),
          meta: { title: "相册管理" },
        },
        {
          path: "/picture/albums/:id",
          name: "Photo",
          component: () => import("@/views/admin/resource/picture/album/Photo.vue"),
          meta: { title: "相册详情", hidden: true },
        },
        {
          path: "/picture/photo/delete",
          name: "PhotoDelete",
          component: () => import("@/views/admin/resource/picture/album/Delete.vue"),
          meta: { title: "相片回收站", hidden: true },
        },
      ],
    },
  ],
} satisfies RouteRecordRaw;
