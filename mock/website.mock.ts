import { defineMock } from "./base";

const baseTime = 1700000000000;

const ok = (data: unknown) => ({ code: 200, data, msg: "ok" });
const batch = (n = 1) => ok({ success_count: n });

/** 站点配置 */
const mockWebsiteConfig = {
  admin_url: "https://admin.example.com",
  websocket_url: "ws://localhost:9421/admin-api/v1/websocket",
  tourist_avatar: "",
  user_avatar: "",
  website_feature: {
    is_chat_room: 1,
    is_ai_assistant: 0,
    is_music_player: 0,
    is_comment_review: 1,
    is_email_notice: 0,
    is_message_review: 1,
    is_reward: 0,
  },
  website_info: {
    website_author: "站长",
    website_avatar: "",
    website_create_time: "2024-01-01",
    website_intro: "一个用于演示的博客站点",
    website_name: "示例博客",
    website_notice: "欢迎访问",
    website_record_no: "",
  },
  reward_qr_code: {
    alipay_qr_code: "",
    weixin_qr_code: "",
  },
  social_login_list: [],
  social_url_list: [
    { name: "GitHub", platform: "github", link_url: "https://github.com", enabled: true },
  ],
};

/** 系统状态 */
const mockSystemState = {
  os: {
    goos: "darwin",
    numCpu: 8,
    compiler: "gc",
    goVersion: "go1.22",
    numGoroutine: 24,
  },
  cpu: {
    cores: 2,
    cpus: [{ modelName: "Apple M2", cores: 4, cpu: 12.5 }],
  },
  ram: { totalMb: 16384, usedMb: 6144 },
  disk: { totalMb: 512000, usedMb: 204800, totalGb: 500, usedGb: 200, usedPercent: 40 },
};

/** 页面配置 */
const mockPages = [
  {
    id: 1,
    page_name: "about",
    page_label: "关于本站",
    page_cover: "",
    is_carousel: 0,
    carousel_covers: [],
    created_at: baseTime,
    updated_at: baseTime,
  },
  {
    id: 2,
    page_name: "home",
    page_label: "首页轮播",
    page_cover: "",
    is_carousel: 1,
    carousel_covers: [],
    created_at: baseTime,
    updated_at: baseTime,
  },
];

export default defineMock([
  // ==================== 站点配置 ====================
  {
    url: "admin/get_about_me",
    method: ["GET"],
    body: ok({ content: "# 关于我\n\n这里是模拟数据。" }),
  },
  { url: "admin/get_website_config", method: ["GET"], body: ok(mockWebsiteConfig) },
  { url: "admin/get_system_state", method: ["GET"], body: ok(mockSystemState) },
  { url: "admin/update_about_me", method: ["PUT"], body: ok({}) },
  { url: "admin/update_website_config", method: ["PUT"], body: ok({}) },

  // ==================== 页面配置 ====================
  {
    url: "page/query_page_list",
    method: ["POST"],
    body: ok({ list: mockPages, total: mockPages.length }),
  },
  { url: "page/create_page", method: ["POST"], body: ok(mockPages[0]) },
  { url: "page/update_page", method: ["PUT"], body: ok(mockPages[0]) },
  { url: "page/delete_page", method: ["DELETE"], body: batch() },
]);
