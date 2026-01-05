import request from "@/utils/request";
import type {
  BatchResp,
  IdsReq,
  PageResp,
  PhotoBackVO,
  PhotoNewReq,
  PhotoQuery,
  PreDeletePhotoReq,
} from "./types";

export const PhotoAPI = {
  /** 创建照片 */
  addPhotoApi(data?: PhotoNewReq): Promise<IApiResponse<PhotoBackVO>> {
    return request({
      url: "/admin-api/v1/photo/add_photo",
      method: "POST",
      data: data,
    });
  },

  /** 删除照片 */
  deletesPhotoApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/photo/deletes_photo",
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

  /** 预删除照片 */
  preDeletePhotoApi(data?: PreDeletePhotoReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/photo/pre_delete_photo",
      method: "PUT",
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
