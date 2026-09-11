import request from "@/utils/request";
import type {
  BatchResp,
  CreateNotifyMessageReq,
  DeleteNotifyMessageReq,
  GetNotifyMessageReq,
  NotifyMessageVO,
  PageResult,
  PublishNotifyMessageReq,
  QueryNotifyMessageListReq,
  RevokeNotifyMessageReq,
  UpdateNotifyMessageReq,
} from "@/api/types";

/** 通知管理 */
export const NotifyMessageAPI = {
  /** 创建统一通知消息 */
  createNotifyMessage(data?: CreateNotifyMessageReq): Promise<ApiResponse<NotifyMessageVO>> {
    return request({
      url: `/admin-api/v1/notify_message/create_notify_message`,
      method: "POST",
      data,
    });
  },

  /** 批量删除统一通知消息 */
  deleteNotifyMessage(data?: DeleteNotifyMessageReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/notify_message/delete_notify_message`,
      method: "DELETE",
      data,
    });
  },

  /** 获取统一通知消息详情 */
  getNotifyMessage(params?: GetNotifyMessageReq): Promise<ApiResponse<NotifyMessageVO>> {
    return request({
      url: `/admin-api/v1/notify_message/get_notify_message`,
      method: "GET",
      params,
    });
  },

  /** 发布统一通知消息 */
  publishNotifyMessage(data?: PublishNotifyMessageReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/notify_message/publish_notify_message`,
      method: "POST",
      data,
    });
  },

  /** 获取统一通知消息列表 */
  queryNotifyMessageList(data?: QueryNotifyMessageListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/notify_message/query_notify_message_list`,
      method: "POST",
      data,
    });
  },

  /** 撤回统一通知消息 */
  revokeNotifyMessage(data?: RevokeNotifyMessageReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/notify_message/revoke_notify_message`,
      method: "POST",
      data,
    });
  },

  /** 更新统一通知消息 */
  updateNotifyMessage(data?: UpdateNotifyMessageReq): Promise<ApiResponse<NotifyMessageVO>> {
    return request({
      url: `/admin-api/v1/notify_message/update_notify_message`,
      method: "PUT",
      data,
    });
  },
};
