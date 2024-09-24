import service from "@/utils/request";
import {
  EmptyResp,
  UpdateUserRolesReq,
  UpdateUserStatusReq,
  EmptyReq,
  UserRolesResp,
  UserApisResp,
  UserInfoResp,
  UserMenusResp,
  UserInfoReq,
  UserQuery,
  PageResp,
} from "./types";

/** "查询在线用户列表" */
export function findOnlineUserListApi(
  data?: UserQuery
): Promise<IApiResponse<PageResp>> {
  return service({
    url: "/admin_api/v1/user/find_online_user_list",
    method: "post",
    data: data,
  });
}

/** "查询用户列表" */
export function findUserListApi(
  data?: UserQuery
): Promise<IApiResponse<PageResp>> {
  return service({
    url: "/admin_api/v1/user/find_user_list",
    method: "post",
    data: data,
  });
}

/** "查询用户登录历史" */
export function findUserLoginHistoryListApi(
  data?: UserQuery
): Promise<IApiResponse<PageResp>> {
  return service({
    url: "/admin_api/v1/user/find_user_login_history_list",
    method: "post",
    data: data,
  });
}

/** "获取用户接口权限" */
export function getUserApisApi(
  data?: EmptyReq
): Promise<IApiResponse<UserApisResp>> {
  return service({
    url: "/admin_api/v1/user/get_user_apis",
    method: "get",
    data: data,
  });
}

/** "获取用户分布地区" */
export function getUserAreaAnalysisApi(
  data?: EmptyReq
): Promise<IApiResponse<PageResp>> {
  return service({
    url: "/admin_api/v1/user/get_user_area_analysis",
    method: "post",
    data: data,
  });
}

/** "获取用户信息" */
export function getUserInfoApi(
  data?: EmptyReq
): Promise<IApiResponse<UserInfoResp>> {
  return service({
    url: "/admin_api/v1/user/get_user_info",
    method: "get",
    data: data,
  });
}

/** "获取用户菜单权限" */
export function getUserMenusApi(
  data?: EmptyReq
): Promise<IApiResponse<UserMenusResp>> {
  return service({
    url: "/admin_api/v1/user/get_user_menus",
    method: "get",
    data: data,
  });
}

/** "获取用户角色" */
export function getUserRolesApi(
  data?: EmptyReq
): Promise<IApiResponse<UserRolesResp>> {
  return service({
    url: "/admin_api/v1/user/get_user_roles",
    method: "get",
    data: data,
  });
}

/** "修改用户信息" */
export function updateUserInfoApi(
  data?: UserInfoReq
): Promise<IApiResponse<EmptyResp>> {
  return service({
    url: "/admin_api/v1/user/update_user_info",
    method: "post",
    data: data,
  });
}

/** "修改用户角色" */
export function updateUserRolesApi(
  data?: UpdateUserRolesReq
): Promise<IApiResponse<EmptyResp>> {
  return service({
    url: "/admin_api/v1/user/update_user_roles",
    method: "post",
    data: data,
  });
}

/** "修改用户状态" */
export function updateUserStatusApi(
  data?: UpdateUserStatusReq
): Promise<IApiResponse<EmptyResp>> {
  return service({
    url: "/admin_api/v1/user/update_user_status",
    method: "post",
    data: data,
  });
}
