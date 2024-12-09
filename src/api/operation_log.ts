import request from "@/utils/request";
import { BatchResp, IdsReq, OperationLogQuery, PageResp } from "./types";

/** 分页获取操作记录列表 */
export function findOperationLogListApi(
  data?: OperationLogQuery
): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/operation_log/find_operation_log_list",
    method: "POST",
    data: data,
  });
}

/** 删除操作记录 */
export function deletesOperationLogApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/operation_log/deletes_operation_log",
    method: "DELETE",
    data: data,
  });
}
