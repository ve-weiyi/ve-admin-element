import request from "@/utils/request";
import type { AlbumBackDTO, AlbumNewReq, AlbumQuery, BatchResp, IdReq, PageResp } from "./types";

/** 分页获取相册列表 */
export function findAlbumListApi(data?: AlbumQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/album/find_album_list",
    method: "POST",
    data: data,
  });
}

/** 查询相册 */
export function getAlbumApi(data?: IdReq): Promise<IApiResponse<AlbumBackDTO>> {
  return request({
    url: "/admin_api/v1/album/get_album",
    method: "POST",
    data: data,
  });
}

/** 创建相册 */
export function addAlbumApi(data?: AlbumNewReq): Promise<IApiResponse<AlbumBackDTO>> {
  return request({
    url: "/admin_api/v1/album/add_album",
    method: "POST",
    data: data,
  });
}

/** 删除相册 */
export function deleteAlbumApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/album/delete_album",
    method: "DELETE",
    data: data,
  });
}

/** 更新相册 */
export function updateAlbumApi(data?: AlbumNewReq): Promise<IApiResponse<AlbumBackDTO>> {
  return request({
    url: "/admin_api/v1/album/update_album",
    method: "PUT",
    data: data,
  });
}
