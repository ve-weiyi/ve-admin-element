import request from "@/utils/request";
import type {
  AddNoticeReq,
  BatchResp,
  IdReq,
  IdsReq,
  NoticeBackVO,
  PageResp,
  QueryNoticeReq,
  QueryUserNoticeReq,
  UpdateNoticeReq,
  UpdateNoticeStatusReq,
} from "./types";

export const NoticeAPI = {
  /** 创建通知 */
  addNoticeApi(data?: AddNoticeReq): Promise<IApiResponse<NoticeBackVO>> {
    return request({
      url: "/admin-api/v1/notice/add_notice",
      method: "POST",
      data: data,
    });
  },

  /** 删除通知 */
  deletesNoticeApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/notice/deletes_notice",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取通知列表 */
  findNoticeListApi(data?: QueryNoticeReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/notice/find_notice_list",
      method: "POST",
      data: data,
    });
  },

  /** 查询用户通知列表 */
  findUserNoticeListApi(data?: QueryUserNoticeReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/notice/find_user_notice_list",
      method: "POST",
      data: data,
    });
  },

  /** 查询通知详情 */
  getNoticeApi(data?: IdReq): Promise<IApiResponse<NoticeBackVO>> {
    return request({
      url: "/admin-api/v1/notice/get_notice",
      method: "GET",
      data: data,
    });
  },

  /** 更新通知 */
  updateNoticeApi(data?: UpdateNoticeReq): Promise<IApiResponse<NoticeBackVO>> {
    return request({
      url: "/admin-api/v1/notice/update_notice",
      method: "PUT",
      data: data,
    });
  },

  /** 更新通知状态 */
  updateNoticeStatusApi(data?: UpdateNoticeStatusReq): Promise<IApiResponse<NoticeBackVO>> {
    return request({
      url: "/admin-api/v1/notice/update_notice_status",
      method: "PUT",
      data: data,
    });
  },
};
