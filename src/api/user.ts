import request from "@/utils/request";
import type {
  DeleteUserBindThirdPartyReq,
  EmptyReq,
  EmptyResp,
  PageResp,
  QueryUserLoginHistoryReq,
  UpdateUserAvatarReq,
  UpdateUserBindEmailReq,
  UpdateUserBindPhoneReq,
  UpdateUserBindThirdPartyReq,
  UpdateUserInfoReq,
  UpdateUserPasswordReq,
  UserApisResp,
  UserInfoResp,
  UserMenusResp,
  UserRolesResp,
} from "./types";

export const UserAPI = {
  /** 删除用户绑定第三方平台账号 */
  deleteUserBindThirdPartyApi(
    data?: DeleteUserBindThirdPartyReq
  ): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/user/delete_user_bind_third_party",
      method: "POST",
      data: data,
    });
  },

  /** 获取用户接口权限 */
  getUserApisApi(data?: EmptyReq): Promise<IApiResponse<UserApisResp>> {
    return request({
      url: "/admin-api/v1/user/get_user_apis",
      method: "GET",
      data: data,
    });
  },

  /** 获取用户信息 */
  getUserInfoApi(data?: EmptyReq): Promise<IApiResponse<UserInfoResp>> {
    return request({
      url: "/admin-api/v1/user/get_user_info",
      method: "GET",
      data: data,
    });
  },

  /** 查询用户登录历史 */
  getUserLoginHistoryListApi(data?: QueryUserLoginHistoryReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/user/get_user_login_history_list",
      method: "POST",
      data: data,
    });
  },

  /** 获取用户菜单权限 */
  getUserMenusApi(data?: EmptyReq): Promise<IApiResponse<UserMenusResp>> {
    return request({
      url: "/admin-api/v1/user/get_user_menus",
      method: "GET",
      data: data,
    });
  },

  /** 获取用户角色 */
  getUserRolesApi(data?: EmptyReq): Promise<IApiResponse<UserRolesResp>> {
    return request({
      url: "/admin-api/v1/user/get_user_roles",
      method: "GET",
      data: data,
    });
  },

  /** 修改用户头像 */
  updateUserAvatarApi(data?: UpdateUserAvatarReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/user/update_user_avatar",
      method: "PUT",
      data: data,
    });
  },

  /** 修改用户绑定邮箱 */
  updateUserBindEmailApi(data?: UpdateUserBindEmailReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/user/update_user_bind_email",
      method: "PUT",
      data: data,
    });
  },

  /** 修改用户绑定手机号 */
  updateUserBindPhoneApi(data?: UpdateUserBindPhoneReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/user/update_user_bind_phone",
      method: "PUT",
      data: data,
    });
  },

  /** 修改用户绑定第三方平台账号 */
  updateUserBindThirdPartyApi(
    data?: UpdateUserBindThirdPartyReq
  ): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/user/update_user_bind_third_party",
      method: "PUT",
      data: data,
    });
  },

  /** 修改用户信息 */
  updateUserInfoApi(data?: UpdateUserInfoReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/user/update_user_info",
      method: "PUT",
      data: data,
    });
  },

  /** 修改用户密码 */
  updateUserPasswordApi(data?: UpdateUserPasswordReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/user/update_user_password",
      method: "PUT",
      data: data,
    });
  },
};
