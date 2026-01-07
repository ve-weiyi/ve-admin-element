import request from "@/utils/request";
import type {
  ArticleBackVO,
  BatchResp,
  EmptyResp,
  IdReq,
  IdsReq,
  NewArticleReq,
  PageResp,
  QueryArticleReq,
  UpdateArticleDeleteReq,
  UpdateArticleTopReq,
} from "./types";

export const ArticleAPI = {
  /** 添加文章 */
  addArticleApi(data?: NewArticleReq): Promise<IApiResponse<ArticleBackVO>> {
    return request({
      url: "/admin-api/v1/article/add_article",
      method: "POST",
      data: data,
    });
  },

  /** 删除文章 */
  deleteArticleApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/article/delete_article",
      method: "DELETE",
      data: data,
    });
  },

  /** 导出文章列表 */
  exportArticleListApi(data?: IdsReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/article/export_article_list",
      method: "POST",
      data: data,
    });
  },

  /** 查询文章列表 */
  findArticleListApi(data?: QueryArticleReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/article/find_article_list",
      method: "POST",
      data: data,
    });
  },

  /** 查询文章 */
  getArticleApi(data?: IdReq): Promise<IApiResponse<ArticleBackVO>> {
    return request({
      url: "/admin-api/v1/article/get_article",
      method: "POST",
      data: data,
    });
  },

  /** 保存文章 */
  updateArticleApi(data?: NewArticleReq): Promise<IApiResponse<ArticleBackVO>> {
    return request({
      url: "/admin-api/v1/article/update_article",
      method: "PUT",
      data: data,
    });
  },

  /** 更新文章删除状态 */
  updateArticleDeleteApi(data?: UpdateArticleDeleteReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/article/update_article_delete",
      method: "PUT",
      data: data,
    });
  },

  /** 更新文章置顶状态 */
  updateArticleTopApi(data?: UpdateArticleTopReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/article/update_article_top",
      method: "PUT",
      data: data,
    });
  },
};
