import request from "@/utils/request";
import type {
  BatchResp,
  CategoryBackVO,
  IdsReq,
  NewCategoryReq,
  PageResp,
  QueryCategoryReq,
} from "./types";

export const CategoryAPI = {
  /** 创建文章分类 */
  addCategoryApi(data?: NewCategoryReq): Promise<IApiResponse<CategoryBackVO>> {
    return request({
      url: "/admin-api/v1/category/add_category",
      method: "POST",
      data: data,
    });
  },

  /** 删除文章分类 */
  deletesCategoryApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/category/deletes_category",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取文章分类列表 */
  findCategoryListApi(data?: QueryCategoryReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/category/find_category_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新文章分类 */
  updateCategoryApi(data?: NewCategoryReq): Promise<IApiResponse<CategoryBackVO>> {
    return request({
      url: "/admin-api/v1/category/update_category",
      method: "PUT",
      data: data,
    });
  },
};
