import request from "@/utils/request";
import { BannerBackDTO, BannerNewReq, BannerQuery, BatchResp, IdReq, PageResp } from "./types";

/** 创建页面 */
export function addBannerApi(data?: BannerNewReq): Promise<IApiResponse<BannerBackDTO>> {
  return request({
    url: "/admin_api/v1/banner/add_banner",
    method: "POST",
    data: data,
  });
}

/** 删除页面 */
export function deleteBannerApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/banner/delete_banner",
    method: "DELETE",
    data: data,
  });
}

/** 分页获取页面列表 */
export function findBannerListApi(data?: BannerQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/banner/find_banner_list",
    method: "POST",
    data: data,
  });
}

/** 更新页面 */
export function updateBannerApi(data?: BannerNewReq): Promise<IApiResponse<BannerBackDTO>> {
  return request({
    url: "/admin_api/v1/banner/update_banner",
    method: "PUT",
    data: data,
  });
}
