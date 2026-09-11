import { defineMock } from "./base";

/** 近 7 日访问趋势 */
const mockTrend = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(Date.now() - (6 - i) * 86400000).toISOString().slice(0, 10);
  const base = 100 + i * 12;
  return {
    date,
    new_users: 5 + i,
    total_users: 1200 + i * 10,
    active_users: base,
    uv_count: base * 3,
    pv_count: base * 12,
    total_uv_count: 12000 + i * 100,
    total_pv_count: 55000 + i * 500,
  };
});

const mockCategoryOverview = [
  { id: 1, category_name: "技术", article_count: 32 },
  { id: 2, category_name: "生活", article_count: 18 },
  { id: 3, category_name: "随笔", article_count: 11 },
];

const mockTagOverview = [
  { id: 1, tag_name: "Vue", article_count: 14 },
  { id: 2, tag_name: "Go", article_count: 9 },
  { id: 3, tag_name: "Docker", article_count: 6 },
];

const mockArticleViewRanks = [
  { id: 1, article_title: "Vue3 组合式 API 实践", view_count: 1280 },
  { id: 2, article_title: "Go 并发模式", view_count: 960 },
  { id: 3, article_title: "容器化部署笔记", view_count: 720 },
];

const mockArticleStatistics = Array.from({ length: 7 }, (_, i) => ({
  date: new Date(Date.now() - (6 - i) * 86400000).toISOString().slice(0, 10),
  count: 3 + i,
}));

const mockRegionStats = [
  { name: "广东", value: 320 },
  { name: "北京", value: 280 },
  { name: "浙江", value: 210 },
  { name: "上海", value: 180 },
  { name: "四川", value: 120 },
];

export default defineMock([
  {
    url: "stats/get_stats_dashboard",
    method: ["GET"],
    body: {
      code: 200,
      data: {
        user_count: 1280,
        article_count: 61,
        message_count: 47,
        today: mockTrend[mockTrend.length - 1],
        uv_growth_rate: 12.5,
        pv_growth_rate: 8.3,
        user_growth_rate: 4.1,
      },
      msg: "ok",
    },
  },

  {
    url: "stats/get_visit_trend",
    method: ["POST"],
    body: { code: 200, data: { list: mockTrend }, msg: "ok" },
  },

  {
    url: "stats/get_article_analytics",
    method: ["GET"],
    body: {
      code: 200,
      data: {
        category_list: mockCategoryOverview,
        tag_list: mockTagOverview,
        article_view_ranks: mockArticleViewRanks,
        article_statistics: mockArticleStatistics,
      },
      msg: "ok",
    },
  },

  {
    url: "stats/get_user_geo_stats",
    method: ["POST"],
    body: {
      code: 200,
      data: { users: mockRegionStats, visitors: mockRegionStats },
      msg: "ok",
    },
  },
]);
