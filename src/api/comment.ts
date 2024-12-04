import request from "@/utils/request";
import {
  BatchResp,
  CommentQuery,
  CommentReviewReq,
  IdReq,
  IdsReq,
  PageResp,
} from "./types";

/** 批量删除评论 */
export function batchDeleteCommentApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/comment/batch_delete_comment",
    method: "DELETE",
    data: data,
  });
}

/** 删除评论 */
export function deleteCommentApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/comment/delete_comment",
    method: "DELETE",
    data: data,
  });
}

/** 查询评论列表(后台) */
export function findCommentBackListApi(
  data?: CommentQuery
): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/comment/find_comment_back_list",
    method: "POST",
    data: data,
  });
}

/** 更新评论审核状态 */
export function updateCommentReviewApi(
  data?: CommentReviewReq
): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/comment/update_comment_review",
    method: "PUT",
    data: data,
  });
}
