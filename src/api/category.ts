import request from "@/utils/request";
import type { BatchResp, CategoryBackDTO, CategoryNewReq, CategoryQuery, IdReq, IdsReq, PageResp } from "./types";

export const CategoryAPI = {

  /** 创建文章分类 */
  addCategoryApi(data?: CategoryNewReq): Promise<IApiResponse<CategoryBackDTO>> {
    return request({
      url: "/admin_api/v1/category/add_category",
      method: "POST",
      data: data,
    });
  },

  /** 批量删除文章分类 */
  batchDeleteCategoryApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/category/batch_delete_category",
      method: "DELETE",
      data: data,
    });
  },

  /** 删除文章分类 */
  deleteCategoryApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/category/delete_category",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取文章分类列表 */
  findCategoryListApi(data?: CategoryQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin_api/v1/category/find_category_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新文章分类 */
  updateCategoryApi(data?: CategoryNewReq): Promise<IApiResponse<CategoryBackDTO>> {
    return request({
      url: "/admin_api/v1/category/update_category",
      method: "PUT",
      data: data,
    });
  },
};
