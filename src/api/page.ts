import request from "@/utils/request";
import type { BatchResp, IdReq, PageBackDTO, PageNewReq, PageQueryReq, PageResp } from "./types";

export const PageAPI = {
  /** 创建页面 */
  addPageApi(data?: PageNewReq): Promise<IApiResponse<PageBackDTO>> {
    return request({
      url: "/admin_api/v1/page/add_page",
      method: "POST",
      data: data,
    });
  },
  
  /** 删除页面 */
  deletePageApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/page/delete_page",
      method: "DELETE",
      data: data,
    });
  },
  
  /** 分页获取页面列表 */
  findPageListApi(data?: PageQueryReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin_api/v1/page/find_page_list",
      method: "POST",
      data: data,
    });
  },
  
  /** 更新页面 */
  updatePageApi(data?: PageNewReq): Promise<IApiResponse<PageBackDTO>> {
    return request({
      url: "/admin_api/v1/page/update_page",
      method: "PUT",
      data: data,
    });
  },
  
};
