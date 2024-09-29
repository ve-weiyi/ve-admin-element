import request from "@/utils/request";
import { AboutMe, AdminHomeInfo, EmptyReq, EmptyResp, Server, WebsiteConfig } from "./types";

/** "获取后台首页信息" */
export function getAdminHomeInfoApi(data?: EmptyReq): Promise<IApiResponse<AdminHomeInfo>> {
  return request({
    url: "/admin_api/v1/admin",
    method: "get",
    data: data,
  });
}

/** "获取关于我的信息" */
export function getAboutMeApi(data?: EmptyReq): Promise<IApiResponse<AboutMe>> {
  return request({
    url: "/admin_api/v1/admin/about_me",
    method: "get",
    data: data,
  });
}

/** "更新关于我的信息" */
export function updateAboutMeApi(data?: AboutMe): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/admin_api/v1/admin/about_me",
    method: "put",
    data: data,
  });
}

/** "获取网站配置" */
export function getWebsiteConfigApi(data?: EmptyReq): Promise<IApiResponse<WebsiteConfig>> {
  return request({
    url: "/admin_api/v1/admin/get_website_config",
    method: "get",
    data: data,
  });
}

/** "获取服务器信息" */
export function getSystemStateApi(data?: EmptyReq): Promise<IApiResponse<Server>> {
  return request({
    url: "/admin_api/v1/admin/system_state",
    method: "get",
    data: data,
  });
}

/** "更新网站配置" */
export function updateWebsiteConfigApi(data?: WebsiteConfig): Promise<IApiResponse<EmptyResp>> {
  return request({
    url: "/admin_api/v1/admin/update_website_config",
    method: "put",
    data: data,
  });
}
