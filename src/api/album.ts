import request from "@/utils/request";
import type {
  AlbumBackVO,
  BatchResp,
  IdReq,
  IdsReq,
  NewAlbumReq,
  PageResp,
  QueryAlbumReq,
  UpdateAlbumDeleteReq,
} from "./types";

export const AlbumAPI = {
  /** 创建相册 */
  addAlbumApi(data?: NewAlbumReq): Promise<IApiResponse<AlbumBackVO>> {
    return request({
      url: "/admin-api/v1/album/add_album",
      method: "POST",
      data: data,
    });
  },

  /** 删除相册 */
  deletesAlbumApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/album/deletes_album",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取相册列表 */
  findAlbumListApi(data?: QueryAlbumReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/album/find_album_list",
      method: "POST",
      data: data,
    });
  },

  /** 查询相册 */
  getAlbumApi(data?: IdReq): Promise<IApiResponse<AlbumBackVO>> {
    return request({
      url: "/admin-api/v1/album/get_album",
      method: "POST",
      data: data,
    });
  },

  /** 更新相册 */
  updateAlbumApi(data?: NewAlbumReq): Promise<IApiResponse<AlbumBackVO>> {
    return request({
      url: "/admin-api/v1/album/update_album",
      method: "PUT",
      data: data,
    });
  },

  /** 更新相册删除状态 */
  updateAlbumDeleteApi(data?: UpdateAlbumDeleteReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/album/update_album_delete",
      method: "PUT",
      data: data,
    });
  },
};
