import request from "@/utils/request";
import type { AlbumBackDTO, AlbumNewReq, AlbumQuery, BatchResp, IdReq, PageResp } from "./types";

export const AlbumAPI = {
  /** 创建相册 */
  addAlbumApi(data?: AlbumNewReq): Promise<IApiResponse<AlbumBackDTO>> {
    return request({
      url: "/admin_api/v1/album/add_album",
      method: "POST",
      data: data,
    });
  },
  
  /** 删除相册 */
  deleteAlbumApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin_api/v1/album/delete_album",
      method: "DELETE",
      data: data,
    });
  },
  
  /** 分页获取相册列表 */
  findAlbumListApi(data?: AlbumQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin_api/v1/album/find_album_list",
      method: "POST",
      data: data,
    });
  },
  
  /** 查询相册 */
  getAlbumApi(data?: IdReq): Promise<IApiResponse<AlbumBackDTO>> {
    return request({
      url: "/admin_api/v1/album/get_album",
      method: "POST",
      data: data,
    });
  },
  
  /** 更新相册 */
  updateAlbumApi(data?: AlbumNewReq): Promise<IApiResponse<AlbumBackDTO>> {
    return request({
      url: "/admin_api/v1/album/update_album",
      method: "PUT",
      data: data,
    });
  },
  
};
