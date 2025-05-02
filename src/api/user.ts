import request from "@/utils/request";
import type {
  EmptyReq,
  EmptyResp,
  PageResp,
  UpdateUserAvatarReq,
  UpdateUserBindEmailReq,
  UpdateUserBindPhoneReq,
  UpdateUserInfoReq,
  UpdateUserPasswordReq,
  UserApisResp,
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

  /** 修改用户头像 */
  updateUserAvatarApi(data?: UpdateUserAvatarReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin_api/v1/user/update_user_avatar",
      method: "POST",
      data: data,
    });
  },

  /** 修改用户绑定邮箱 */
  updateUserBindEmailApi(data?: UpdateUserBindEmailReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin_api/v1/user/update_user_bind_email",
      method: "POST",
      data: data,
    });
  },

  /** 修改用户绑定手机号 */
  updateUserBindPhoneApi(data?: UpdateUserBindPhoneReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin_api/v1/user/update_user_bind_phone",
      method: "POST",
      data: data,
    });
  },

  /** 修改用户信息 */
  updateUserInfoApi(data?: UpdateUserInfoReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin_api/v1/user/update_user_info",
      method: "POST",
      data: data,
    });
  },

  /** 修改用户密码 */
  updateUserPasswordApi(data?: UpdateUserPasswordReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin_api/v1/user/update_user_password",
      method: "POST",
      data: data,
    });
  },
};
