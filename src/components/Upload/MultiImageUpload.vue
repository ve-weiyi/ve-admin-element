<!-- 多图上传组件 -->
<template>
  <div>
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :list-type="fileList.length === 0 ? 'picture' : 'picture-card'"
      :drag="fileList.length === 0"
      :show-file-list="fileList.length !== 0"
      multiple
      accept="image/*"
      :auto-upload="props.autoUpload"
      :limit="props.limit"
      :before-upload="handleBeforeUpload"
      :http-request="handleHttpRequest"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
    >
      <template v-if="fileList.length === 0">
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </template>
      <template v-else>
        <el-icon>
          <Plus />
        </el-icon>
      </template>
    </el-upload>

    <el-progress
      v-if="showUploadPercent"
      :style="{ width: '100%' }"
      :percentage="uploadPercent"
      :color="customColorMethod"
    />

    <el-image-viewer
      v-if="viewVisible"
      :zoom-rate="1.2"
      :initial-index="initialIndex"
      :url-list="previewList"
      @close="closePreview"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  genFileId,
  UploadFile,
  UploadFiles,
  type UploadInstance,
  UploadProgressEvent,
  UploadProps,
  UploadRawFile,
  UploadRequestOptions,
  UploadUserFile,
} from "element-plus";

import { compressImage, uploadFile } from "@/utils/file";
import { ref } from "vue";

const props = defineProps({
  uploadPath: {
    type: String,
    default: "/file",
    required: false,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  /**
   * 文件上传数量限制
   */
  limit: {
    type: Number,
    default: 10,
  },
  /**
   * 单个文件上传大小限制(单位MB)
   */
  maxFileSize: {
    type: Number,
    default: 10,
  },
  /**
   * 是否压缩图片
   */
  compress: {
    type: Boolean,
    default: false,
  },
});

const uploadRef = ref<UploadInstance>();
const fileList = defineModel<UploadUserFile[]>("fileList", {
  default: () => [],
});

const showUploadPercent = ref(false);
const uploadPercent = ref(0);

/**
 * 上传前
 */
function handleBeforeUpload(file: UploadRawFile) {
  console.log("handleBeforeUpload", file.name, file.size);

  // 限制文件大小
  if (file.size > props.maxFileSize * 1024 * 1024) {
    if (props.compress) {
      ElMessage.warning("上传文件大于" + props.maxFileSize + "M" + "，正在压缩...");
      return compressImage(file);
    }

    ElMessage.warning("上传文件不能大于" + props.maxFileSize + "M");
    return false;
  }

  return true;
}

/**
 * 上传中
 */
function handleHttpRequest(options: UploadRequestOptions) {
  console.log("handleHttpRequest", options.filename);
  return uploadFile(options.file, props.uploadPath);
}

/**
 * 上传成功
 */
function handleSuccess(response: any, file: UploadFile, files?: UploadFiles) {
  console.log("handleSuccess", response);
  ElMessage.success("上传成功");

  // 更新文件的 url
  const index = fileList.value.findIndex((f) => f.uid === file.uid);
  if (index !== -1) {
    fileList.value[index].url = response.data.file_url;
    fileList.value[index].status = "success";
  }

  // 延迟隐藏进度条
  setTimeout(() => {
    showUploadPercent.value = false;
    uploadPercent.value = 0;
  }, 500);
}

/**
 * 上传失败
 */
function handleError(error: any) {
  console.log("handleError", error);
  ElMessage.error(error?.message || "上传失败");

  setTimeout(() => {
    showUploadPercent.value = false;
    uploadPercent.value = 0;
  }, 500);
}

/**
 * 删除文件
 */
function handleRemove(removeFile: UploadUserFile) {
  console.log("handleRemove", removeFile);
  const index = fileList.value.findIndex((item) => item.uid === removeFile.uid);
  if (index !== -1) {
    fileList.value.splice(index, 1);
  }
}

/**
 * 文件数量超出限制
 */
function handleExceed(files: File[]) {
  console.log("handleExceed", files);
  ElMessage.warning(`最多只能上传 ${props.limit} 张图片`);
}

/**
 * 上传进度
 */
function handleProgress(event: UploadProgressEvent) {
  console.log("handleProgress", event.percent);
  uploadPercent.value = event.percent;
}

const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return "#909399";
  }
  if (percentage < 70) {
    return "#375ee8";
  }
  return "#67c23a";
};

const viewVisible = ref(false);
const previewList = ref<string[]>([]);
const initialIndex = ref(0);

/**
 * 预览图片
 */
const handlePreview: UploadProps["onPreview"] = (uploadFile: UploadFile) => {
  console.log("handlePreview", uploadFile);
  previewList.value = fileList.value.map((file) => file.url!);
  initialIndex.value = fileList.value.findIndex((file) => file.url === uploadFile.url);
  viewVisible.value = true;
};

/**
 * 关闭预览
 */
const closePreview = () => {
  viewVisible.value = false;
};
</script>
<style lang="scss" scoped></style>
