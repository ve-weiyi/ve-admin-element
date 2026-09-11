import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

export default {
  path: "/notification",
  name: "",
  component: Layout,
  redirect: "/notification/notice",
  meta: {
    title: "通知管理",
    icon: "el-icon-bell",
    rank: 7,
  },
  children: [
    {
      path: "/notification/template",
      component: () => import("@/views/admin/notification/template/Template.vue"),
      name: "NotifyTemplate",
      meta: { title: "通知模板" },
    },
    {
      path: "/notification/notice",
      component: () => import("@/views/admin/notification/notice/Notice.vue"),
      name: "NotifyNotice",
      meta: { title: "通知内容" },
    },
    {
      path: "/notification/message",
      component: () => import("@/views/admin/notification/record/Record.vue"),
      name: "NotifyRecord",
      meta: { title: "消息记录" },
    },
  ],
} satisfies RouteRecordRaw;
