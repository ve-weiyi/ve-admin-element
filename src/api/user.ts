import request from "@/utils/request";
import type {
  EmptyReq,
  EmptyResp,
  PageResp,
  UserApisResp,
  UserInfoReq,
  UserInfoResp,
  UserLoginHistoryQuery,
  UserMenusResp,
  UserRolesResp,
} from "./types";

export const UserAPI = {
  /** 获取用户接口权限 */
  getUserApisApi(data?: EmptyReq): Promise<IApiResponse<UserApisResp>> {
    return request({
      url: "/admin_api/v1/user/get_user_apis",
      method: "GET",
      data: data,
    });
  },

  /** 获取用户信息 */
  getUserInfoApi(data?: EmptyReq): Promise<IApiResponse<UserInfoResp>> {
    return request({
      url: "/admin_api/v1/user/get_user_info",
      method: "GET",
      data: data,
    });
  },

  /** 查询用户登录历史 */
  getUserLoginHistoryListApi(data?: UserLoginHistoryQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin_api/v1/user/get_user_login_history_list",
      method: "POST",
      data: data,
    });
  },

  /** 获取用户菜单权限 */
  getUserMenusApi(data?: EmptyReq): Promise<IApiResponse<UserMenusResp>> {
    return request({
      url: "/admin_api/v1/user/get_user_menus",
      method: "GET",
      data: data,
    });
  },

  /** 获取用户角色 */
  getUserRolesApi(data?: EmptyReq): Promise<IApiResponse<UserRolesResp>> {
    return request({
      url: "/admin_api/v1/user/get_user_roles",
      method: "GET",
      data: data,
    });
  },

  /** 修改用户信息 */
  updateUserInfoApi(data?: UserInfoReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin_api/v1/user/update_user_info",
      method: "POST",
      data: data,
    });
  },
};
