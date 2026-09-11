<!-- 可选图片上传组件 -->
<template>
  <SingleImageUpload
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
        <el-icon v-if="item.isDir" class="mr-2"><Folder /></el-icon>
        <img v-else :src="item.value" class="w-6 h-6 mr-2" />
        <span>{{ item.label }}</span>
      </div>
    </el-option>
  </el-select>
  <el-input v-else v-model="imgUrl" placeholder="请输入图片链接" />
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import type { FileInfoVO, QueryFileListReq } from "@/api/types";
import { UploadAPI } from "@/api";
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

const handleVisibleChange = (visible: boolean) => {
  if (visible && imgUrl.value) {
    fetchFileList(imgUrl.value);
  }
};

const handleSelectChange = (value: string) => {
  const selectedItem = options.value.find((item) => item.value === value);
  if (selectedItem?.isDir) {
    const newPath = currentPath.value + selectedItem.label;
    fetchFileList(newPath);
    nextTick(() => {
      imgUrl.value = newPath;
    });
  }
};

const fetchFileList = (query: string) => {
  if (!query) {
    options.value = [];
    return;
  }

  if (!query.endsWith("/")) {
    query = query + "/";
  }

  currentPath.value = query;
  loading.value = true;

  const data: QueryFileListReq = {
    file_base: query,
    page_size: 20,
  };

  UploadAPI.queryFileList(data)
    .then((res) => {
      options.value = (res.data.list || []).map((item: FileInfoVO) => ({
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
