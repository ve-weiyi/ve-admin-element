import { defineMock } from "./base";

export default defineMock([
  {
    url: "/admin-api/v1/notice/find_user_notice_list",
    method: ["POST"],
    body: {
      code: 200,
      data: {
        list: [
          {
            id: "1",
            title: "系统更新通知",
            content: "系统将于今晚22:00进行维护升级",
            type: 1,
            status: 0,
            created_at: 1640000000,
          },
          {
            id: "2",
            title: "新功能上线",
            content: "博客管理功能已上线，欢迎体验",
            type: 2,
            status: 1,
            created_at: 1640086400,
          },
        ],
        total: 2,
        page: 1,
        page_size: 10,
      },
      msg: "一切ok",
    },
  },
]);
