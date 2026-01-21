<!-- 可选图片上传组件 -->
<template>
  <single-image-upload
    v-if="props.uploadType === 'upload'"
    v-model="imgUrl"
    :upload-path="props.uploadPath"
  />
  <el-select
    v-else-if="props.uploadType === 'select'"
    v-model="imgUrl"
    filterable
    remote
    reserve-keyword
    placeholder="输入路径前缀"
    remote-show-suffix
    :remote-method="fetchFileList"
    :loading="loading"
    @change="handleSelectChange"
    @visible-change="handleVisibleChange"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      <div class="flex items-center">
        <img :src="item.isDir ? dirIcon : item.value" class="w-6 h-6 mr-2" />
        <span>{{ item.label }}</span>
      </div>
    </el-option>
  </el-select>
  <el-input v-else v-model="imgUrl" placeholder="请输入图片链接" />
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import type { ListUploadFileReq } from "@/api/types";
import { UploadAPI } from "@/api/upload_file";
import dirIcon from "@/assets/images/dir.png";
import SingleImageUpload from "@/components/Upload/SingleImageUpload.vue";

const imgUrl = defineModel("modelValue", {
  type: String,
  required: true,
});

const props = defineProps({
  uploadType: {
    type: String,
    default: "upload",
    required: false,
  },
  uploadPath: {
    type: String,
    default: "blog/file/",
    required: false,
  },
});
const options = ref<{ value: string; label: string; isDir: boolean }[]>([]);
const loading = ref(false);
const currentPath = ref("");

/**
 * 下拉框显示/隐藏时触发
 */
const handleVisibleChange = (visible: boolean) => {
  if (visible && imgUrl.value) {
    fetchFileList(imgUrl.value);
  }
};

/**
 * 选择文件/目录
 */
const handleSelectChange = (value: string) => {
  const selectedItem = options.value.find((item) => item.value === value);
  if (selectedItem?.isDir) {
    // 如果是目录，更新当前路径并重新加载
    const newPath = currentPath.value + selectedItem.label;
    fetchFileList(newPath);
    nextTick(() => {
      imgUrl.value = newPath;
    });
  }
};

/**
 * 获取文件列表
 */
const fetchFileList = (query: string) => {
  if (!query) {
    options.value = [];
    return;
  }

  // 确保路径以 / 结尾
  if (!query.endsWith("/")) {
    query = query + "/";
  }

  currentPath.value = query;
  loading.value = true;

  const data: ListUploadFileReq = {
    file_path: query,
    limit: 20,
  };

  UploadAPI.listUploadFileApi(data)
    .then((res) => {
      options.value = res.data.list.map((item) => ({
        value: item.file_url,
        label: item.file_name,
        isDir:
          item.file_name.endsWith("/") || !item.file_url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i),
      }));
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped lang="scss"></style>
