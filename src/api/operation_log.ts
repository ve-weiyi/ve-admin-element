import request from "@/utils/request";
import { BatchResp, IdReq, IdsReq, OperationLogQuery, PageResp } from "./types";

/** 批量删除操作记录 */
export function batchDeleteOperationLogApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/operation_log/batch_delete_operation_log",
    method: "DELETE",
    data: data,
  });
}

/** 删除操作记录 */
export function deleteOperationLogApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/operation_log/delete_operation_log",
    method: "DELETE",
    data: data,
  });
}

/** 分页获取操作记录列表 */
export function findOperationLogListApi(data?: OperationLogQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/operation_log/find_operation_log_list",
    method: "POST",
    data: data,
  });
}
