import request from "@/utils/request";
import type { BatchResp, IdsReq, PageResp, QueryFileLogReq } from "./types";

export const FileLogAPI = {
  /** 删除文件日志 */
  deletesFileLogApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/file_log/deletes_file_log",
      method: "DELETE",
      data: data,
    });
  },

  /** 查询文件日志 */
  findFileLogListApi(data?: QueryFileLogReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/user/find_file_log_list",
      method: "POST",
      data: data,
    });
  },
};
