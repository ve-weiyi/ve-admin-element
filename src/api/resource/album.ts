import request from "@/utils/request";
import type {
  AlbumVO,
  BatchResp,
  CreateAlbumReq,
  DeleteAlbumReq,
  GetAlbumReq,
  PageResult,
  QueryAlbumListReq,
  UpdateAlbumDeleteReq,
  UpdateAlbumReq,
} from "@/api/types";

/** 相册管理 */
export const AlbumAPI = {
  /** 创建相册 */
  createAlbum(data?: CreateAlbumReq): Promise<ApiResponse<AlbumVO>> {
    return request({
      url: `/admin-api/v1/album/create_album`,
      method: "POST",
      data,
    });
  },

  /** 批量删除相册 */
  deleteAlbum(data?: DeleteAlbumReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/album/delete_album`,
      method: "DELETE",
      data,
    });
  },

  /** 获取相册详情 */
  getAlbum(params?: GetAlbumReq): Promise<ApiResponse<AlbumVO>> {
    return request({
      url: `/admin-api/v1/album/get_album`,
      method: "GET",
      params,
    });
  },

  /** 获取相册列表 */
  queryAlbumList(data?: QueryAlbumListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/album/query_album_list`,
      method: "POST",
      data,
    });
  },

  /** 更新相册 */
  updateAlbum(data?: UpdateAlbumReq): Promise<ApiResponse<AlbumVO>> {
    return request({
      url: `/admin-api/v1/album/update_album`,
      method: "PUT",
      data,
    });
  },

  /** 批量更新相册删除状态 */
  updateAlbumDelete(data?: UpdateAlbumDeleteReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/album/update_album_delete`,
      method: "PUT",
      data,
    });
  },
};
