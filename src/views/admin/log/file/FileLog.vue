<template>
  <div class="app-container">
    <!-- 搜索 -->
    <PageSearch
      ref="searchRef"
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <!-- 列表 -->
    <PageContent
      ref="contentRef"
      :content-config="contentConfig"
      @search-click="handleSearchClick"
      @toolbar-click="handleToolbarClick"
      @operate-click="handleOperateClick"
      @filter-change="handleFilterChange"
    >
      <template #user_info="scope">
        <UserInfo :user="scope.row.user_info" />
      </template>
      <template #icon="scope">
        <img
          v-if="scope.row.file_type === ''"
          src="@/assets/images/dir.png"
          class="article-cover"
          style="cursor: pointer"
        />
        <el-image v-else class="article-cover" :src="scope.row.file_url" fit="cover" />
      </template>
      <template #file_name="scope">
        <el-link type="primary" :href="scope.row.file_url" target="_blank">
          {{ scope.row.file_name }}
        </el-link>
      </template>
      <template #file_size="scope">
        {{ calculateFileSize(scope.row.file_size) }}
      </template>
    </PageContent>
  </div>
</template>

<script setup lang="ts">
import type { IOperateData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import contentConfig from "./config/content";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageContent from "@/components/CURD/PageContent.vue";
import UserInfo from "@/components/UserInfo/index.vue";
import { calculateFileSize, downloadFile } from "@/utils/file";

const {
  searchRef,
  contentRef,
  handleQueryClick,
  handleResetClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

// 其他工具栏
function handleToolbarClick(name: string) {
  console.log(name);
}

// 其他操作列
function handleOperateClick(data: IOperateData) {
  switch (data.name) {
    case "download":
      downloadFile(data.row.file_url, data.row.file_name);
      break;
    default:
      break;
  }
}
</script>
<style scoped>
.article-cover {
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 4px;
}
</style>
