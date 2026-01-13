import request from "@/utils/request";
import type { BatchResp, IdsReq, PageResp, QueryRemarkReq, UpdateRemarkStatusReq } from "./types";

export const RemarkAPI = {
  /** 删除留言 */
  deletesRemarkApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/remark/deletes_remark",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取留言列表 */
  findRemarkListApi(data?: QueryRemarkReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/remark/find_remark_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新留言 */
  updateRemarkStatusApi(data?: UpdateRemarkStatusReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/remark/update_remark_review",
      method: "PUT",
      data: data,
    });
  },
};
