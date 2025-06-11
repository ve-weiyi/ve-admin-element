import request from "@/utils/request";
import type { BatchResp, IdsReq, PageResp, UploadLogQuery } from "./types";

export const UploadLogAPI = {
  /** 删除登录日志 */
  deletesUploadLogApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/upload_log/deletes_upload_log",
      method: "DELETE",
      data: data,
    });
  },

  /** 查询登录日志 */
  findUploadLogListApi(data?: UploadLogQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/user/find_upload_log_list",
      method: "POST",
      data: data,
    });
  },
};
