import request from "@/utils/request";
import type {
  BatchResp,
  IdsReq,
  NewPhotoReq,
  PageResp,
  PhotoBackVO,
  QueryPhotoReq,
  UpdatePhotoDeleteReq,
} from "./types";

export const PhotoAPI = {
  /** 创建照片 */
  addPhotoApi(data?: NewPhotoReq): Promise<IApiResponse<PhotoBackVO>> {
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
  findPhotoListApi(data?: QueryPhotoReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/photo/find_photo_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新照片 */
  updatePhotoApi(data?: NewPhotoReq): Promise<IApiResponse<PhotoBackVO>> {
    return request({
      url: "/admin-api/v1/photo/update_photo",
      method: "PUT",
      data: data,
    });
  },

  /** 更新照片删除状态 */
  updatePhotoDeleteApi(data?: UpdatePhotoDeleteReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/photo/update_photo_delete",
      method: "PUT",
      data: data,
    });
  },
};
