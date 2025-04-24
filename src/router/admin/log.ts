import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/log",
  name: "", // router.push
  component: Layout,
  redirect: "/log/operation",
  meta: {
    title: "日志管理",
    icon: "el-icon-edit",
    rank: 70,
  },
  children: [
    {
      path: "/log/login",
      component: () => import("@/views/admin/log/login/Login.vue"),
      name: "LogLogin",
      meta: { title: "登录日志", keepAlive: true },
    },
    {
      path: "/log/operation",
      component: () => import("@/views/admin/log/operation/Operation.vue"),
      name: "LogOperation",
      meta: { title: "操作日志", keepAlive: true },
    },
    {
      path: "/log/visit",
      component: () => import("@/views/admin/log/visit/Visit.vue"),
      name: "LogVisit",
      meta: { title: "浏览日志", keepAlive: true },
    },
  ],
} satisfies RouteRecordRaw;
