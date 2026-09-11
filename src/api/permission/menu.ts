import request from "@/utils/request";
import type {
  BatchResp,
  CleanMenuReq,
  CleanMenuResp,
  CreateMenuReq,
  DeleteMenuReq,
  GetMenuReq,
  MenuVO,
  PageResult,
  QueryMenuListReq,
  SyncMenuReq,
  SyncMenuResp,
  UpdateMenuReq,
} from "@/api/types";

/** 菜单管理 */
export const MenuAPI = {
  /** 清空菜单列表 */
  cleanMenu(data?: CleanMenuReq): Promise<ApiResponse<CleanMenuResp>> {
    return request({
      url: `/admin-api/v1/menu/clean_menu`,
      method: "POST",
      data,
    });
  },

  /** 创建菜单 */
  createMenu(data?: CreateMenuReq): Promise<ApiResponse<MenuVO>> {
    return request({
      url: `/admin-api/v1/menu/create_menu`,
      method: "POST",
      data,
    });
  },

  /** 删除菜单 */
  deleteMenu(data?: DeleteMenuReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/menu/delete_menu`,
      method: "DELETE",
      data,
    });
  },

  /** 获取菜单详情 */
  getMenu(params?: GetMenuReq): Promise<ApiResponse<MenuVO>> {
    return request({
      url: `/admin-api/v1/menu/get_menu`,
      method: "GET",
      params,
    });
  },

  /** 获取菜单列表 */
  queryMenuList(data?: QueryMenuListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/menu/query_menu_list`,
      method: "POST",
      data,
    });
  },

  /** 同步菜单列表 */
  syncMenu(data?: SyncMenuReq): Promise<ApiResponse<SyncMenuResp>> {
    return request({
      url: `/admin-api/v1/menu/sync_menu`,
      method: "POST",
      data,
    });
  },

  /** 更新菜单 */
  updateMenu(data?: UpdateMenuReq): Promise<ApiResponse<MenuVO>> {
    return request({
      url: `/admin-api/v1/menu/update_menu`,
      method: "PUT",
      data,
    });
  },
};
