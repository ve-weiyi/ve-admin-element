import request from "@/utils/request";
import type {
  BatchResp,
  CreatePhotoReq,
  DeletePhotoReq,
  PageResult,
  PhotoVO,
  QueryPhotoListReq,
  UpdatePhotoDeleteReq,
  UpdatePhotoReq,
} from "@/api/types";

/** 照片管理 */
export const PhotoAPI = {
  /** 创建照片 */
  createPhoto(data?: CreatePhotoReq): Promise<ApiResponse<PhotoVO>> {
    return request({
      url: `/admin-api/v1/photo/create_photo`,
      method: "POST",
      data,
    });
  },

  /** 批量删除照片 */
  deletePhoto(data?: DeletePhotoReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/photo/delete_photo`,
      method: "DELETE",
      data,
    });
  },

  /** 获取照片列表 */
  queryPhotoList(data?: QueryPhotoListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/photo/query_photo_list`,
      method: "POST",
      data,
    });
  },

  /** 更新照片 */
  updatePhoto(data?: UpdatePhotoReq): Promise<ApiResponse<PhotoVO>> {
    return request({
      url: `/admin-api/v1/photo/update_photo`,
      method: "PUT",
      data,
    });
  },

  /** 批量更新照片删除状态 */
  updatePhotoDelete(data?: UpdatePhotoDeleteReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/photo/update_photo_delete`,
      method: "PUT",
      data,
    });
  },
};
