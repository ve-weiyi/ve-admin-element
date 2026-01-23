<!-- 单图上传组件 -->
<template>
  <el-upload
    :drag="!imgUrl"
    :auto-upload="props.autoUpload"
    :show-file-list="false"
    accept="image/*"
    :before-upload="handleBeforeUpload"
    :http-request="handleHttpRequest"
    :on-success="handleSuccess"
  >
    <template v-if="!imgUrl">
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </template>
    <template v-else>
      <div class="img-upload">
        <el-image :src="imgUrl" fit="cover" />
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

    <template v-if="props.tip" #tip>
      <div class="el-upload__tip">
        {{ props.tip }}
      </div>
    </template>
  </el-upload>

  <el-image-viewer
    v-if="viewVisible"
    :zoom-rate="1.2"
    :initial-index="0"
    :url-list="[imgUrl]"
    @close="closePreview"
  />
</template>

<script setup lang="ts">
import { UploadFile, UploadRawFile, UploadRequestOptions } from "element-plus";
import { ref } from "vue";
import { compressImage, uploadFile } from "@/utils/file";

const props = defineProps({
  uploadPath: {
    type: String,
    required: true,
  },
  autoUpload: {
    type: Boolean,
    default: true,
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
  /**
   * 提示信息
   */
  tip: {
    type: String,
    default: "",
  },
});

const imgUrl = defineModel("modelValue", {
  type: String,
  required: true,
});

const viewVisible = ref(false);

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

  if (props.compress && file.size / 1024 >= 500) {
    return compressImage(file);
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
function handleSuccess(response: any, file: UploadFile) {
  console.log("handleSuccess", response);
  ElMessage.success("上传成功");
  imgUrl.value = response.data.file_url;
}

/**
 * 预览图片
 */
function handlePreview() {
  viewVisible.value = true;
}

/**
 * 关闭预览
 */
function closePreview() {
  viewVisible.value = false;
}

/**
 * 删除图片
 */
function handleDelete() {
  imgUrl.value = "";
}
</script>

<style scoped lang="scss">
.img-upload {
  position: relative;
  width: 100%;
  height: 100%;

  :deep(.el-image) {
    width: 100%;
    height: 100%;
  }

  &__delete-icon {
    margin-left: 5px;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--el-color-white);
    background-color: var(--el-overlay-color-lighter);
    opacity: 0;
    transition: var(--el-transition-opacity);

    &:hover {
      opacity: 1;
    }
  }
}
</style>
