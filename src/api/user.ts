import request from "@/utils/request";
import { EmptyReq, UserApisResp, UserInfoResp, EmptyResp, UserLoginHistoryQuery, PageResp, UserMenusResp, UserRolesResp, UserInfoReq } from "./types";

/** 获取用户接口权限 */
export function getUserApisApi(data?: EmptyReq): Promise<IApiResponse<UserApisResp>> {
  return request({
    url: "/admin_api/v1/user/get_user_apis",
    method: "GET",
    data: data,
  });
}

/** 获取用户信息 */
export function getUserInfoApi(data?: EmptyReq): Promise<IApiResponse<UserInfoResp>> {
  return request({
    url: "/admin_api/v1/user/get_user_info",
    method: "GET",
    data: data,
  });
}

/** 查询用户登录历史 */
export function getUserLoginHistoryListApi(data?: UserLoginHistoryQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/user/get_user_login_history_list",
    method: "POST",
    data: data,
  });
}

/** 获取用户菜单权限 */
export function getUserMenusApi(data?: EmptyReq): Promise<IApiResponse<UserMenusResp>> {
  return request({
    url: "/admin_api/v1/user/get_user_menus",
    method: "GET",
    data: data,
  });
}

/** 获取用户角色 */
export function getUserRolesApi(data?: EmptyReq): Promise<IApiResponse<UserRolesResp>> {
  return request({
    url: "/admin_api/v1/user/get_user_roles",
    method: "GET",
    data: data,
  });
}

/** 修改用户信息 */
export function updateUserInfoApi(data?: UserInfoReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/admin_api/v1/user/update_user_info",
    method: "POST",
    data: data,
  });
}
