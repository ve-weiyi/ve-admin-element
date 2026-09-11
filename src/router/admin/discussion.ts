import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

export default {
  path: "/discussion",
  name: "",
  component: Layout,
  redirect: "/discussion/comment",
  meta: {
    title: "消息管理",
    icon: "el-icon-chat-line-square",
    rank: 2,
  },
  children: [
    {
      path: "/discussion/comment",
      component: () => import("@/views/admin/discussion/comment/Comment.vue"),
      name: "Comment",
      meta: { title: "评论管理", keepAlive: true },
    },
    {
      path: "/discussion/message",
      component: () => import("@/views/admin/discussion/message/Message.vue"),
      name: "Message",
      meta: { title: "留言管理", keepAlive: true },
    },
  ],
} satisfies RouteRecordRaw;
