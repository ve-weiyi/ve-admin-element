import request from "@/utils/request";
import type { BatchResp, IdReq, NewPageReq, PageBackVO, PageResp, QueryPageReq } from "./types";

export const PageAPI = {
  /** 创建页面 */
  addPageApi(data?: NewPageReq): Promise<IApiResponse<PageBackVO>> {
    return request({
      url: "/admin-api/v1/page/add_page",
      method: "POST",
      data: data,
    });
  },

  /** 删除页面 */
  deletePageApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/page/delete_page",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取页面列表 */
  findPageListApi(data?: QueryPageReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/page/find_page_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新页面 */
  updatePageApi(data?: NewPageReq): Promise<IApiResponse<PageBackVO>> {
    return request({
      url: "/admin-api/v1/page/update_page",
      method: "PUT",
      data: data,
    });
  },
};
