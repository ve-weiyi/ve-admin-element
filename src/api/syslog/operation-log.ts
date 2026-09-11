import request from "@/utils/request";
import type {
  BatchResp,
  DeleteOperationLogReq,
  PageResult,
  QueryOperationLogListReq,
} from "@/api/types";

/** 操作日志 */
export const OperationLogAPI = {
  /** 批量删除操作日志 */
  deleteOperationLog(data?: DeleteOperationLogReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/operation_log/delete_operation_log`,
      method: "DELETE",
      data,
    });
  },

  /** 获取操作日志列表 */
  queryOperationLogList(data?: QueryOperationLogListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/operation_log/query_operation_log_list`,
      method: "POST",
      data,
    });
  },
};
