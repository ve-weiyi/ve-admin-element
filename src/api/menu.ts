import request from "@/utils/request";
import {
  BatchResp,
  EmptyReq,
  IdReq,
  IdsReq,
  MenuBackDTO,
  MenuNewReq,
  MenuQuery,
  PageResp,
  SyncMenuReq,
} from "./types";

/** "创建菜单" */
export function addMenuApi(data?: MenuNewReq): Promise<IApiResponse<MenuBackDTO>> {
  return request({
    url: "/admin_api/v1/menu/add_menu",
    method: "post",
    data: data,
  });
}

/** "批量删除菜单" */
export function batchDeleteMenuApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/menu/batch_delete_menu",
    method: "delete",
    data: data,
  });
}

/** "清空菜单列表" */
export function cleanMenuListApi(data?: EmptyReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/menu/clean_menu_list",
    method: "post",
    data: data,
  });
}

/** "删除菜单" */
export function deleteMenuApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/menu/delete_menu",
    method: "delete",
    data: data,
  });
}

/** "分页获取菜单列表" */
export function findMenuListApi(data?: MenuQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/menu/find_menu_list",
    method: "post",
    data: data,
  });
}

/** "同步菜单列表" */
export function syncMenuListApi(data?: SyncMenuReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/menu/sync_menu_list",
    method: "post",
    data: data,
  });
}

/** "更新菜单" */
export function updateMenuApi(data?: MenuNewReq): Promise<IApiResponse<MenuBackDTO>> {
  return request({
    url: "/admin_api/v1/menu/update_menu",
    method: "put",
    data: data,
  });
}
