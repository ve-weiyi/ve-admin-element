import request from "@/utils/request";
import type { BatchResp, IdsReq, PageResp, VisitLogQuery } from "./types";

export const VisitLogAPI = {
  /** 删除操作记录 */
  deletesVisitLogApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/visit_log/deletes_visit_log",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取操作记录列表 */
  findVisitLogListApi(data?: VisitLogQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/visit_log/find_visit_log_list",
      method: "POST",
      data: data,
    });
  },
};
