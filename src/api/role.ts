import request from "@/utils/request";
import type {
  BatchResp,
  EmptyResp,
  IdReq,
  IdsReq,
  NewRoleReq,
  PageResp,
  QueryRoleReq,
  RoleBackVO,
  RoleResourcesResp,
  UpdateRoleApisReq,
  UpdateRoleMenusReq,
} from "./types";

export const RoleAPI = {
  /** 创建角色 */
  addRoleApi(data?: NewRoleReq): Promise<IApiResponse<RoleBackVO>> {
    return request({
      url: "/admin-api/v1/role/add_role",
      method: "POST",
      data: data,
    });
  },

  /** 删除角色 */
  deletesRoleApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/role/deletes_role",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取角色列表 */
  findRoleListApi(data?: QueryRoleReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/role/find_role_list",
      method: "POST",
      data: data,
    });
  },

  /** 获取角色资源列表 */
  findRoleResourcesApi(data?: IdReq): Promise<IApiResponse<RoleResourcesResp>> {
    return request({
      url: "/admin-api/v1/role/find_role_resources",
      method: "POST",
      data: data,
    });
  },

  /** 更新角色 */
  updateRoleApi(data?: NewRoleReq): Promise<IApiResponse<RoleBackVO>> {
    return request({
      url: "/admin-api/v1/role/update_role",
      method: "PUT",
      data: data,
    });
  },

  /** 更新角色接口权限 */
  updateRoleApisApi(data?: UpdateRoleApisReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/role/update_role_apis",
      method: "PUT",
      data: data,
    });
  },

  /** 更新角色菜单权限 */
  updateRoleMenusApi(data?: UpdateRoleMenusReq): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/role/update_role_menus",
      method: "PUT",
      data: data,
    });
  },
};
