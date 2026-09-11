import { defineMock } from "./base";

/** 演示头像，用于开发态展示非兜底路径 */
const MOCK_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23409eff'/%3E%3Ctext x='20' y='27' font-size='20' font-family='sans-serif' text-anchor='middle' fill='%23fff'%3EA%3C/text%3E%3C/svg%3E";

const baseTime = 1700000000000;

const ok = (data: unknown) => ({ code: 200, data, msg: "ok" });
const batch = (n = 1) => ok({ success_count: n });

const mockUserInfo = {
  user_id: "00000000-0000-0000-0000-000000000001",
  username: "admin",
  avatar: MOCK_AVATAR,
  nickname: "管理员",
  user_type: "admin",
};

/** 友链 */
const mockFriends = [
  {
    id: 1,
    link_name: "示例站点",
    link_avatar: "",
    link_address: "https://example.com",
    link_intro: "一个示例站点",
    created_at: baseTime,
    updated_at: baseTime,
  },
  {
    id: 2,
    link_name: "技术博客",
    link_avatar: "",
    link_address: "https://blog.example.com",
    link_intro: "技术分享",
    created_at: baseTime,
    updated_at: baseTime,
  },
];

/** 说说 */
const mockTalks = [
  {
    id: 1,
    user_id: mockUserInfo.user_id,
    content: "今天天气不错",
    img_list: [],
    is_top: 0,
    status: 1,
    like_count: 3,
    comment_count: 1,
    created_at: baseTime,
    updated_at: baseTime,
    user_info: mockUserInfo,
  },
  {
    id: 2,
    user_id: mockUserInfo.user_id,
    content: "记录一下",
    img_list: [],
    is_top: 1,
    status: 1,
    like_count: 0,
    comment_count: 0,
    created_at: baseTime,
    updated_at: baseTime,
    user_info: mockUserInfo,
  },
];

export default defineMock([
  // ==================== 友链 ====================
  {
    url: "friend/query_friend_list",
    method: ["POST"],
    body: ok({ list: mockFriends, total: mockFriends.length }),
  },
  { url: "friend/create_friend", method: ["POST"], body: ok(mockFriends[0]) },
  { url: "friend/update_friend", method: ["PUT"], body: ok(mockFriends[0]) },
  { url: "friend/delete_friend", method: ["DELETE"], body: batch() },

  // ==================== 说说 ====================
  {
    url: "talk/query_talk_list",
    method: ["POST"],
    body: ok({ list: mockTalks, total: mockTalks.length }),
  },
  { url: "talk/create_talk", method: ["POST"], body: ok(mockTalks[0]) },
  { url: "talk/update_talk", method: ["PUT"], body: ok(mockTalks[0]) },
  { url: "talk/delete_talk", method: ["DELETE"], body: batch() },
]);
