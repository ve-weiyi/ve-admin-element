import request from "@/utils/request";
import type {
  BatchResp,
  CreateTagReq,
  DeleteTagReq,
  PageResult,
  QueryTagListReq,
  TagVO,
  UpdateTagReq,
} from "@/api/types";

/** 标签管理 */
export const TagAPI = {
  /** 创建标签 */
  createTag(data?: CreateTagReq): Promise<ApiResponse<TagVO>> {
    return request({
      url: `/admin-api/v1/tag/create_tag`,
      method: "POST",
      data,
    });
  },

  /** 删除标签 */
  deleteTag(data?: DeleteTagReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/tag/delete_tag`,
      method: "DELETE",
      data,
    });
  },

  /** 获取标签列表 */
  queryTagList(data?: QueryTagListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/tag/query_tag_list`,
      method: "POST",
      data,
    });
  },

  /** 更新标签 */
  updateTag(data?: UpdateTagReq): Promise<ApiResponse<TagVO>> {
    return request({
      url: `/admin-api/v1/tag/update_tag`,
      method: "PUT",
      data,
    });
  },
};
