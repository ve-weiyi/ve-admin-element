import { defineMock } from "./base";

const baseTime = 1700000000000;

const ok = (data: unknown) => ({ code: 200, data, msg: "ok" });
const batch = (n = 1) => ok({ success_count: n });

/** 文章 */
const mockArticles = [
  {
    id: 1,
    article_cover: "",
    article_title: "Vue3 组合式 API 实践",
    article_content: "<p>模拟正文</p>",
    article_type: 1,
    original_url: "",
    is_top: 1,
    is_delete: 0,
    status: 1,
    created_at: baseTime,
    updated_at: baseTime,
    category_name: "技术",
    tag_name_list: ["Vue", "前端"],
    like_count: 12,
    views_count: 340,
  },
  {
    id: 2,
    article_cover: "",
    article_title: "Go 并发模式笔记",
    article_content: "<p>模拟正文</p>",
    article_type: 1,
    original_url: "",
    is_top: 0,
    is_delete: 0,
    status: 1,
    created_at: baseTime,
    updated_at: baseTime,
    category_name: "技术",
    tag_name_list: ["Go"],
    like_count: 5,
    views_count: 120,
  },
];

/** 分类 */
const mockCategories = [
  { id: 1, category_name: "技术", article_count: 32, created_at: baseTime, updated_at: baseTime },
  { id: 2, category_name: "生活", article_count: 18, created_at: baseTime, updated_at: baseTime },
];

/** 标签 */
const mockTags = [
  { id: 1, tag_name: "Vue", article_count: 14, created_at: baseTime, updated_at: baseTime },
  { id: 2, tag_name: "Go", article_count: 9, created_at: baseTime, updated_at: baseTime },
];

export default defineMock([
  // ==================== 文章 ====================
  {
    url: "article/query_article_list",
    method: ["POST"],
    body: ok({ list: mockArticles, total: mockArticles.length }),
  },
  { url: "article/get_article", method: ["GET"], body: ok(mockArticles[0]) },
  { url: "article/create_article", method: ["POST"], body: ok(mockArticles[0]) },
  { url: "article/update_article", method: ["PUT"], body: ok(mockArticles[0]) },
  { url: "article/delete_article", method: ["DELETE"], body: batch() },
  { url: "article/update_article_delete", method: ["PUT"], body: ok({}) },
  { url: "article/update_article_top", method: ["PUT"], body: ok({}) },
  { url: "article/export_article", method: ["POST"], body: ok({}) },

  // ==================== 分类 ====================
  {
    url: "category/query_category_list",
    method: ["POST"],
    body: ok({ list: mockCategories, total: mockCategories.length }),
  },
  { url: "category/create_category", method: ["POST"], body: ok(mockCategories[0]) },
  { url: "category/update_category", method: ["PUT"], body: ok(mockCategories[0]) },
  { url: "category/delete_category", method: ["DELETE"], body: batch() },

  // ==================== 标签 ====================
  {
    url: "tag/query_tag_list",
    method: ["POST"],
    body: ok({ list: mockTags, total: mockTags.length }),
  },
  { url: "tag/create_tag", method: ["POST"], body: ok(mockTags[0]) },
  { url: "tag/update_tag", method: ["PUT"], body: ok(mockTags[0]) },
  { url: "tag/delete_tag", method: ["DELETE"], body: batch() },
]);
