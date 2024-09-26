import request from "@/utils/request";
import { UploadFileReq, UploadFileResp } from "./types";

/** "上传文件" */
export function uploadFileApi(data?: UploadFileReq): Promise<IApiResponse<UploadFileResp>> {
  return request({
    url: "/admin_api/v1/upload/upload_file",
    method: "post",
    data: data,
  });
}
