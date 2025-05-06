import request from "@/utils/request";
import type {
  BatchResp,
  FileBackVO,
  FileFolderNewReq,
  FileQuery,
  IdsReq,
  ListUploadFileReq,
  ListUploadFileResp,
  MultiUploadFileReq,
  PageResp,
  UploadFileReq,
} from "./types";

export const FileAPI = {
  /** 创建文件目录 */
  addFileFolderApi(data?: FileFolderNewReq): Promise<IApiResponse<FileBackVO>> {
    return request({
      url: "/admin-api/v1/file/add_file_folder",
      method: "POST",
      data: data,
    });
  },

  /** 删除文件列表 */
  deletesFileApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/file/deletes_file",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取文件列表 */
  findFileListApi(data?: FileQuery): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/file/find_file_list",
      method: "POST",
      data: data,
    });
  },

  /** 获取文件列表 */
  listUploadFileApi(data?: ListUploadFileReq): Promise<IApiResponse<ListUploadFileResp>> {
    return request({
      url: "/admin-api/v1/file/list_upload_file",
      method: "POST",
      data: data,
    });
  },

  /** 上传文件列表 */
  multiUploadFileApi(data?: MultiUploadFileReq): Promise<IApiResponse<FileBackVO[]>> {
    return request({
      url: "/admin-api/v1/file/multi_upload_file",
      method: "POST",
      data: data,
    });
  },

  /** 上传文件 */
  uploadFileApi(data?: UploadFileReq): Promise<IApiResponse<FileBackVO>> {
    return request({
      url: "/admin-api/v1/file/upload_file",
      method: "POST",
      data: data,
    });
  },
};
