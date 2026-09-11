import { defineMock } from "./base";

/** 演示头像，用于开发态展示非兜底路径 */
const MOCK_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23409eff'/%3E%3Ctext x='20' y='27' font-size='20' font-family='sans-serif' text-anchor='middle' fill='%23fff'%3EA%3C/text%3E%3C/svg%3E";

/** 模拟当前登录用户资料 */
const mockProfile = {
  user_id: "00000000-0000-0000-0000-000000000001",
  username: "admin",
  nickname: "管理员",
  avatar: MOCK_AVATAR,
  email: "admin@example.com",
  mobile: "13800000000",
  status: 1,
  created_at: 1700000000000,
  updated_at: 1700000000000,
  third_party: [],
  roles: ["ROOT"],
  perms: ["*:*:*"],
  gender: 1,
  intro: "",
  website: "",
};

/** 模拟当前登录用户角色 */
const mockRole = {
  id: 1,
  parent_id: 0,
  role_key: "ROOT",
  role_label: "超级管理员",
  role_comment: "拥有全部权限",
};

export default defineMock([
  {
    url: "user/me/get_user_profile",
    method: ["GET"],
    body: { code: 200, data: mockProfile, msg: "ok" },
  },

  {
    url: "user/me/get_user_apis",
    method: ["GET"],
    body: { code: 200, data: { list: [] }, msg: "ok" },
  },

  {
    // 返回空列表，触发开发者模式下的本地静态路由
    url: "user/me/get_user_menus",
    method: ["GET"],
    body: { code: 200, data: { list: [] }, msg: "ok" },
  },

  {
    url: "user/me/get_user_roles",
    method: ["GET"],
    body: { code: 200, data: { list: [mockRole] }, msg: "ok" },
  },
]);
