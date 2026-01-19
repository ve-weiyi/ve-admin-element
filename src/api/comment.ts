import request from "@/utils/request";
import type { BatchResp, IdsReq, PageResp, QueryCommentReq, UpdateCommentStatusReq } from "./types";

export const CommentAPI = {
  /** 删除评论 */
  deletesCommentApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/comment/deletes_comment",
      method: "DELETE",
      data: data,
    });
  },

  /** 查询评论列表(后台) */
  findCommentBackListApi(data?: QueryCommentReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/comment/find_comment_back_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新评论状态 */
  updateCommentStatusApi(data?: UpdateCommentStatusReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/comment/update_comment_status",
      method: "PUT",
      data: data,
    });
  },
};
