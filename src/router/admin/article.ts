import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/article",
  name: "",
  component: Layout,
  redirect: "/article/publish",
  meta: {
    title: "文章管理",
    icon: "el-icon-document",
    rank: 10,
  },
  children: [
    {
      path: "/article/publish",
      name: "ArticlePublish",
      component: () => import("@/views/admin/blog/article/Write.vue"),
      meta: { title: "发布文章", keepAlive: true },
    },
    {
      path: "/article/edit/:articleId",
      name: "ArticleEdit",
      component: () => import("@/views/admin/blog/article/Write.vue"),
      meta: { title: "查看文章", keepAlive: true, hidden: true },
    },
    {
      path: "/article/list",
      name: "ArticleList",
      component: () => import("@/views/admin/blog/article/Article.vue"),
      meta: { title: "文章列表" },
    },
    {
      path: "/article/category",
      name: "Category",
      component: () => import("@/views/admin/blog/category/Category.vue"),
      meta: { title: "分类管理" },
    },
    {
      path: "/article/tag",
      name: "Tag",
      component: () => import("@/views/admin/blog/tag/Tag.vue"),
      meta: { title: "标签管理" },
    },
  ],
} satisfies RouteRecordRaw;
