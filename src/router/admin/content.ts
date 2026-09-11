import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

export default {
  path: "/content",
  name: "",
  component: Layout,
  redirect: "/content/article",
  meta: {
    title: "内容管理",
    icon: "el-icon-document",
    rank: 1,
  },
  children: [
    {
      path: "/content/article/publish",
      name: "ArticlePublish",
      component: () => import("@/views/admin/content/article/Write.vue"),
      meta: { title: "发布文章", keepAlive: true },
    },
    {
      path: "/content/article/:articleId/edit",
      name: "ArticleEdit",
      component: () => import("@/views/admin/content/article/Write.vue"),
      meta: { title: "查看文章", keepAlive: true, hidden: true },
    },
    {
      path: "/content/article",
      name: "ArticleList",
      component: () => import("@/views/admin/content/article/Article.vue"),
      meta: { title: "文章列表", keepAlive: true },
    },
    {
      path: "/content/category",
      name: "Category",
      component: () => import("@/views/admin/content/category/Category.vue"),
      meta: { title: "分类管理", keepAlive: true },
    },
    {
      path: "/content/tag",
      name: "Tag",
      component: () => import("@/views/admin/content/tag/Tag.vue"),
      meta: { title: "标签管理", keepAlive: true },
    },
  ],
} satisfies RouteRecordRaw;
