import request from "@/utils/request";
import type { AboutMeVO, EmptyReq, EmptyResp, Server, WebsiteConfigVO } from "@/api/types";

/** 网站管理 */
export const ConfigAPI = {
  /** 获取关于我的信息 */
  getAboutMe(params?: EmptyReq): Promise<ApiResponse<AboutMeVO>> {
    return request({
      url: `/admin-api/v1/admin/get_about_me`,
      method: "GET",
      params,
    });
  },

  /** 获取服务器信息 */
  getSystemState(params?: EmptyReq): Promise<ApiResponse<Server>> {
    return request({
      url: `/admin-api/v1/admin/get_system_state`,
      method: "GET",
      params,
    });
  },

  /** 获取网站配置 */
  getWebsiteConfig(params?: EmptyReq): Promise<ApiResponse<WebsiteConfigVO>> {
    return request({
      url: `/admin-api/v1/admin/get_website_config`,
      method: "GET",
      params,
    });
  },

  /** 更新关于我的信息 */
  updateAboutMe(data?: AboutMeVO): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/admin/update_about_me`,
      method: "PUT",
      data,
    });
  },

  /** 更新网站配置 */
  updateWebsiteConfig(data?: WebsiteConfigVO): Promise<ApiResponse<EmptyResp>> {
    return request({
      url: `/admin-api/v1/admin/update_website_config`,
      method: "PUT",
      data,
    });
  },
};
