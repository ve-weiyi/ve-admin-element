import request from "@/utils/request";
import type {
  GetUploadTokenReq,
  GetUploadTokenResp,
  QueryFileListReq,
  QueryFileListResp,
  UploadFileReq,
  UploadFileResp,
} from "@/api/types";

/** 文件上传 */
export const UploadAPI = {
  /** 获取上传凭证（前端直传） */
  getUploadToken(data?: GetUploadTokenReq): Promise<ApiResponse<GetUploadTokenResp>> {
    return request({
      url: `/admin-api/v1/upload/get_upload_token`,
      method: "POST",
      data,
    });
  },

  /** 查询上传文件列表 */
  queryFileList(data?: QueryFileListReq): Promise<ApiResponse<QueryFileListResp>> {
    return request({
      url: `/admin-api/v1/upload/query_file_list`,
      method: "POST",
      data,
    });
  },

  /** 上传文件（服务端上传） */
  uploadFile(data: UploadFileReq): Promise<ApiResponse<UploadFileResp>> {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("file_base", data.file_base);

    return request({
      url: `/admin-api/v1/upload/upload_file`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
