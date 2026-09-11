import request from "@/utils/request";
import type {
  BatchResp,
  DeleteCommentReq,
  PageResult,
  QueryCommentListReq,
  UpdateCommentStatusReq,
} from "@/api/types";

/** 评论管理 */
export const CommentAPI = {
  /** 批量删除评论 */
  deleteComment(data?: DeleteCommentReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/comment/delete_comment`,
      method: "DELETE",
      data,
    });
  },

  /** 获取评论列表(后台) */
  queryCommentList(data?: QueryCommentListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/comment/query_comment_list`,
      method: "POST",
      data,
    });
  },

  /** 批量更新评论状态 */
  updateCommentStatus(data?: UpdateCommentStatusReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/comment/update_comment_status`,
      method: "PUT",
      data,
    });
  },
};
