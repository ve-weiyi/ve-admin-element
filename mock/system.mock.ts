import { defineMock } from "./base";

/** 演示头像，用于开发态展示非兜底路径 */
const MOCK_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23409eff'/%3E%3Ctext x='20' y='27' font-size='20' font-family='sans-serif' text-anchor='middle' fill='%23fff'%3EA%3C/text%3E%3C/svg%3E";

const baseTime = 1700000000000;

const ok = (data: unknown) => ({ code: 200, data, msg: "ok" });
const batch = (n = 1) => ok({ success_count: n });

/** 模拟用户 */
const mockUsers = [
  {
    id: 1,
    user_id: "00000000-0000-0000-0000-000000000001",
    username: "admin",
    nickname: "管理员",
    avatar: MOCK_AVATAR,
    mobile: "13800000000",
    email: "admin@example.com",
    status: 1,
    register_type: "email",
    ip_address: "127.0.0.1",
    ip_source: "本机",
    created_at: baseTime,
    updated_at: baseTime,
    roles: [{ role_id: 1, role_key: "ROOT", role_label: "超级管理员" }],
  },
  {
    id: 2,
    user_id: "00000000-0000-0000-0000-000000000002",
    username: "editor",
    nickname: "内容编辑",
    avatar: MOCK_AVATAR,
    mobile: "13900000000",
    email: "editor@example.com",
    status: 1,
    register_type: "email",
    ip_address: "127.0.0.1",
    ip_source: "本机",
    created_at: baseTime,
    updated_at: baseTime,
    roles: [{ role_id: 2, role_key: "EDITOR", role_label: "内容编辑" }],
  },
];

/** 模拟角色 */
const mockRoles = [
  {
    id: 1,
    parent_id: 0,
    role_key: "ROOT",
    role_label: "超级管理员",
    role_comment: "拥有全部权限",
    is_default: 1,
    status: 0,
    created_at: baseTime,
    updated_at: baseTime,
  },
  {
    id: 2,
    parent_id: 0,
    role_key: "EDITOR",
    role_label: "内容编辑",
    role_comment: "负责内容维护",
    is_default: 0,
    status: 0,
    created_at: baseTime,
    updated_at: baseTime,
  },
];

/** 模拟菜单（树形） */
const mockMenus = [
  {
    id: 1,
    parent_id: 0,
    path: "/system",
    name: "System",
    component: "Layout",
    redirect: "/system/user",
    type: "CATALOG",
    title: "系统管理",
    icon: "el-icon-setting",
    rank: 5,
    perm: "",
    keep_alive: 1,
    always_show: 0,
    visible: 1,
    status: 0,
    created_at: baseTime,
    updated_at: baseTime,
    children: [
      {
        id: 101,
        parent_id: 1,
        path: "/system/user",
        name: "User",
        component: "admin/system/user/User",
        redirect: "",
        type: "MENU",
        title: "用户管理",
        icon: "el-icon-user",
        rank: 1,
        perm: "sys:user:query",
        keep_alive: 1,
        always_show: 0,
        visible: 1,
        status: 0,
        created_at: baseTime,
        updated_at: baseTime,
        children: [],
      },
      {
        id: 102,
        parent_id: 1,
        path: "/system/role",
        name: "Role",
        component: "admin/system/role/Role",
        redirect: "",
        type: "MENU",
        title: "角色管理",
        icon: "el-icon-role",
        rank: 2,
        perm: "sys:role:query",
        keep_alive: 1,
        always_show: 0,
        visible: 1,
        status: 0,
        created_at: baseTime,
        updated_at: baseTime,
        children: [],
      },
    ],
  },
];

/** 模拟接口权限（树形） */
const mockApis = [
  {
    id: 1,
    parent_id: 0,
    name: "系统管理",
    path: "",
    method: "",
    traceable: 0,
    status: 0,
    created_at: baseTime,
    updated_at: baseTime,
    children: [
      {
        id: 101,
        parent_id: 1,
        name: "用户查询",
        path: "/admin-api/v1/user/query_user_list",
        method: "POST",
        traceable: 0,
        status: 0,
        created_at: baseTime,
        updated_at: baseTime,
        children: [],
      },
      {
        id: 102,
        parent_id: 1,
        name: "角色查询",
        path: "/admin-api/v1/role/query_role_list",
        method: "POST",
        traceable: 0,
        status: 0,
        created_at: baseTime,
        updated_at: baseTime,
        children: [],
      },
    ],
  },
];

const mockUserInfo = {
  user_id: "00000000-0000-0000-0000-000000000001",
  username: "admin",
  avatar: MOCK_AVATAR,
  nickname: "管理员",
  user_type: "admin",
};

const mockGuestInfo = {
  device_id: "mock-device-id",
  os: "macOS",
  browser: "Chrome",
  ip_address: "127.0.0.1",
  ip_source: "本机",
};

/** 模拟游客 */
const mockGuests = [
  {
    id: 1,
    device_id: "mock-device-id",
    os: "macOS",
    browser: "Chrome",
    ip_address: "127.0.0.1",
    ip_source: "本机",
    created_at: baseTime,
    updated_at: baseTime,
  },
  {
    id: 2,
    device_id: "mock-device-id-2",
    os: "Windows 11",
    browser: "Edge",
    ip_address: "192.168.1.10",
    ip_source: "内网",
    created_at: baseTime,
    updated_at: baseTime,
  },
];

/** 模拟在线用户 */
const mockOnlineUsers = [
  { user_info: mockUserInfo, guest_info: mockGuestInfo, last_active_at: baseTime },
];

export default defineMock([
  // ==================== 用户 ====================
  {
    url: "user/query_user_list",
    method: ["POST"],
    body: ok({ list: mockUsers, total: mockUsers.length }),
  },
  {
    url: "user/get_online_users",
    method: ["GET"],
    body: ok({ list: mockOnlineUsers }),
  },
  { url: "user/reset_user_password", method: ["POST"], body: ok({ success: true }) },
  { url: "user/update_user_roles", method: ["PUT"], body: ok({ success: true }) },
  { url: "user/update_user_status", method: ["PUT"], body: ok({ success: true }) },

  // ==================== 角色 ====================
  {
    url: "role/query_role_list",
    method: ["POST"],
    body: ok({ list: mockRoles, total: mockRoles.length }),
  },
  {
    url: "role/get_role_permissions",
    method: ["GET"],
    body: ok({ role_id: 1, api_ids: [101, 102], menu_ids: [1, 101, 102] }),
  },
  { url: "role/create_role", method: ["POST"], body: ok(mockRoles[0]) },
  { url: "role/update_role", method: ["PUT"], body: ok(mockRoles[0]) },
  { url: "role/delete_role", method: ["DELETE"], body: batch() },
  { url: "role/update_role_api_permissions", method: ["PUT"], body: ok({}) },
  { url: "role/update_role_menu_permissions", method: ["PUT"], body: ok({}) },

  // ==================== 菜单 ====================
  {
    url: "menu/query_menu_list",
    method: ["POST"],
    body: ok({ list: mockMenus, total: mockMenus.length }),
  },
  { url: "menu/create_menu", method: ["POST"], body: ok(mockMenus[0]) },
  { url: "menu/update_menu", method: ["PUT"], body: ok(mockMenus[0]) },
  { url: "menu/delete_menu", method: ["DELETE"], body: batch() },
  { url: "menu/clean_menu", method: ["POST"], body: ok({ success_count: 2 }) },
  { url: "menu/sync_menu", method: ["POST"], body: ok({ success_count: 2 }) },

  // ==================== 接口 ====================
  {
    url: "api/query_api_list",
    method: ["POST"],
    body: ok({ list: mockApis, total: mockApis.length }),
  },
  { url: "api/create_api", method: ["POST"], body: ok(mockApis[0]) },
  { url: "api/update_api", method: ["PUT"], body: ok(mockApis[0]) },
  { url: "api/delete_api", method: ["DELETE"], body: batch() },
  { url: "api/clean_api", method: ["POST"], body: ok({ success_count: 2 }) },
  { url: "api/sync_api", method: ["POST"], body: ok({ success_count: 2 }) },

  // ==================== 游客 ====================
  {
    url: "guest/query_guest_list",
    method: ["POST"],
    body: ok({ list: mockGuests, total: mockGuests.length }),
  },
]);
