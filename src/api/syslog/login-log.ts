import request from "@/utils/request";
import type { BatchResp, DeleteLoginLogReq, PageResult, QueryLoginLogListReq } from "@/api/types";

/** 登录日志 */
export const LoginLogAPI = {
  /** 批量删除登录日志 */
  deleteLoginLog(data?: DeleteLoginLogReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/login_log/delete_login_log`,
      method: "DELETE",
      data,
    });
  },

  /** 获取登录日志列表 */
  queryLoginLogList(data?: QueryLoginLogListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/login_log/query_login_log_list`,
      method: "POST",
      data,
    });
  },
};
