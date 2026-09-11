import request from "@/utils/request";
import type {
  ApiVO,
  BatchResp,
  CleanApiResp,
  CreateApiReq,
  DeleteApiReq,
  EmptyReq,
  GetApiReq,
  PageResult,
  QueryApiListReq,
  SyncApiResp,
  UpdateApiReq,
} from "@/api/types";

/** 接口管理 */
export const ApiAPI = {
  /** 清空接口列表 */
  cleanApi(data?: EmptyReq): Promise<ApiResponse<CleanApiResp>> {
    return request({
      url: `/admin-api/v1/api/clean_api`,
      method: "POST",
      data,
    });
  },

  /** 创建接口 */
  createApi(data?: CreateApiReq): Promise<ApiResponse<ApiVO>> {
    return request({
      url: `/admin-api/v1/api/create_api`,
      method: "POST",
      data,
    });
  },

  /** 删除接口 */
  deleteApi(data?: DeleteApiReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/api/delete_api`,
      method: "DELETE",
      data,
    });
  },

  /** 获取接口详情 */
  getApi(params?: GetApiReq): Promise<ApiResponse<ApiVO>> {
    return request({
      url: `/admin-api/v1/api/get_api`,
      method: "GET",
      params,
    });
  },

  /** 获取接口列表 */
  queryApiList(data?: QueryApiListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/api/query_api_list`,
      method: "POST",
      data,
    });
  },

  /** 同步接口列表 */
  syncApi(data?: EmptyReq): Promise<ApiResponse<SyncApiResp>> {
    return request({
      url: `/admin-api/v1/api/sync_api`,
      method: "POST",
      data,
    });
  },

  /** 更新接口 */
  updateApi(data?: UpdateApiReq): Promise<ApiResponse<ApiVO>> {
    return request({
      url: `/admin-api/v1/api/update_api`,
      method: "PUT",
      data,
    });
  },
};
