import request from "@/utils/request";
import type { BatchResp, IdsReq, PageResp, QueryMessageReq, UpdateMessageStatusReq } from "./types";

export const MessageAPI = {
  /** 删除留言 */
  deletesMessageApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/message/deletes_message",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取留言列表 */
  findMessageListApi(data?: QueryMessageReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/message/find_message_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新留言状态 */
  updateMessageStatusApi(data?: UpdateMessageStatusReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/message/update_message_status",
      method: "PUT",
      data: data,
    });
  },
};
