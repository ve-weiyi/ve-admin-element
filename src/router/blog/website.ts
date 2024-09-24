import { RouteRecordRaw } from "vue-router";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/website",
  name: "website-management",
  component: Layout,
  redirect: "/website/config",
  meta: {
    title: "网站管理",
    icon: "setting",
    rank: 80,
  },
  children: [
    {
      path: "/albums/list",
      name: "Albums",
      component: () => import("@/views/blog/website/album/Album.vue"),
      meta: { title: "相册管理" },
    },
    {
      path: "/albums/:id",
      name: "Photo",
      component: () => import("@/views/blog/website/album/Photo.vue"),
      meta: { title: "相册详情", showLink: false },
    },
    {
      path: "/albums/photo/delete",
      name: "Delete",
      component: () => import("@/views/blog/website/album/Delete.vue"),
      meta: { title: "相片回收站", showLink: false },
    },
    {
      path: "/talk/list",
      component: () => import("@/views/blog/website/talk/TalkList.vue"),
      name: "talk_list",
      meta: { title: "说说管理" },
    },
    {
      path: "/message/links",
      component: () => import("@/views/blog/website/link/Friend.vue"),
      name: "links",
      meta: { title: "友链管理" },
    },
    {
      path: "/website/config",
      component: () => import("@/views/blog/website/config/Config.vue"),
      name: "Config",
      meta: { title: "网站设置" },
    },
    {
      path: "/website/page",
      component: () => import("@/views/blog/website/page/Page.vue"),
      name: "Page",
      meta: { title: "页面管理" },
    },
    {
      path: "/website/about",
      component: () => import("@/views/blog/website/about/About.vue"),
      name: "AboutMe",
      meta: { title: "关于我" },
    },
  ],
} satisfies RouteRecordRaw;
