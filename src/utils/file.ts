import * as imageConversion from "image-conversion";
import type { UploadRawFile, UploadRequestOptions } from "element-plus";
import { uploadFileApi } from "@/api/file.ts";

export function compressImage(rawFile: UploadRawFile) {
  return new Promise<Blob>((resolve, reject) => {
    // 压缩到200KB,这里的200就是要压缩的大小,可自定义
    imageConversion.compressAccurately(rawFile, 200).then((res: Blob) => {
      console.log("compressAccurately", res.size);
      resolve(res);
    });
  });
}

export function uploadFileLabel(options: UploadRequestOptions, label: string) {
  const data = {
    label: label,
    file: options.file,
    file_size: options.file.size,
    file_md5: "",
  };
  return uploadFileApi(data);
}
