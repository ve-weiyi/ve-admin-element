import request from "@/utils/request";
import type {
  BatchResp,
  CreatePageReq,
  DeletePageReq,
  PageResult,
  PageVO,
  QueryPageListReq,
  UpdatePageReq,
} from "@/api/types";

/** 页面管理 */
export const PageAPI = {
  /** 创建页面 */
  createPage(data?: CreatePageReq): Promise<ApiResponse<PageVO>> {
    return request({
      url: `/admin-api/v1/page/create_page`,
      method: "POST",
      data,
    });
  },

  /** 删除页面 */
  deletePage(data?: DeletePageReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/page/delete_page`,
      method: "DELETE",
      data,
    });
  },

  /** 获取页面列表 */
  queryPageList(data?: QueryPageListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/page/query_page_list`,
      method: "POST",
      data,
    });
  },

  /** 更新页面 */
  updatePage(data?: UpdatePageReq): Promise<ApiResponse<PageVO>> {
    return request({
      url: `/admin-api/v1/page/update_page`,
      method: "PUT",
      data,
    });
  },
};
