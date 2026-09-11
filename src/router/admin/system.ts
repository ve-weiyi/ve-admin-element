import type { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layouts/index.vue");

export default {
  path: "/system",
  name: "",
  component: Layout,
  redirect: "/system/user",
  meta: {
    title: "系统管理",
    icon: "el-icon-setting",
    rank: 5,
  },
  children: [
    {
      path: "/system/user",
      component: () => import("@/views/admin/system/user/User.vue"),
      name: "User",
      meta: { title: "用户管理", keepAlive: true },
    },
    {
      path: "/system/role",
      component: () => import("@/views/admin/system/role/Role.vue"),
      name: "Role",
      meta: { title: "角色管理", keepAlive: true },
    },
    {
      path: "/system/menu",
      component: () => import("@/views/admin/system/menu/Menu.vue"),
      name: "Menu",
      meta: { title: "菜单管理", keepAlive: true },
    },
    {
      path: "/system/api",
      component: () => import("@/views/admin/system/api/Api.vue"),
      name: "Api",
      meta: { title: "接口管理", keepAlive: true },
    },
    {
      path: "/system/system",
      component: () => import("@/views/admin/system/guest/Guest.vue"),
      name: "Guest",
      meta: { title: "游客管理", keepAlive: true },
    },
    {
      path: "/system/online",
      component: () => import("@/views/admin/system/online/Online.vue"),
      name: "Online",
      meta: { title: "在线用户" },
    },
  ],
} satisfies RouteRecordRaw;
