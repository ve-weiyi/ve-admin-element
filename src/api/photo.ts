import request from "@/utils/request";
import type {
  BatchResp,
  IdReq,
  IdsReq,
  PageResp,
  PhotoBackVO,
  PhotoNewReq,
  PhotoQuery,
} from "./types";

export const PhotoAPI = {
  /** 批量删除照片 */
  batchDeletePhotoApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/album/batch_delete_photo",
      method: "DELETE",
      data: data,
    });
  },

  /** 创建照片 */
  addPhotoApi(data?: PhotoNewReq): Promise<IApiResponse<PhotoBackVO>> {
    return request({
      url: "/admin-api/v1/photo/add_photo",
      method: "POST",
      data: data,
    });
  },

  /** 删除照片 */
  deletePhotoApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/photo/delete_photo",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取照片列表 */
  findPhotoListApi(data?: PhotoQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/photo/find_photo_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新照片 */
  updatePhotoApi(data?: PhotoNewReq): Promise<IApiResponse<PhotoBackVO>> {
    return request({
      url: "/admin-api/v1/photo/update_photo",
      method: "PUT",
      data: data,
    });
  },
};
