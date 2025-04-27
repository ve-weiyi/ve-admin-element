<!-- 单图上传组件 -->
<template>
  <el-upload
    v-show="imgUrl === ''"
    multiple
    :drag="true"
    :auto-upload="true"
    :before-upload="handleBeforeUpload"
    :http-request="handleHttpRequest"
    :on-success="handleSuccess"
    :show-file-list="false"
    accept="image/*"
  >
    <div :style="{ width: width, height: height }">
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </div>
  </el-upload>

  <el-upload
    v-show="imgUrl !== ''"
    v-model="imgUrl"
    v-bind="props"
    :show-file-list="false"
    :before-upload="handleBeforeUpload"
    :http-request="handleHttpRequest"
    :on-success="handleSuccess"
  >
    <template #default>
      <div v-if="imgUrl" class="el-upload-dragger">
        <el-image
          :src="imgUrl"
          fit="cover"
          :style="{ width: width, height: height }"
        />
        <div class="img-upload__overlay">
          <el-icon class="img-upload__preview-icon" @click.stop="handlePreview">
            <ZoomIn />
          </el-icon>

          <el-icon class="img-upload__delete-icon" @click.stop="handleDelete">
            <Delete />
          </el-icon>
        </div>
      </div>
    </template>

    <template v-if="props.tip != ''" #tip>
      <div class="el-upload__tip">
        {{ props.tip }}
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import {
  ElImageViewer,
  UploadFile,
  UploadProps,
  UploadRawFile,
  UploadRequestOptions,
} from "element-plus";
import { compressImage, uploadFile } from "@/utils/file";

type IUpload = Partial<Omit<UploadProps, "modelValue">> & {
  uploadPath: string; // 上传路径
  compress?: boolean; // 是否压缩文件
  tip?: string; // 提示信息
  width?: string; // 图片宽度
  height?: string; // 图片高度
};

const props = withDefaults(defineProps<IUpload>(), {
  uploadPath: "file",
  compress: false,
  autoUpload: true,
});

const imgUrl = defineModel("modelValue", {
  type: String,
  required: true,
});

console.log("props", imgUrl.value);

/**
 * 上传前
 * 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
 */
function handleBeforeUpload(file: UploadRawFile) {
  console.log("handleBeforeUpload", file.name, file.size);

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
  imgUrl.value = response.data.file_url;
}

/**
 * 预览图片
 */
function handlePreview() {
  if (imgUrl.value) {
    const imageViewerApp = createApp({
      setup() {
        return () =>
          h(ElImageViewer, {
            urlList: [imgUrl.value],
            initialIndex: 0,
            onClose: () => {
              imageViewerApp.unmount();
              document.body.removeChild(container);
            },
          });
      },
    });
    const container = document.createElement("div");
    document.body.appendChild(container);
    imageViewerApp.mount(container);
  }
}

/**
 * 删除图片
 */
function handleDelete() {
  imgUrl.value = "";
}
</script>

<style scoped lang="scss">
:deep(.el-upload--picture-card) {
  /*  width: var(--el-upload-picture-card-size);
  height: var(--el-upload-picture-card-size); */
  width: 100%;
  height: 100%;
}

.img-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    border-color: var(--el-color-primary);
  }

  &__delete-icon {
    margin-left: 5px;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #fff;
    background-color: var(--el-overlay-color-lighter);
    border-radius: 6px;
    opacity: 0;
    transition: opacity var(--el-transition-duration);

    &:hover {
      opacity: 1;
    }
  }
}
</style>
