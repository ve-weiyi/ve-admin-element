import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

export default {
  path: "/log",
  name: "", // router.push
  component: Layout,
  redirect: "/log/operation",
  meta: {
    title: "日志管理",
    icon: "el-icon-edit",
    rank: 5,
  },
  children: [
    {
      path: "/log/login",
      component: () => import("@/views/admin/log/login/LoginLog.vue"),
      name: "LoginLog",
      meta: { title: "登录日志" },
    },
    {
      path: "/log/operation",
      component: () => import("@/views/admin/log/operation/OperationLog.vue"),
      name: "OperationLog",
      meta: { title: "操作日志" },
    },
    {
      path: "/log/visit",
      component: () => import("@/views/admin/log/visit/VisitLog.vue"),
      name: "VisitLog",
      meta: { title: "浏览日志" },
    },
    {
      path: "/log/file",
      component: () => import("@/views/admin/log/file/FileLog.vue"),
      name: "FileLog",
      meta: { title: "文件日志" },
    },
  ],
} satisfies RouteRecordRaw;
