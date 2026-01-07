import request from "@/utils/request";
import type { PageResp, QueryVisitorReq } from "./types";

export const VisitorAPI = {
  /** 分页获取游客列表 */
  findVisitorListApi(data?: QueryVisitorReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/visitor/find_visitor_list",
      method: "POST",
      data: data,
    });
  },
};
