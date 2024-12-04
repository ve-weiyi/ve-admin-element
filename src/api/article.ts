import request from "@/utils/request";
import {
  ArticleBackDTO,
  ArticleNewReq,
  ArticleQuery,
  ArticleRecycleReq,
  ArticleTopReq,
  BatchResp,
  EmptyResp,
  IdReq,
  IdsReq,
  PageResp,
} from "./types";

/** 添加文章 */
export function addArticleApi(
  data?: ArticleNewReq
): Promise<IApiResponse<ArticleBackDTO>> {
  return request({
    url: "/admin_api/v1/article/add_article",
    method: "POST",
    data: data,
  });
}

/** 删除文章 */
export function deleteArticleApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/article/delete_article",
    method: "POST",
    data: data,
  });
}

/** 导出文章列表 */
export function exportArticleListApi(data?: IdsReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/admin_api/v1/article/export_article_list",
    method: "POST",
    data: data,
  });
}

/** 查询文章列表 */
export function findArticleListApi(data?: ArticleQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/article/find_article_list",
    method: "POST",
    data: data,
  });
}

/** 查询文章 */
export function getArticleApi(data?: IdReq): Promise<IApiResponse<ArticleBackDTO>> {
  return request({
    url: "/admin_api/v1/article/get_article",
    method: "POST",
    data: data,
  });
}

/** 回收文章 */
export function recycleArticleApi(
  data?: ArticleRecycleReq
): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/admin_api/v1/article/recycle_article",
    method: "POST",
    data: data,
  });
}

/** 置顶文章 */
export function topArticleApi(data?: ArticleTopReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/admin_api/v1/article/top_article",
    method: "POST",
    data: data,
  });
}

/** 保存文章 */
export function updateArticleApi(
  data?: ArticleNewReq
): Promise<IApiResponse<ArticleBackDTO>> {
  return request({
    url: "/admin_api/v1/article/update_article",
    method: "POST",
    data: data,
  });
}
