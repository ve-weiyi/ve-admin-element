import request from "@/utils/request";
import type {
  BatchResp,
  CreateRoleReq,
  DeleteRoleReq,
  EmptyResp,
  GetRolePermissionsReq,
  GetRoleReq,
  PageResult,
  QueryRoleListReq,
  RolePermissionsResp,
  RoleVO,
  UpdateRoleApiPermissionsReq,
  UpdateRoleMenuPermissionsReq,
  UpdateRoleReq,
} from "@/api/types";

/** 角色管理 */
export const RoleAPI = {
  /** 创建角色 */
  createRole(data?: CreateRoleReq): Promise<ApiResponse<RoleVO>> {
    return request({
      url: `/admin-api/v1/role/create_role`,
      method: "POST",
      data,
    });
  },

  /** 删除角色 */
  deleteRole(data?: DeleteRoleReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/role/delete_role`,
      method: "DELETE",
      data,
    });
  },

  /** 获取角色详情 */
  getRole(params?: GetRoleReq): Promise<ApiResponse<RoleVO>> {
    return request({
      url: `/admin-api/v1/role/get_role`,
      method: "GET",
      params,
    });
  },

  /** 查询角色权限配置 */
  getRolePermissions(params?: GetRolePermissionsReq): Promise<ApiResponse<RolePermissionsResp>> {
    return request({
      url: `/admin-api/v1/role/get_role_permissions`,
      method: "GET",
      params,
    });
  },

  /** 获取角色列表 */
  queryRoleList(data?: QueryRoleListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/role/query_role_list`,
      method: "POST",
      data,
    });
  },

  /** 更新角色信息 */
  updateRole(data?: UpdateRoleReq): Promise<ApiResponse<RoleVO>> {
    return request({
      url: `/admin-api/v1/role/update_role`,
      method: "PUT",
      data,
    });
  },

  /** 更新角色接口权限 */
  updateRoleApiPermissions(data?: UpdateRoleApiPermissionsReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/role/update_role_api_permissions`,
      method: "PUT",
      data,
    });
  },

  /** 更新角色菜单权限 */
  updateRoleMenuPermissions(data?: UpdateRoleMenuPermissionsReq): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/role/update_role_menu_permissions`,
      method: "PUT",
      data,
    });
  },
};
