import request from "@/utils/request";
import type {
  BatchResp,
  CleanMenuReq,
  IdsReq,
  MenuBackVO,
  NewMenuReq,
  PageResp,
  QueryMenuReq,
  SyncMenuReq,
} from "./types";

export const MenuAPI = {
  /** 创建菜单 */
  addMenuApi(data?: NewMenuReq): Promise<IApiResponse<MenuBackVO>> {
    return request({
      url: "/admin-api/v1/menu/add_menu",
      method: "POST",
      data: data,
    });
  },

  /** 清空菜单列表 */
  cleanMenuListApi(data?: CleanMenuReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/menu/clean_menu_list",
      method: "POST",
      data: data,
    });
  },

  /** 删除菜单 */
  deletesMenuApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/menu/deletes_menu",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取菜单列表 */
  findMenuListApi(data?: QueryMenuReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/menu/find_menu_list",
      method: "POST",
      data: data,
    });
  },

  /** 同步菜单列表 */
  syncMenuListApi(data?: SyncMenuReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/menu/sync_menu_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新菜单 */
  updateMenuApi(data?: NewMenuReq): Promise<IApiResponse<MenuBackVO>> {
    return request({
      url: "/admin-api/v1/menu/update_menu",
      method: "PUT",
      data: data,
    });
  },
};
