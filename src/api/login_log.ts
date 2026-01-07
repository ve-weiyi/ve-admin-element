import request from "@/utils/request";
import type { BatchResp, IdsReq, PageResp, QueryLoginLogReq } from "./types";

export const LoginLogAPI = {
  /** 删除登录日志 */
  deletesLoginLogApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/login_log/deletes_login_log",
      method: "DELETE",
      data: data,
    });
  },

  /** 查询登录日志 */
  findLoginLogListApi(data?: QueryLoginLogReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/user/find_login_log_list",
      method: "POST",
      data: data,
    });
  },
};
