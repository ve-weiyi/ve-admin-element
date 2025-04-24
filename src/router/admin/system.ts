import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

export default {
  path: "/system",
  name: "",
  component: Layout,
  redirect: "/system/user",
  meta: {
    title: "系统管理",
    icon: "el-icon-setting",
    rank: 50,
  },
  children: [
    {
      path: "/system/user",
      component: () => import("@/views/admin/system/user/User.vue"),
      name: "User",
      meta: { title: "用户列表" },
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
  ],
} satisfies RouteRecordRaw;
