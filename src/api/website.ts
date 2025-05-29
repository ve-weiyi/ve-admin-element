import request from "@/utils/request";
import type {
  AboutMeVO,
  AdminHomeInfo,
  EmptyReq,
  EmptyResp,
  GetUserAreaStatsReq,
  GetUserAreaStatsResp,
  GetVisitStatsResp,
  GetVisitTrendReq,
  GetVisitTrendResp,
  Server,
  WebsiteConfigVO,
} from "./types";

export const WebsiteAPI = {
  /** 获取用户分布地区 */
  getUserAreaStatsApi(data?: GetUserAreaStatsReq): Promise<IApiResponse<GetUserAreaStatsResp>> {
    return request({
      url: "/admin-api/v1/account/get_user_area_stats",
      method: "POST",
      data: data,
    });
  },

  /** 获取后台首页信息 */
  getAdminHomeInfoApi(data?: EmptyReq): Promise<IApiResponse<AdminHomeInfo>> {
    return request({
      url: "/admin-api/v1/admin",
      method: "GET",
      data: data,
    });
  },

  /** 获取关于我的信息 */
  getAboutMeApi(data?: EmptyReq): Promise<IApiResponse<AboutMeVO>> {
    return request({
      url: "/admin-api/v1/admin/get_about_me",
      method: "GET",
      data: data,
    });
  },

  /** 获取访客数据分析 */
  getVisitStatsApi(data?: EmptyReq): Promise<IApiResponse<GetVisitStatsResp>> {
    return request({
      url: "/admin-api/v1/admin/get_visit_stats",
      method: "GET",
      data: data,
    });
  },

  /** 获取访客数据趋势 */
  getVisitTrendApi(data?: GetVisitTrendReq): Promise<IApiResponse<GetVisitTrendResp>> {
    return request({
      url: "/admin-api/v1/admin/get_visit_trend",
      method: "POST",
      data: data,
    });
  },

  /** 获取网站配置 */
  getWebsiteConfigApi(data?: EmptyReq): Promise<IApiResponse<WebsiteConfigVO>> {
    return request({
      url: "/admin-api/v1/admin/get_website_config",
      method: "GET",
      data: data,
    });
  },

  /** 获取服务器信息 */
  getSystemStateApi(data?: EmptyReq): Promise<IApiResponse<Server>> {
    return request({
      url: "/admin-api/v1/admin/system_state",
      method: "GET",
      data: data,
    });
  },

  /** 更新关于我的信息 */
  updateAboutMeApi(data?: AboutMeVO): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/admin/update_about_me",
      method: "PUT",
      data: data,
    });
  },

  /** 更新网站配置 */
  updateWebsiteConfigApi(data?: WebsiteConfigVO): Promise<IApiResponse<EmptyResp>> {
    return request({
      url: "/admin-api/v1/admin/update_website_config",
      method: "PUT",
      data: data,
    });
  },
};
