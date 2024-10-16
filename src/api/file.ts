import request from "@/utils/request";
import {
  FileUploadQuery,
  PageResp,
  FileFolderQuery,
  BatchResp,
  FileUploadBackDTO,
  FileFolderNewReq,
  FileFolderBackDTO,
  IdsReq,
  MultiUploadFileReq,
  UploadFileReq,
} from "./types";

/** 分页获取文件上传列表 */
export function findFileUploadListApi(
  data?: FileUploadQuery
): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/file/find_file_list",
    method: "POST",
    data: data,
  });
}

/** 分页获取文件目录列表 */
export function findFileFolderListApi(
  data?: FileFolderQuery
): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/file/find_folder_list",
    method: "POST",
    data: data,
  });
}

/** 创建文件目录 */
export function addFileFolderApi(
  data?: FileFolderNewReq
): Promise<IApiResponse<FileFolderBackDTO>> {
  return request({
    url: "/admin_api/v1/file/add_file_folder",
    method: "POST",
    data: data,
  });
}

/** 删除文件上传 */
export function deletesFileUploadApi(
  data?: IdsReq
): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/file/deletes_file",
    method: "DELETE",
    data: data,
  });
}

/** 删除文件目录 */
export function deletesFileFolderApi(
  data?: IdsReq
): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/file/deletes_file_folder",
    method: "DELETE",
    data: data,
  });
}

/** 上传文件列表 */
export function multiUploadFileApi(
  data?: MultiUploadFileReq
): Promise<IApiResponse<FileUploadBackDTO[]>> {
  return request({
    url: "/admin_api/v1/file/multi_upload_file",
    method: "POST",
    data: data,
  });
}

/** 更新文件目录 */
export function updateFileFolderApi(
  data?: FileFolderNewReq
): Promise<IApiResponse<FileFolderBackDTO>> {
  return request({
    url: "/admin_api/v1/file/update_file_folder",
    method: "PUT",
    data: data,
  });
}

/** 上传文件 */
export function uploadFileApi(
  data?: UploadFileReq
): Promise<IApiResponse<FileUploadBackDTO>> {
  return request({
    url: "/admin_api/v1/file/upload_file",
    method: "POST",
    data: data,
  });
}
