import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

export default {
  path: "/message",
  name: "",
  component: Layout,
  redirect: "/message/comment",
  meta: {
    title: "消息管理",
    icon: "el-icon-message",
    rank: 2,
  },
  children: [
    {
      path: "/message/comment",
      component: () => import("@/views/admin/message/comment/Comment.vue"),
      name: "Comment",
      meta: { title: "评论管理", keepAlive: true },
    },
    {
      path: "/message/remark",
      component: () => import("@/views/admin/message/remark/Remark.vue"),
      name: "Remark",
      meta: { title: "留言管理", keepAlive: true },
    },
  ],
} satisfies RouteRecordRaw;
