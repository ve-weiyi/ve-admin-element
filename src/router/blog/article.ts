import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/article",
  name: "article-management",
  component: Layout,
  redirect: "/article/publish",
  meta: {
    title: "文章管理",
    icon: "document",
    rank: 10,
  },
  children: [
    {
      path: "/article/publish",
      name: "article/publish",
      component: () => import("@/views/blog/article/Write.vue"),
      meta: { title: "发布文章" },
    },
    {
      path: "/article/edit/:articleId",
      name: "article/edit",
      component: () => import("@/views/blog/article/Write.vue"),
      meta: { title: "查看文章", showLink: false },
    },
    {
      path: "/article/list",
      name: "article/list",
      component: () => import("@/views/blog/article/Article.vue"),
      meta: { title: "文章列表" },
    },
    {
      path: "/article/category",
      name: "article/category",
      component: () => import("@/views/blog/article/category/Category.vue"),
      meta: { title: "分类管理" },
    },
    {
      path: "/article/tag",
      name: "article/tag",
      component: () => import("@/views/blog/article/tag/Tag.vue"),
      meta: { title: "标签管理" },
    },
  ],
} satisfies RouteRecordRaw;
