import { RouteRecordRaw } from "vue-router";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/system",
  name: "system-management",
  component: Layout,
  redirect: "/system/state",
  meta: {
    title: "系统管理",
    icon: "system",
    rank: 30,
  },
  children: [
    {
      path: "/user/list",
      component: () => import("@/views/blog/system/user/UserList.vue"),
      name: "list",
      meta: { title: "用户列表", icon: "user-filled" },
    },
    {
      path: "/authority/role",
      component: () => import("@/views/blog/system/role/Role.vue"),
      name: "Role",
      meta: { title: "角色管理" },
    },
    {
      path: "/authority/menu",
      component: () => import("@/views/blog/system/menu/Menu.vue"),
      name: "Menu",
      meta: { title: "菜单管理" },
    },
    {
      path: "/authority/api",
      component: () => import("@/views/blog/system/api/Api.vue"),
      name: "Api",
      meta: { title: "接口管理" },
    },
  ],
} satisfies RouteRecordRaw;
