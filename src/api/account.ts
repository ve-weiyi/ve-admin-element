import request from "@/utils/request";
import { AccountQuery, EmptyResp, PageResp, UpdateAccountRolesReq, UpdateAccountStatusReq } from "./types";

/** 获取用户分布地区 */
export function findAccountAreaAnalysisApi(data?: AccountQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/account/find_account_area_analysis",
    method: "POST",
    data: data,
  });
}

/** 查询用户列表 */
export function findAccountListApi(data?: AccountQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/account/find_account_list",
    method: "POST",
    data: data,
  });
}

/** 查询用户登录历史 */
export function findAccountLoginHistoryListApi(
  data?: AccountQuery
): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/account/find_account_login_history_list",
    method: "POST",
    data: data,
  });
}

/** 查询在线用户列表 */
export function findAccountOnlineListApi(data?: AccountQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/account/find_account_online_list",
    method: "POST",
    data: data,
  });
}

/** 修改用户角色 */
export function updateAccountRolesApi(
  data?: UpdateAccountRolesReq
): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/admin_api/v1/account/update_account_roles",
    method: "POST",
    data: data,
  });
}

/** 修改用户状态 */
export function updateAccountStatusApi(
  data?: UpdateAccountStatusReq
): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/admin_api/v1/account/update_account_status",
    method: "POST",
    data: data,
  });
}
