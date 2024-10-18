<!-- 文件上传组件 -->
<template>
  <div>
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :style="props.style"
      :accept="props.accept"
      :limit="props.limit"
      :drag="props.drag"
      :auto-upload="props.autoUpload"
      multiple
      :before-upload="handleBeforeUpload"
      :http-request="handleHttpRequest"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
    >
      <template v-if="props.drag">
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          <span>将文件拖到此处，或</span>
          <em>点击上传</em>
        </div>
      </template>

      <template v-if="props.tip != ''" #tip>
        <div class="el-upload__tip">
          {{ props.tip }}
        </div>
      </template>

      <template #file="{ file }">
        <div class="el-upload-list__item-info">
          <a class="el-upload-list__item-name" @click="downloadFile(file)">
            <el-icon>
              <Document />
            </el-icon>
            <span class="el-upload-list__item-file-name">{{ file.name }}</span>
            <span class="el-icon--close" @click.stop="handleRemove(file)">
              <el-icon><Close /></el-icon>
            </span>
          </a>
        </div>
      </template>
    </el-upload>
    <el-progress
      v-if="showUploadPercent"
      :style="{
        display: showUploadPercent ? 'inline-flex' : 'none',
        width: '100%',
      }"
      :percentage="uploadPercent"
      :color="customColorMethod"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  genFileId,
  UploadFile,
  type UploadInstance,
  UploadProgressEvent,
  UploadRawFile,
  UploadRequestOptions,
  UploadUserFile,
} from "element-plus";

import { ResultEnum } from "@/enums/ResultEnum";
import { uploadFile } from "@/utils/file.ts";
import { ref } from "vue";

const props = defineProps({
  /**
   * 文件集合
   */
  modelValue: {
    type: Array<UploadUserFile>,
    default: () => [],
  },
  uploadPath: {
    type: String,
    default: "/file",
    required: false,
  },
  /**
   * 单个文件上传大小限制(单位byte)
   */
  maxSize: {
    type: Number,
    default: 2 * 1024 * 1024,
  },
  /**
   * 提示信息内容
   */
  tip: {
    type: String,
    default: "",
  },
  /**
   * 样式
   */
  style: {
    type: Object,
    default: () => {
      return {
        width: "100%",
      };
    },
  },
  /**
   * 上传文件类型
   */
  accept: {
    type: String,
    default: "*",
  },
  /**
   * 文件上传数量限制
   */
  limit: {
    type: Number,
    default: 10,
  },
  drag: {
    type: Boolean,
    default: false,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
});

const uploadRef = ref<UploadInstance>();
const fileList = defineModel({
  type: Array<UploadUserFile>,
  default: () => [],
  required: true,
});

/**
 * 上传前
 * 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
 */
function handleBeforeUpload(file: UploadRawFile) {
  console.log("handleBeforeUpload", file.name, file.size);

  if (file.size > props.maxSize) {
    ElMessage.warning(
      "上传文件不能大于" + Math.trunc(props.maxSize / 1024 / 1024) + "M"
    );
    return false;
  }
  uploadPercent.value = 0;
  showUploadPercent.value = true;

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
function handleSuccess(response: any, file: UploadFile) {
  console.log("handleSuccess", response);
  showUploadPercent.value = false;
  uploadPercent.value = 0;
  if (response.code === ResultEnum.SUCCESS) {
    ElMessage.success("上传成功");
    fileList.value.push({
      name: file.name,
      url: response.data.file_url,
    });
    return;
  } else {
    ElMessage.error(response.message || "上传失败");
  }
}

/**
 * 上传失败
 */
function handleError(error: any) {
  console.log("handleError", error);
  showUploadPercent.value = false;
  uploadPercent.value = 0;
  ElMessage.error("上传失败");
}

/**
 * 删除文件
 */
function handleRemove(removeFile: UploadUserFile) {
  console.log("handleRemove", removeFile);
  fileList.value = fileList.value.filter(
    (file) => file.name !== removeFile.name
  );
}

/**
 * 文件数量超出限制
 */
function handleExceed(files: File[]) {
  console.log("handleExceed", files);
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
}

/**
 * 上传进度
 */
function handleProgress(event: UploadProgressEvent) {
  console.log("handleProgress", event.percent);
  uploadPercent.value = event.percent;
}

const showUploadPercent = ref(false);
const uploadPercent = ref(0);

const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return "#909399";
  }
  if (percentage < 70) {
    return "#375ee8";
  }
  return "#67c23a";
};

/**
 * 下载文件
 */
function downloadFile(file: UploadUserFile) {
  console.log("downloadFile", file);
  const filePath = file.url;
  if (filePath) {
    window.open(filePath);
  }
}
</script>
<style lang="scss" scoped>
.el-upload-list__item .el-icon--close {
  position: absolute;
  top: 50%;
  right: 5px;
  color: var(--el-text-color-regular);
  cursor: pointer;
  opacity: 0.75;
  transition: opacity var(--el-transition-duration);
  transform: translateY(-50%);
}

:deep(.el-upload-list) {
  margin: 0;
}

:deep(.el-upload-list__item) {
  margin: 0;
}

.show-upload-btn {
  :deep(.el-upload) {
    display: inline-flex;
  }
}

.hide-upload-btn {
  :deep(.el-upload) {
    display: none;
  }
}
</style>
