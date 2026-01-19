<!--
 * @描述: 证件照上传 图片部分（对接上传裁剪功能）

  简单使用模版
 <uploadPicUni v-model="businessPic" width="285px" describe="点击上传营业执照"></uploadPicUni>
-->
<template>
  <!-- :limit="limits" -->
  <el-upload
    ref="uploadFiles"
    action="*"
    :before-upload="beforeUpload"
    :http-request="onUpload"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-change="handleChange"
    :multiple="multiple"
    :show-file-list="false"
    class="avatar-uploader"
    :style="{
      width: width,
      height: height,
    }"
  >
    <!--    <div>-->
    <!--      <img v-if="src" :src="src" class="avatar" alt="" />-->
    <!--      <i v-else class="plus avatar-uploader-icon" />-->
    <!--    </div>-->

    <div
      :style="{
        width: width,
        height: height,
      }"
    >
      <img v-if="src" :src="src" class="avatar" alt="" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </div>
  </el-upload>

  <el-dialog
    v-model="dialogVisibleCorpper"
    destroy-on-close
    :title="title"
    width="800px"
    append-to-body
  >
    <el-row>
      <el-col :span="12" style="height: 300px">
        <VueCropper
          ref="cropper"
          class="crop-box"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          :fixed="options.fixed"
          :centerBox="options.centerBox"
          :fixedNumber="options.fixedNumber"
          :outputType="options.outputType"
          @realTime="realTime"
        />
      </el-col>
      <el-col
        :span="12"
        style="height: 300px; display: flex; align-items: center; justify-content: center"
      >
        <!-- :style="{ 'aspect-ratio': aspectRatio }" -->
        <div class="preview-box" :style="previews.img">
          <!--  -->
          <img v-if="previews.url" style="width: 100%" :src="previews.url" />
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 12px">
      <el-col :span="12">
        <el-row>
          <el-col :span="8">
            <el-upload
              action="#"
              :http-request="onUpload"
              :before-upload="beforeUpload"
              :show-file-list="false"
            >
              <el-button>选择</el-button>
            </el-upload>
          </el-col>
          <el-col :span="4">
            <el-button :icon="Plus" @click="changeScale(1)" />
          </el-col>
          <el-col :span="4">
            <el-button :icon="Minus" @click="changeScale(-1)" />
          </el-col>
          <el-col :span="4">
            <el-button :icon="RefreshLeft" @click="rotateLeft()" />
          </el-col>
          <el-col :span="4">
            <el-button :icon="RefreshRight" @click="rotateRight()" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" :offset="8" style="margin-left: 22.3%">
        <el-button type="primary" @click="determine(cropperBlob)">提 交</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<!-- 简单使用模版
 <uploadPicUni v-model="businessPic" width="285px" describe="点击上传营业执照"></uploadPicUni>
-->

<script setup lang="ts">
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import * as imageConversion from "image-conversion";
import { computed, getCurrentInstance, reactive, ref } from "vue";
import type { UploadRawFile, UploadRequestOptions } from "element-plus";

import { Minus, Plus, RefreshLeft, RefreshRight } from "@element-plus/icons-vue";

const { proxy } = getCurrentInstance() as any;

const props = defineProps({
  src: {
    type: String,
    required: true,
    default: "",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  fixed: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: "100px",
  },
  height: {
    type: String,
    default: "100px",
  },
  /**width 和 height 都给的情况下不生效*/
  fixedNumber: {
    type: Array,
    default: () => [5, 3],
  },
  title: {
    type: String,
    default: "上传图片",
  },
});
const emit = defineEmits(["onConfirm"]);

const aspectRatio = computed(() => {
  return props.fixed ? `${props.fixedNumber[0]} / ${props.fixedNumber[1]}` : "";
});
const options = reactive({
  img: null, // 裁剪图片的地址
  autoCropWidth: 200, // 默认生成截图框宽度 默认容器的 80%
  autoCropHeight: 200, // 默认生成截图框高度 默认容器的 80%
  outputType: "png", // 裁剪生成图片的格式 jpeg, png, webp
  autoCrop: true, // 是否默认生成截图框
  fixedBox: false, // 固定截图框大小
  fixedNumber: props.fixedNumber,
  fixed: props.fixed,
  centerBox: true,
});

const previews = ref({
  url: "",
  img: {
    width: "200px",
    height: "200px",
  },
});
/**裁剪后的图片的blob格式文件流 */
const cropperBlob = ref<Blob>();
/**节点 */
const uploadFiles = ref();
const cropper = ref();
const dialogVisibleCorpper = ref<boolean>(false);

// 移除时触发
function handleRemove() {
  console.log("handleRemove");
}

// 上传成功时触发
function handleSuccess(response: any) {
  console.log("handleSuccess", response);
}

// 添加文件时触发
function handleChange() {
  console.log("handleChange");
}

// 上传文件时触发
function beforeUpload(rawFile: UploadRawFile) {
  console.log("beforeUpload", rawFile.name, rawFile.size);

  // if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
  //   console.log("只能上传jpg与png格式");
  //   return false;
  // }

  if (rawFile.size / 1024 < 500) {
    return true;
  }

  return new Promise<Blob>((resolve, reject) => {
    // 压缩到200KB,这里的200就是要压缩的大小,可自定义
    imageConversion.compressAccurately(rawFile, 200).then((res: Blob) => {
      console.log("compressAccurately", res.size);
      resolve(res);
    });
  });
}

function onUpload(obj: UploadRequestOptions) {
  console.log("onUpload", obj);

  let rawFile = obj.file;
  // 将 Blob 对象转换为 URL
  return new Promise((resolve, reject) => {
    options.img = URL.createObjectURL(rawFile);
    dialogVisibleCorpper.value = true;
    resolve(true);
  });
}

// 实时预览事件
const realTime = (data) => {
  previews.value.img = {
    width: data.w + "px",
    height: data.h + "px",
  };
  cropper.value.getCropBlob((blob) => {
    cropperBlob.value = blob;
    previews.value.url = URL.createObjectURL(blob);
  });
};
// 修改图片大小 正数为变大 负数变小
const changeScale = (num) => {
  num = num || 1;
  cropper.value.changeScale(num);
};
// 向左边旋转90度
const rotateLeft = () => {
  cropper.value.rotateLeft();
};
// 向右边旋转90度
const rotateRight = () => {
  cropper.value.rotateRight();
};

/**裁剪后的提交 */
const determine = (file: Blob) => {
  emit("onConfirm", file);
  dialogVisibleCorpper.value = false;
};

// watchEffect(() => {
//   console.log("props.src", props.src);
// });
</script>

<style lang="scss" scoped>
.preview-box {
  border: 1px solid #ccc;
  overflow: hidden;
}

.crop-box {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
}

.avatar-uploader {
  border: 1px dashed #8c939d;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar {
  width: 100%;
  height: 100%;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}
</style>
