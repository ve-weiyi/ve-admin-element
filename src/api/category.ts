import request from "@/utils/request";
import {
  CategoryQuery,
  PageResp,
  CategoryNewReq,
  CategoryBackDTO,
  IdsReq,
  BatchResp,
  IdReq,
} from "./types";

/** "分页获取文章分类列表" */
export function findCategoryListApi(
  data?: CategoryQuery
): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/category/find_category_list",
    method: "post",
    data: data,
  });
}

/** "创建文章分类" */
export function addCategoryApi(
  data?: CategoryNewReq
): Promise<IApiResponse<CategoryBackDTO>> {
  return request({
    url: "/admin_api/v1/category/add_category",
    method: "post",
    data: data,
  });
}

/** "批量删除文章分类" */
export function batchDeleteCategoryApi(
  data?: IdsReq
): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/category/batch_delete_category",
    method: "delete",
    data: data,
  });
}

/** "删除文章分类" */
export function deleteCategoryApi(
  data?: IdReq
): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/category/delete_category",
    method: "delete",
    data: data,
  });
}

/** "更新文章分类" */
export function updateCategoryApi(
  data?: CategoryNewReq
): Promise<IApiResponse<CategoryBackDTO>> {
  return request({
    url: "/admin_api/v1/category/update_category",
    method: "put",
    data: data,
  });
}
