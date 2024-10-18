<!-- 文件上传组件 -->
<template>
  <div>
    <el-upload
      v-show="fileList.length === 0"
      multiple
      :file-list="fileList"
      :drag="true"
      :auto-upload="props.autoUpload"
      :before-upload="handleBeforeUpload"
      :http-request="handleHttpRequest"
      :on-success="handleSuccess"
      :show-file-list="false"
      accept="image/*"
    >
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>

    <el-upload
      v-show="fileList.length !== 0"
      ref="uploadRef"
      list-type="picture-card"
      :file-list="fileList"
      v-bind="props"
      multiple
      :before-upload="handleBeforeUpload"
      :http-request="handleHttpRequest"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
    >
      <slot>
        <el-icon>
          <Plus />
        </el-icon>
      </slot>

      <!--      <template v-if="props.tip != ''" #tip>-->
      <!--        <div class="el-upload__tip">-->
      <!--          {{ props.tip }}-->
      <!--        </div>-->
      <!--      </template>-->
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

    <el-image-viewer
      v-if="viewVisible"
      :zoom-rate="1.2"
      :initialIndex="initialIndex"
      :url-list="previewList"
      @close="closePreview"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  genFileId,
  UploadFile,
  type UploadInstance,
  UploadProgressEvent,
  UploadProps,
  UploadRawFile,
  UploadRequestOptions,
  UploadUserFile,
} from "element-plus";

import { ResultEnum } from "@/enums/ResultEnum";
import { compressImage, uploadFile } from "@/utils/file.ts";
import { ref } from "vue";

type IUpload = Partial<Omit<UploadProps, "modelValue">> & {
  uploadPath: string; // 上传路径
  compress?: boolean; // 是否压缩文件
};

const props = withDefaults(defineProps<IUpload>(), {
  uploadPath: "file",
  compress: false,
  showFileList: true,
  autoUpload: true,
  // /**
  //  * 文件集合
  //  */
  // modelValue: {
  //   type: Array<UploadUserFile>,  // uploadPath: {
  //   type: String,
  //   default: "/file",
  //   required: true,
  // },
  //   default: () => [],
  // },
  // /**
  //  * 单个文件上传大小限制(单位byte)
  //  */
  // maxSize: {
  //   type: Number,
  //   default: 2 * 1024 * 1024,
  // },

  // /**
  //  * 提示信息内容
  //  */
  // tip: {
  //   type: String,
  //   default: "",
  // },
  // /**
  //  * 样式
  //  */
  // style: {
  //   type: Object,
  //   default: () => {
  //     return {
  //       width: "100%",
  //     };
  //   },
  // },
  // /**
  //  * 上传文件类型
  //  */
  // accept: {
  //   type: String,
  //   default: "*",
  // },
  // /**
  //  * 文件上传数量限制
  //  */
  // limit: {
  //   type: Number,
  //   default: 10,
  // },
  // drag: {
  //   type: Boolean,
  //   default: false,
  // },
  // autoUpload: {
  //   type: Boolean,
  //   default: true,
  // },
  // showFileList: {
  //   type: Boolean,
  //   default: true,
  // },
});

const uploadRef = ref<UploadInstance>();
const fileList = defineModel("fileList", {
  type: Array<UploadUserFile>,
  default: () => [],
  required: true,
});

watch(
  () => fileList.value,
  (newValue) => {
    console.log("fileList", newValue);
  }
);

/**
 * 上传前
 * 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
 */
function handleBeforeUpload(file: UploadRawFile) {
  console.log("handleBeforeUpload", file.name, file.size);

  // if (file.size > props.maxSize) {
  //   ElMessage.warning(
  //     "上传文件不能大于" + Math.trunc(props.maxSize / 1024 / 1024) + "M"
  //   );
  //   return false;
  // }
  // uploadPercent.value = 0;
  // showUploadPercent.value = true;
  //
  // return true;

  if (!props.compress) {
    return true;
  }

  if (file.size / 1024 < 500) {
    return true;
  }

  return compressImage(file);
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
function handleRemove(file: UploadUserFile) {
  console.log("handleRemove", file);

  const index = fileList.value.findIndex((item) => item.url === file.url);
  if (index !== -1) {
    fileList.value.splice(index, 1);
  }
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

const viewVisible = ref(false);
const previewList = ref<string[]>([]);
const initialIndex = ref(0);

/**
 * 预览图片
 */
const handlePreview: UploadProps["onPreview"] = (uploadFile: UploadFile) => {
  console.log("handlePreview", uploadFile);
  previewList.value = fileList.value.map((file) => file.url!);
  initialIndex.value = fileList.value.findIndex(
    (file) => file.url === uploadFile.url
  );
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
