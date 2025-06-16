import request from "@/utils/request";
import type { BatchResp, IdsReq, PageResp, TagBackVO, TagNewReq, TagQuery } from "./types";

export const TagAPI = {
  /** 创建标签 */
  addTagApi(data?: TagNewReq): Promise<IApiResponse<TagBackVO>> {
    return request({
      url: "/admin-api/v1/tag/add_tag",
      method: "POST",
      data: data,
    });
  },

  /** 删除标签 */
  deletesTagApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/tag/deletes_tag",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取标签列表 */
  findTagListApi(data?: TagQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/tag/find_tag_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新标签 */
  updateTagApi(data?: TagNewReq): Promise<IApiResponse<TagBackVO>> {
    return request({
      url: "/admin-api/v1/tag/update_tag",
      method: "PUT",
      data: data,
    });
  },
};
