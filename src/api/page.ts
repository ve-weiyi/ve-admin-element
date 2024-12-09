import request from "@/utils/request";
import {
  BatchResp,
  IdReq,
  PageBackDTO,
  PageNewReq,
  PageQueryReq,
  PageResp,
} from "./types";

/** 分页获取页面列表 */
export function findPageListApi(data?: PageQueryReq): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/page/find_page_list",
    method: "POST",
    data: data,
  });
}

/** 创建页面 */
export function addPageApi(data?: PageNewReq): Promise<IApiResponse<PageBackDTO>> {
  return request({
    url: "/admin_api/v1/page/add_page",
    method: "POST",
    data: data,
  });
}

/** 删除页面 */
export function deletePageApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/page/delete_page",
    method: "DELETE",
    data: data,
  });
}

/** 更新页面 */
export function updatePageApi(data?: PageNewReq): Promise<IApiResponse<PageBackDTO>> {
  return request({
    url: "/admin_api/v1/page/update_page",
    method: "PUT",
    data: data,
  });
}
