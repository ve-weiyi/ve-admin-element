import request from "@/utils/request";
import { CommentReviewReq, CommentBackDTO, IdsReq, BatchResp, IdReq, CommentQuery, PageResp } from "./types";

/** "批量删除评论" */
export function batchDeleteCommentApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/comment/batch_delete_comment",
    method: "delete",
    data: data,
  });
}

/** "删除评论" */
export function deleteCommentApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/comment/delete_comment",
    method: "delete",
    data: data,
  });
}

/** "查询评论列表(后台)" */
export function findCommentBackListApi(data?: CommentQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/comment/find_comment_back_list",
    method: "post",
    data: data,
  });
}

/** "更新评论审核状态" */
export function updateCommentReviewApi(data?: CommentReviewReq): Promise<IApiResponse<CommentBackDTO>> {
  return request({
    url: "/admin_api/v1/comment/update_comment_review",
    method: "put",
    data: data,
  });
}
