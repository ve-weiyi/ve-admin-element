import request from "@/utils/request";
import type { BatchResp, DeleteVisitLogReq, PageResult, QueryVisitLogListReq } from "@/api/types";

/** 访问日志 */
export const VisitLogAPI = {
  /** 批量删除访问日志 */
  deleteVisitLog(data?: DeleteVisitLogReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/visit_log/delete_visit_log`,
      method: "DELETE",
      data,
    });
  },

  /** 获取访问日志列表 */
  queryVisitLogList(data?: QueryVisitLogListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/visit_log/query_visit_log_list`,
      method: "POST",
      data,
    });
  },
};
