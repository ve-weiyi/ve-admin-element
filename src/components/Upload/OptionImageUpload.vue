<!-- 单图上传组件 -->
<template>
  <single-image-upload
    v-if="uploadType === 'upload'"
    v-model="imgUrl"
    accept="image/*"
    upload-path="/page"
    height="100px"
    width="270px"
  />
  <el-select
    v-if="uploadType === 'select'"
    v-model="imgUrl"
    filterable
    remote
    reserve-keyword
    placeholder="输入路径前缀"
    remote-show-suffix
    :remote-method="fetchFileList"
    :loading="loading"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <div class="flex items-center">
        <img :src="item.value" size="6" />
        <span>{{ item.label }}</span>
      </div>
    </el-option>
  </el-select>
  <el-input v-if="uploadType === 'input'" v-model="imgUrl" placeholder="请输入图片链接" />
</template>

<script setup lang="ts">
import { ListUploadFileReq } from "@/api/types.ts";
import { listUploadFileApi } from "@/api/file.ts";

const imgUrl = defineModel("modelValue", {
  type: String,
  required: true,
});

console.log("props", imgUrl.value);

const props = defineProps({
  uploadType: {
    type: String,
    default: "upload",
    required: true,
  },
});

//
// const uploadType = defineModel("uploadType", {
//   type: Number,
//   default: () => 0,
//   required: true,
// });

// const uploadType = ref(0);
const options = ref([]);
const loading = ref(false);
const fetchFileList = (query: string) => {
  if (query) {
    loading.value = true;
    let data: ListUploadFileReq = {
      file_path: query,
      limit: 10,
    };

    listUploadFileApi(data).then((res) => {
      loading.value = false;
      options.value = [];
      res.data.urls.forEach((item) => {
        options.value.push({ value: item, label: item.split("/").pop() });
      });
    });
  } else {
    options.value = [];
  }
};
</script>

<style scoped lang="scss"></style>
