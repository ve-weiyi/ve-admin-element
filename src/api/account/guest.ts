import request from "@/utils/request";
import type { GetGuestReq, GetGuestResp, PageResult, QueryGuestListReq } from "@/api/types";

/** 访客管理 */
export const GuestAPI = {
  /** 获取游客信息 */
  getGuest(params?: GetGuestReq): Promise<ApiResponse<GetGuestResp>> {
    return request({
      url: `/admin-api/v1/guest/get_guest`,
      method: "GET",
      params,
    });
  },

  /** 获取访客列表 */
  queryGuestList(data?: QueryGuestListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/guest/query_guest_list`,
      method: "POST",
      data,
    });
  },
};
