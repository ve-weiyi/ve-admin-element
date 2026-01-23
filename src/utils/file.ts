import * as imageConversion from "image-conversion";
import { UploadAPI } from "@/api/upload_file";

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
  if (path.startsWith("/")) {
    ElMessage.error("上传路径不能以'/'开头，不能包含连续的 '/'");
    return;
  }

  if (!path.endsWith("/")) {
    ElMessage.error("上传路径必须以'/'结尾");
    return;
  }

  const data = {
    file: blob,
    file_path: path,
  };
  return UploadAPI.uploadFileApi(data);
}

export async function multipleUploadFile(files: Blob[], path: string) {
  if (path.startsWith("/")) {
    ElMessage.error("上传路径不能以'/'开头，不能包含连续的 '/'");
    return;
  }

  if (!path.endsWith("/")) {
    ElMessage.error("上传路径必须以'/'结尾");
    return;
  }
  const data = {
    files: files,
    file_path: path,
  };
  return UploadAPI.multiUploadFileApi(data);
}

export const calculateFileSize = (size: number, isInteger = false) => {
  if (size === 0) {
    return "--";
  }
  const B = 1024;
  const KB = Math.pow(1024, 2);
  const MB = Math.pow(1024, 3);
  const GB = Math.pow(1024, 4);
  if (isInteger) {
    // 截取为整数
    if (size < B) {
      return `${size}B`;
    } else if (size < KB) {
      return `${(size / B).toFixed(0)}KB`;
    } else if (size < MB) {
      return `${(size / KB).toFixed(0)}MB`;
    } else if (size < GB) {
      return `${(size / MB).toFixed(0)}GB`;
    } else {
      return `${(size / GB).toFixed(0)}TB`;
    }
  } else {
    // 保留小数位
    if (size < B) {
      return `${size}B`;
    } else if (size < KB) {
      return `${(size / B).toFixed(0)}KB`;
    } else if (size < MB) {
      return `${(size / KB).toFixed(1)}MB`;
    } else if (size < GB) {
      return `${(size / MB).toFixed(2)}GB`;
    } else {
      return `${(size / GB).toFixed(3)}TB`;
    }
  }
};

export function downloadFile(url: string, filename: string) {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      // 创建下载链接
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;

      // 触发下载
      document.body.appendChild(link);
      link.click();

      // 清理
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    });
}
