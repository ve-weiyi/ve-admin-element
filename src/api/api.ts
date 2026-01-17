import request from "@/utils/request";
import type {
  ApiBackVO,
  BatchResp,
  EmptyReq,
  IdsReq,
  NewApiReq,
  PageResp,
  QueryApiReq,
  SyncApiReq,
} from "./types";

export const ApiAPI = {
  /** 创建api路由 */
  addApiApi(data?: NewApiReq): Promise<IApiResponse<ApiBackVO>> {
    return request({
      url: "/admin-api/v1/api/add_api",
      method: "POST",
      data: data,
    });
  },

  /** 清空接口列表 */
  cleanApiListApi(data?: EmptyReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/api/clean_api_list",
      method: "POST",
      data: data,
    });
  },

  /** 删除api路由 */
  deletesApiApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/api/deletes_api",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取api路由列表 */
  findApiListApi(data?: QueryApiReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/api/find_api_list",
      method: "POST",
      data: data,
    });
  },

  /** 同步api列表 */
  syncApiListApi(data?: SyncApiReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/api/sync_api_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新api路由 */
  updateApiApi(data?: NewApiReq): Promise<IApiResponse<ApiBackVO>> {
    return request({
      url: "/admin-api/v1/api/update_api",
      method: "PUT",
      data: data,
    });
  },
};
