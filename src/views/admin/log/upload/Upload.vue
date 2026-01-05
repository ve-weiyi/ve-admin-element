<template>
  <div class="app-container">
    <!-- 搜索 -->
    <page-search
      ref="searchRef"
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <!-- 列表 -->
    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @export-click="handleExportClick"
      @search-click="handleSearchClick"
      @toolbar-click="handleToolbarClick"
      @operate-click="handleOperateClick"
      @filter-change="handleFilterChange"
    >
      <template #creator="scope">
        <div v-if="scope.row[scope.prop]" style="display: flex; align-items: center; gap: 8px">
          <el-image
            :src="scope.row[scope.prop].avatar"
            :preview-teleported="true"
            :style="`width: ${scope.imageWidth ?? 40}px; height: ${scope.imageHeight ?? 40}px`"
          />
          <span style="line-height: 1">{{ scope.row[scope.prop].nickname }}</span>
        </div>
      </template>
      <template #icon="scope">
        <img
          v-if="scope.row.file_type === ''"
          src="@/assets/dir.png"
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
    </page-content>
  </div>
</template>

<script setup lang="ts">
import type { IOperateData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import contentConfig from "./config/content";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageContent from "@/components/CURD/PageContent.vue";

import { ref } from "vue";

const {
  contentRef,
  handleQueryClick,
  handleResetClick,
  handleAddClick,
  handleEditClick,
  handleSubmitClick,
  handleExportClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

// 其他工具栏
function handleToolbarClick(name: string) {
  console.log(name);
  switch (name) {
    default:
      break;
  }
}

// 其他操作列
function handleOperateClick(data: IOperateData) {
  console.log(data);
  switch (data.name) {
    case "edit":
      handleEditClick(data.row);
      break;
    default:
      break;
  }
}

const calculateFileSize = (size: number, isInteger = false) => {
  if (size === 0) {
    return "--";
  }
  const B = 1024;
  const KB = Math.pow(1024, 2);
  const MB = Math.pow(1024, 3);
  const GB = Math.pow(1024, 4);
  if (isInteger) {
    // 截取为整数
    if (size < B) {
      return `${size}B`;
    } else if (size < KB) {
      return `${(size / B).toFixed(0)}KB`;
    } else if (size < MB) {
      return `${(size / KB).toFixed(0)}MB`;
    } else if (size < GB) {
      return `${(size / MB).toFixed(0)}GB`;
    } else {
      return `${(size / GB).toFixed(0)}TB`;
    }
  } else {
    // 保留小数位
    if (size < B) {
      return `${size}B`;
    } else if (size < KB) {
      return `${(size / B).toFixed(0)}KB`;
    } else if (size < MB) {
      return `${(size / KB).toFixed(1)}MB`;
    } else if (size < GB) {
      return `${(size / MB).toFixed(2)}GB`;
    } else {
      return `${(size / GB).toFixed(3)}TB`;
    }
  }
};
</script>
<style scoped>
.article-cover {
  position: relative;
  width: 80%;
  height: 80%;
  border-radius: 4px;
}
</style>
