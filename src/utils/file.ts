import * as imageConversion from "image-conversion";
import { multiUploadFileApi, uploadFileApi } from "@/api/upload";

export function compressImage(rawFile: Blob) {
  return new Promise<Blob>((resolve, reject) => {
    // 压缩到200KB,这里的200就是要压缩的大小,可自定义
    imageConversion.compressAccurately(rawFile, 200).then((res: Blob) => {
      console.log("compressAccurately", res.size);
      resolve(res);
    });
  });
}

export function uploadFile(blob: Blob, path: string) {
  const data = {
    file: blob,
    file_path: path,
  };
  return uploadFileApi(data);
}

export async function multipleUploadFile(files: Blob[], path: string) {
  const data = {
    files: files,
    file_path: path,
  };
  return multiUploadFileApi(data);
}
