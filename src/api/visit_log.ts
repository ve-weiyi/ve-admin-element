import request from "@/utils/request";
import { BatchResp, IdsReq, PageResp, VisitLogQuery } from "./types";

/** 分页获取操作记录列表 */
export function findVisitLogListApi(
  data?: VisitLogQuery
): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/visit_log/find_visit_log_list",
    method: "POST",
    data: data,
  });
}

/** 删除操作记录 */
export function deletesVisitLogApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/visit_log/deletes_visit_log",
    method: "DELETE",
    data: data,
  });
}
