import request from "@/utils/request";
import type {
  EmptyReq,
  GetUserDetailReq,
  GetUserDetailResp,
  OnlineUserListResp,
  PageResult,
  QueryUserListReq,
  ResetUserPasswordReq,
  ResetUserPasswordResp,
  UpdateUserRolesReq,
  UpdateUserRolesResp,
  UpdateUserStatusReq,
  UpdateUserStatusResp,
} from "@/api/types";

/** 用户管理 */
export const UserAPI = {
  /** 获取在线用户列表 */
  getOnlineUsers(params?: EmptyReq): Promise<ApiResponse<OnlineUserListResp>> {
    return request({
      url: `/admin-api/v1/user/get_online_users`,
      method: "GET",
      params,
    });
  },

  /** 获取用户详情 */
  getUserDetail(params?: GetUserDetailReq): Promise<ApiResponse<GetUserDetailResp>> {
    return request({
      url: `/admin-api/v1/user/get_user`,
      method: "GET",
      params,
    });
  },

  /** 获取用户列表 */
  queryUserList(data?: QueryUserListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/user/query_user_list`,
      method: "POST",
      data,
    });
  },

  /** 重置用户密码 */
  resetUserPassword(data?: ResetUserPasswordReq): Promise<ApiResponse<ResetUserPasswordResp>> {
    return request({
      url: `/admin-api/v1/user/reset_user_password`,
      method: "POST",
      data,
    });
  },

  /** 更新用户角色 */
  updateUserRoles(data?: UpdateUserRolesReq): Promise<ApiResponse<UpdateUserRolesResp>> {
    return request({
      url: `/admin-api/v1/user/update_user_roles`,
      method: "PUT",
      data,
    });
  },

  /** 更新用户状态 */
  updateUserStatus(data?: UpdateUserStatusReq): Promise<ApiResponse<UpdateUserStatusResp>> {
    return request({
      url: `/admin-api/v1/user/update_user_status`,
      method: "PUT",
      data,
    });
  },
};
