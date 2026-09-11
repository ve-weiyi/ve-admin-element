import request from "@/utils/request";
import type {
  BatchResp,
  DeleteMessageReq,
  PageResult,
  QueryMessageListReq,
  UpdateMessageStatusReq,
} from "@/api/types";

/** 留言管理 */
export const MessageAPI = {
  /** 批量删除留言 */
  deleteMessage(data?: DeleteMessageReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/message/delete_message`,
      method: "DELETE",
      data,
    });
  },

  /** 获取留言列表 */
  queryMessageList(data?: QueryMessageListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/message/query_message_list`,
      method: "POST",
      data,
    });
  },

  /** 批量更新留言状态 */
  updateMessageStatus(data?: UpdateMessageStatusReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/message/update_message_status`,
      method: "PUT",
      data,
    });
  },
};
