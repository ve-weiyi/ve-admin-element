import request from "@/utils/request";
import type {
  AccountQuery,
  EmptyResp,
  PageResp,
  UpdateAccountPasswordReq,
  UpdateAccountRolesReq,
  UpdateAccountStatusReq,
} from "./types";

export const AccountAPI = {
  /** 查询用户列表 */
  findAccountListApi(data?: AccountQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/account/find_account_list",
      method: "POST",
      data: data,
    });
  },

  /** 查询在线用户列表 */
  findAccountOnlineListApi(data?: AccountQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/account/find_account_online_list",
      method: "POST",
      data: data,
    });
  },

  /** 修改用户密码 */
  updateAccountPasswordApi(data?: UpdateAccountPasswordReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/account/update_account_password",
      method: "POST",
      data: data,
    });
  },

  /** 修改用户角色 */
  updateAccountRolesApi(data?: UpdateAccountRolesReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/account/update_account_roles",
      method: "POST",
      data: data,
    });
  },

  /** 修改用户状态 */
  updateAccountStatusApi(data?: UpdateAccountStatusReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/account/update_account_status",
      method: "POST",
      data: data,
    });
  },
};
