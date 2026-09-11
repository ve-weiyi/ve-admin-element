import request from "@/utils/request";
import type {
  BatchResp,
  CategoryVO,
  CreateCategoryReq,
  DeleteCategoryReq,
  PageResult,
  QueryCategoryListReq,
  UpdateCategoryReq,
} from "@/api/types";

/** 分类管理 */
export const CategoryAPI = {
  /** 创建分类 */
  createCategory(data?: CreateCategoryReq): Promise<ApiResponse<CategoryVO>> {
    return request({
      url: `/admin-api/v1/category/create_category`,
      method: "POST",
      data,
    });
  },

  /** 批量删除分类 */
  deleteCategory(data?: DeleteCategoryReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/category/delete_category`,
      method: "DELETE",
      data,
    });
  },

  /** 获取分类列表 */
  queryCategoryList(data?: QueryCategoryListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/category/query_category_list`,
      method: "POST",
      data,
    });
  },

  /** 更新分类 */
  updateCategory(data?: UpdateCategoryReq): Promise<ApiResponse<CategoryVO>> {
    return request({
      url: `/admin-api/v1/category/update_category`,
      method: "PUT",
      data,
    });
  },
};
