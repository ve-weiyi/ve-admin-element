<!-- 文件上传组件 -->
<template>
  <div>
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :style="props.style"
      :before-upload="handleBeforeUpload"
      :http-request="handleHttpRequest"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
      :accept="props.accept"
      :limit="props.limit"
      :drag="props.drag"
      :auto-upload="props.autoUpload"
      multiple
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

      <!-- 文件列表 -->
      <template #file="{ file }">
        <template v-if="file.status === 'success'">
          <div class="el-upload-list__item-info">
            <a class="el-upload-list__item-name" @click="handleDownload(file)">
              <el-icon>
                <Document />
              </el-icon>
              <span class="el-upload-list__item-file-name">{{ file.name }}</span>
              <span class="el-icon--close" @click.stop="handleRemove(file)">
                <el-icon>
                  <Close />
                </el-icon>
              </span>
            </a>
          </div>
        </template>
        <template v-else>
          <div class="el-upload-list__item-info">
            <el-progress style="display: inline-flex" :percentage="file.percentage" />
          </div>
        </template>
      </template>
    </el-upload>

    <el-progress
      v-if="showUploadPercent"
      :style="{ width: '100%' }"
      :percentage="uploadPercent"
      :color="customColorMethod"
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
  drag: {
    type: Boolean,
    default: false,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  // /**
  //  * 请求携带的额外参数
  //  */
  // data: {
  //   type: Object,
  //   default: () => {
  //     return {};
  //   },
  // },
  // /**
  //  * 上传文件的参数名
  //  */
  // name: {
  //   type: String,
  //   default: "file",
  // },
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
   * 上传文件类型
   */
  accept: {
    type: String,
    default: "*",
  },
  // /**
  //  * 上传按钮文本
  //  */
  // uploadBtnText: {
  //   type: String,
  //   default: "上传文件",
  // },
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
});

const uploadRef = ref<UploadInstance>();
const fileList = defineModel<UploadUserFile[]>("fileList", {
  default: () => [],
});

const showUploadPercent = ref(false);
const uploadPercent = ref(0);

/**
 * 上传前
 * 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
 */
function handleBeforeUpload(file: UploadRawFile) {
  console.log("handleBeforeUpload", file.name, file.size);

  // 限制文件大小
  if (file.size > props.maxFileSize * 1024 * 1024) {
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
  fileList.value = fileList.value.filter((file) => file.name !== removeFile.name);
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
function handleDownload(file: UploadUserFile) {
  console.log("handleDownload", file);
  if (!file.url) {
    ElMessage.warning("文件地址不存在");
    return;
  }
  window.open(file.url, "_blank");
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
  transform: translateY(-50%);
  transition: opacity var(--el-transition-duration);
}

:deep(.el-upload-list) {
  margin: 0;
}

:deep(.el-upload-list__item) {
  margin: 0;
}
</style>
