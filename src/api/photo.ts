import request from "@/utils/request";
import { IdsReq, BatchResp, PhotoNewReq, PhotoBackDTO, IdReq, PageQuery, PageResp } from "./types";

/** "分页获取照片列表" */
export function findPhotoListApi(data?: PageQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/photo/find_photo_list",
    method: "post",
    data: data,
  });
}

/** "批量删除照片" */
export function batchDeletePhotoApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/album/batch_delete_photo",
    method: "delete",
    data: data,
  });
}

/** "创建照片" */
export function addPhotoApi(data?: PhotoNewReq): Promise<IApiResponse<PhotoBackDTO>> {
  return request({
    url: "/admin_api/v1/photo/add_photo",
    method: "post",
    data: data,
  });
}

/** "删除照片" */
export function deletePhotoApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/photo/delete_photo",
    method: "delete",
    data: data,
  });
}

/** "更新照片" */
export function updatePhotoApi(data?: PhotoNewReq): Promise<IApiResponse<PhotoBackDTO>> {
  return request({
    url: "/admin_api/v1/photo/update_photo",
    method: "put",
    data: data,
  });
}
