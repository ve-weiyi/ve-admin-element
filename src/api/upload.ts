import request from "@/utils/request";
import type {
  BatchResp,
  DeletesUploadFileReq,
  FileInfoVO,
  ListUploadFileReq,
  MultiUploadFileReq,
  PageResp,
  UploadFileReq,
} from "./types";

export const UploadAPI = {
  /** 删除文件列表 */
  deletesUploadFileApi(data?: DeletesUploadFileReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/upload/deletes_upload_file",
      method: "DELETE",
      data: data,
    });
  },

  /** 获取文件列表 */
  listUploadFileApi(data?: ListUploadFileReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/upload/list_upload_file",
      method: "POST",
      data: data,
    });
  },

  /** 上传文件列表 */
  multiUploadFileApi(data?: MultiUploadFileReq): Promise<IApiResponse<FileInfoVO[]>> {
    return request({
      url: "/admin-api/v1/upload/multi_upload_file",
      method: "POST",
      data: data,
    });
  },

  /** 上传文件 */
  uploadFileApi(data?: UploadFileReq): Promise<IApiResponse<FileInfoVO>> {
    return request({
      url: "/admin-api/v1/upload/upload_file",
      method: "POST",
      data: data,
    });
  },
};
