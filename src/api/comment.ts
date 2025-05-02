import request from "@/utils/request";
import type { BatchResp, CommentQuery, CommentReviewReq, IdReq, IdsReq, PageResp } from "./types";

export const CommentAPI = {
  /** 批量删除评论 */
  batchDeleteCommentApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/comment/batch_delete_comment",
      method: "DELETE",
      data: data,
    });
  },

  /** 删除评论 */
  deleteCommentApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/comment/delete_comment",
      method: "DELETE",
      data: data,
    });
  },

  /** 查询评论列表(后台) */
  findCommentBackListApi(data?: CommentQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin_api/v1/comment/find_comment_back_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新评论审核状态 */
  updateCommentReviewApi(data?: CommentReviewReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/comment/update_comment_review",
      method: "PUT",
      data: data,
    });
  },
};
