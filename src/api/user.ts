import request from "@/utils/request";
import {
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

/** "获取用户接口权限" */
export function getUserApisApi(data?: EmptyReq): Promise<IApiResponse<UserApisResp>> {
  return request({
    url: "/admin_api/v1/user/get_user_apis",
    method: "get",
    data: data,
  });
}

/** "获取用户信息" */
export function getUserInfoApi(data?: EmptyReq): Promise<IApiResponse<UserInfoResp>> {
  return request({
    url: "/admin_api/v1/user/get_user_info",
    method: "get",
    data: data,
  });
}

/** "查询用户登录历史" */
export function getUserLoginHistoryListApi(
  data?: UserLoginHistoryQuery
): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/user/get_user_login_history_list",
    method: "post",
    data: data,
  });
}

/** "获取用户菜单权限" */
export function getUserMenusApi(data?: EmptyReq): Promise<IApiResponse<UserMenusResp>> {
  return request({
    url: "/admin_api/v1/user/get_user_menus",
    method: "get",
    data: data,
  });
}

/** "获取用户角色" */
export function getUserRolesApi(data?: EmptyReq): Promise<IApiResponse<UserRolesResp>> {
  return request({
    url: "/admin_api/v1/user/get_user_roles",
    method: "get",
    data: data,
  });
}

/** "修改用户信息" */
export function updateUserInfoApi(data?: UserInfoReq): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/admin_api/v1/user/update_user_info",
    method: "post",
    data: data,
  });
}
