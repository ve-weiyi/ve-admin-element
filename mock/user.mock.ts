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
]);
