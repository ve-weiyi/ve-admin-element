import request from "@/utils/request";
import type { BatchResp, DeleteUploadLogReq, PageResult, QueryUploadLogListReq } from "@/api/types";

/** 文件日志 */
export const UploadLogAPI = {
  /** 批量删除文件日志 */
  deleteUploadLog(data?: DeleteUploadLogReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/upload_log/delete_upload_log`,
      method: "DELETE",
      data,
    });
  },

  /** 获取文件日志列表 */
  queryUploadLogList(data?: QueryUploadLogListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/upload_log/query_upload_log_list`,
      method: "POST",
      data,
    });
  },
};
