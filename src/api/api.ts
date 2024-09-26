import request from "@/utils/request";
import { IdReq, ApiQuery, PageResp, ApiNewReq, ApiBackDTO, IdsReq, BatchResp, EmptyReq } from "./types";

/** "分页获取api路由列表" */
export function findApiListApi(data?: ApiQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/api/find_api_list",
    method: "post",
    data: data,
  });
}

/** "创建api路由" */
export function addApiApi(data?: ApiNewReq): Promise<IApiResponse<ApiBackDTO>> {
  return request({
    url: "/admin_api/v1/api/add_api",
    method: "post",
    data: data,
  });
}

/** "批量删除api路由" */
export function batchDeleteApiApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/api/batch_delete_api",
    method: "delete",
    data: data,
  });
}

/** "清空接口列表" */
export function cleanApiListApi(data?: EmptyReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/api/clean_api_list",
    method: "post",
    data: data,
  });
}

/** "删除api路由" */
export function deleteApiApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/api/delete_api",
    method: "delete",
    data: data,
  });
}

/** "同步api列表" */
export function syncApiListApi(data?: EmptyReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/api/sync_api_list",
    method: "post",
    data: data,
  });
}

/** "更新api路由" */
export function updateApiApi(data?: ApiNewReq): Promise<IApiResponse<ApiBackDTO>> {
  return request({
    url: "/admin_api/v1/api/update_api",
    method: "put",
    data: data,
  });
}
