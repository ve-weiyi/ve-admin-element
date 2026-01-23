import { defineMock } from "./base";

export default defineMock([
  {
    url: "/admin-api/v1/user/get_user_info",
    method: ["GET"],
    body: {
      code: 200,
      data: {
        user_id: "2",
        username: "admin",
        nickname: "管理员",
        avatar: "https://mms1.baidu.com/it/u=2815887849,1501151317&fm=253&app=138&f=JPEG",
        email: "admin@example.com",
        phone: "13800138000",
        created_at: 1640000000,
        register_type: "email",
        gender: 1,
        intro: "系统管理员",
        website: "https://veweiyi.cn",
        third_party: [],
        roles: ["admin"],
        perms: ["*:*:*"],
      },
      msg: "一切ok",
    },
  },
  {
    url: "/admin-api/v1/user/get_user_menus",
    method: ["GET"],
    body: {
      code: 200,
      data: {
        list: [
          {
            id: 1,
            parent_id: 0,
            path: "/dashboard",
            name: "Dashboard",
            component: "Layout",
            redirect: "/dashboard/index",
            meta: { title: "首页", icon: "dashboard", affix: true },
            created_at: 1640000000,
            updated_at: 1640000000,
          },
        ],
      },
      msg: "一切ok",
    },
  },
  {
    url: "/admin-api/v1/user/get_user_roles",
    method: ["GET"],
    body: {
      code: 200,
      data: {
        list: [
          {
            id: 1,
            parent_id: 0,
            role_key: "admin",
            role_label: "管理员",
            role_comment: "系统管理员",
          },
        ],
      },
      msg: "一切ok",
    },
  },
  {
    url: "/admin-api/v1/user/get_user_apis",
    method: ["GET"],
    body: {
      code: 200,
      data: {
        list: [
          {
            id: 1,
            parent_id: 0,
            name: "用户管理",
            path: "/admin-api/v1/user/*",
            method: "*",
            created_at: 1640000000,
            updated_at: 1640000000,
            children: [],
          },
        ],
      },
      msg: "一切ok",
    },
  },
  {
    url: "/admin-api/v1/user/get_user_login_history_list",
    method: ["POST"],
    body: {
      code: 200,
      data: {
        list: [
          {
            id: 1,
            user_id: "2",
            ip_address: "127.0.0.1",
            ip_source: "本地",
            browser: "Chrome",
            os: "macOS",
            login_time: 1640000000,
          },
        ],
        total: 1,
        page: 1,
        page_size: 10,
      },
      msg: "一切ok",
    },
  },
  {
    url: "/admin-api/v1/user/update_user_info",
    method: ["PUT"],
    body: {
      code: 200,
      data: {},
      msg: "更新成功",
    },
  },
  {
    url: "/admin-api/v1/user/update_user_avatar",
    method: ["PUT"],
    body: {
      code: 200,
      data: {},
      msg: "更新成功",
    },
  },
  {
    url: "/admin-api/v1/user/update_user_password",
    method: ["PUT"],
    body: {
      code: 200,
      data: {},
      msg: "密码修改成功",
    },
  },
  {
    url: "/admin-api/v1/user/update_user_bind_email",
    method: ["PUT"],
    body: {
      code: 200,
      data: {},
      msg: "邮箱绑定成功",
    },
  },
  {
    url: "/admin-api/v1/user/update_user_bind_phone",
    method: ["PUT"],
    body: {
      code: 200,
      data: {},
      msg: "手机绑定成功",
    },
  },
  {
    url: "/admin-api/v1/user/update_user_bind_third_party",
    method: ["PUT"],
    body: {
      code: 200,
      data: {},
      msg: "第三方账号绑定成功",
    },
  },
  {
    url: "/admin-api/v1/user/delete_user_bind_third_party",
    method: ["POST"],
    body: {
      code: 200,
      data: {},
      msg: "解绑成功",
    },
  },
]);
