import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/system",
  name: "",
  component: Layout,
  redirect: "/system/user",
  meta: {
    title: "系统管理",
    icon: "el-icon-operation",
    rank: 4,
  },
  children: [
    {
      path: "/system/user",
      component: () => import("@/views/admin/system/user/User.vue"),
      name: "User",
      meta: { title: "用户管理" },
    },
    {
      path: "/system/role",
      component: () => import("@/views/admin/system/role/Role.vue"),
      name: "Role",
      meta: { title: "角色管理" },
    },
    {
      path: "/system/menu",
      component: () => import("@/views/admin/system/menu/Menu.vue"),
      name: "Menu",
      meta: { title: "菜单管理" },
    },
    {
      path: "/system/api",
      component: () => import("@/views/admin/system/api/Api.vue"),
      name: "Api",
      meta: { title: "接口管理" },
    },
    {
      path: "/system/visitor",
      component: () => import("@/views/admin/system/visitor/Visitor.vue"),
      name: "Visitor",
      meta: { title: "游客管理" },
    },
  ],
} satisfies RouteRecordRaw;
