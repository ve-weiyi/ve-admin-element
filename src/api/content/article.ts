import request from "@/utils/request";
import type {
  ArticleVO,
  BatchResp,
  CreateArticleReq,
  DeleteArticleReq,
  EmptyResp,
  ExportArticleReq,
  GetArticleReq,
  PageResult,
  QueryArticleListReq,
  UpdateArticleDeleteReq,
  UpdateArticleReq,
  UpdateArticleTopReq,
} from "@/api/types";

/** 文章管理 */
export const ArticleAPI = {
  /** 创建文章 */
  createArticle(data?: CreateArticleReq): Promise<ApiResponse<ArticleVO>> {
    return request({
      url: `/admin-api/v1/article/create_article`,
      method: "POST",
      data,
    });
  },

  /** 删除文章 */
  deleteArticle(data?: DeleteArticleReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/article/delete_article`,
      method: "DELETE",
      data,
    });
  },

  /** 导出文章列表 */
  exportArticle(data?: ExportArticleReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/article/export_article`,
      method: "POST",
      data,
    });
  },

  /** 获取文章详情 */
  getArticle(params?: GetArticleReq): Promise<ApiResponse<ArticleVO>> {
    return request({
      url: `/admin-api/v1/article/get_article`,
      method: "GET",
      params,
    });
  },

  /** 获取文章列表 */
  queryArticleList(data?: QueryArticleListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/article/query_article_list`,
      method: "POST",
      data,
    });
  },

  /** 更新文章 */
  updateArticle(data?: UpdateArticleReq): Promise<ApiResponse<ArticleVO>> {
    return request({
      url: `/admin-api/v1/article/update_article`,
      method: "PUT",
      data,
    });
  },

  /** 更新文章删除状态 */
  updateArticleDelete(data?: UpdateArticleDeleteReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/article/update_article_delete`,
      method: "PUT",
      data,
    });
  },

  /** 更新文章置顶状态 */
  updateArticleTop(data?: UpdateArticleTopReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/article/update_article_top`,
      method: "PUT",
      data,
    });
  },
};
