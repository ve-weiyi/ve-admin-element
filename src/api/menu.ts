import request from "@/utils/request";
import type { BatchResp, EmptyReq, IdReq, IdsReq, MenuBackDTO, MenuNewReq, MenuQuery, PageResp, SyncMenuReq } from "./types";

export const MenuAPI = {

  /** 创建菜单 */
  addMenuApi(data?: MenuNewReq): Promise<IApiResponse<MenuBackDTO>> {
    return request({
      url: "/admin_api/v1/menu/add_menu",
      method: "POST",
      data: data,
    });
  },

  /** 批量删除菜单 */
  batchDeleteMenuApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/menu/batch_delete_menu",
      method: "DELETE",
      data: data,
    });
  },

  /** 清空菜单列表 */
  cleanMenuListApi(data?: EmptyReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/menu/clean_menu_list",
      method: "POST",
      data: data,
    });
  },

  /** 删除菜单 */
  deleteMenuApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/menu/delete_menu",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取菜单列表 */
  findMenuListApi(data?: MenuQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin_api/v1/menu/find_menu_list",
      method: "POST",
      data: data,
    });
  },

  /** 同步菜单列表 */
  syncMenuListApi(data?: SyncMenuReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/menu/sync_menu_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新菜单 */
  updateMenuApi(data?: MenuNewReq): Promise<IApiResponse<MenuBackDTO>> {
    return request({
      url: "/admin_api/v1/menu/update_menu",
      method: "PUT",
      data: data,
    });
  },
};
