import request from "@/utils/request";
import { BannerNewReq, BannerBackDTO, IdReq, BatchResp, BannerQuery, PageResp } from "./types";

/** "创建页面" */
export function addBannerApi(data?: BannerNewReq): Promise<IApiResponse<BannerBackDTO>> {
  return request({
    url: "/admin_api/v1/banner/add_banner",
    method: "post",
    data: data,
  });
}

/** "删除页面" */
export function deleteBannerApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/banner/delete_banner",
    method: "delete",
    data: data,
  });
}

/** "分页获取页面列表" */
export function findBannerListApi(data?: BannerQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/banner/find_banner_list",
    method: "post",
    data: data,
  });
}

/** "更新页面" */
export function updateBannerApi(data?: BannerNewReq): Promise<IApiResponse<BannerBackDTO>> {
  return request({
    url: "/admin_api/v1/banner/update_banner",
    method: "put",
    data: data,
  });
}
