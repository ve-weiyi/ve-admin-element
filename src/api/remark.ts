import request from "@/utils/request";
import {
  BatchResp,
  IdReq,
  IdsReq,
  PageResp,
  RemarkBackDTO,
  RemarkNewReq,
  RemarkQuery,
} from "./types";

/** "分页获取留言列表" */
export function findRemarkListApi(data?: RemarkQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/remark/find_remark_list",
    method: "post",
    data: data,
  });
}

/** "批量删除留言" */
export function batchDeleteRemarkApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/remark/batch_delete_remark",
    method: "delete",
    data: data,
  });
}

/** "删除留言" */
export function deleteRemarkApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/remark/delete_remark",
    method: "delete",
    data: data,
  });
}

/** "更新留言" */
export function updateRemarkApi(data?: RemarkNewReq): Promise<IApiResponse<RemarkBackDTO>> {
  return request({
    url: "/admin_api/v1/remark/update_remark",
    method: "put",
    data: data,
  });
}
