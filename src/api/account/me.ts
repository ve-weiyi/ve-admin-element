import request from "@/utils/request";
import type {
  BindUserEmailReq,
  BindUserPhoneReq,
  BindUserThirdPartyReq,
  EmptyReq,
  EmptyResp,
  GetUserApisResp,
  GetUserMenusResp,
  GetUserProfileReq,
  GetUserRolesResp,
  PageResult,
  QueryUserLoginHistoryReq,
  UnbindUserThirdPartyReq,
  UpdateUserAvatarReq,
  UpdateUserPasswordReq,
  UpdateUserProfileReq,
  UserProfile,
} from "@/api/types";

/** 个人中心 */
export const MeAPI = {
  /** 绑定邮箱 */
  bindUserEmail(data?: BindUserEmailReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/user/me/bind_user_email`,
      method: "POST",
      data,
    });
  },

  /** 绑定手机号 */
  bindUserPhone(data?: BindUserPhoneReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/user/me/bind_user_phone`,
      method: "POST",
      data,
    });
  },

  /** 绑定第三方平台账号 */
  bindUserThirdParty(data?: BindUserThirdPartyReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/user/me/bind_user_third_party`,
      method: "POST",
      data,
    });
  },

  /** 获取用户接口权限 */
  getUserApis(params?: EmptyReq): Promise<ApiResponse<GetUserApisResp>> {
    return request({
      url: `/admin-api/v1/user/me/get_user_apis`,
      method: "GET",
      params,
    });
  },

  /** 获取用户菜单权限 */
  getUserMenus(params?: EmptyReq): Promise<ApiResponse<GetUserMenusResp>> {
    return request({
      url: `/admin-api/v1/user/me/get_user_menus`,
      method: "GET",
      params,
    });
  },

  /** 获取当前用户信息 */
  getUserProfile(params?: GetUserProfileReq): Promise<ApiResponse<UserProfile>> {
    return request({
      url: `/admin-api/v1/user/me/get_user_profile`,
      method: "GET",
      params,
    });
  },

  /** 获取用户角色 */
  getUserRoles(params?: EmptyReq): Promise<ApiResponse<GetUserRolesResp>> {
    return request({
      url: `/admin-api/v1/user/me/get_user_roles`,
      method: "GET",
      params,
    });
  },

  /** 查询用户登录历史 */
  queryUserLoginHistory(data?: QueryUserLoginHistoryReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/user/me/query_user_login_history`,
      method: "POST",
      data,
    });
  },

  /** 解绑第三方平台账号 */
  unbindUserThirdParty(data?: UnbindUserThirdPartyReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/user/me/unbind_user_third_party`,
      method: "POST",
      data,
    });
  },

  /** 修改用户头像 */
  updateUserAvatar(data?: UpdateUserAvatarReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/user/me/update_user_avatar`,
      method: "PUT",
      data,
    });
  },

  /** 修改用户密码 */
  updateUserPassword(data?: UpdateUserPasswordReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/user/me/update_user_password`,
      method: "PUT",
      data,
    });
  },

  /** 更新当前用户信息 */
  updateUserProfile(data?: UpdateUserProfileReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/user/me/update_user_profile`,
      method: "PUT",
      data,
    });
  },
};
