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
      path: "/resource/page",
      component: () => import("@/views/admin/resource/page/Page.vue"),
      name: "Page",
      meta: { title: "页面管理" },
    },
    {
      path: "/resource/picture",
      name: "",
      // component: Layout,
      redirect: "/resource/albums",
      meta: {
        title: "图片管理",
        icon: "el-icon-picture",
        rank: 30,
        hidden: false,
      },
      children: [
        {
          path: "/resource/albums",
          name: "Albums",
          component: () => import("@/views/admin/resource/album/Album.vue"),
          meta: { title: "相册管理" },
        },
        {
          path: "/resource/albums/:id",
          name: "Photo",
          component: () => import("@/views/admin/resource/album/Photo.vue"),
          meta: { title: "相册详情", hidden: true },
        },
        {
          path: "/resource/photo/delete",
          name: "PhotoDelete",
          component: () => import("@/views/admin/resource/album/Delete.vue"),
          meta: { title: "相片回收站", hidden: true },
        },
      ],
    },
  ],
} satisfies RouteRecordRaw;
