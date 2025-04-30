<template>
  <div class="app-container">
    <!-- 列表 -->
    <template v-if="isA">
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
        @add-click="handleAddClick"
        @edit-click="handleEditClick"
        @export-click="handleExportClick"
        @search-click="handleSearchClick"
        @toolbar-click="handleToolbarClick"
        @operat-click="handleOperatClick"
        @filter-change="handleFilterChange"
      >
        <template #user="scope">
          <div v-if="scope.row[scope.prop]" style="display: flex; align-items: center; gap: 8px">
            <el-image
              :src="scope.row[scope.prop].avatar"
              :preview-teleported="true"
              :style="`width: ${scope.imageWidth ?? 40}px; height: ${scope.imageHeight ?? 40}px`"
            />
            <span style="line-height: 1">{{ scope.row[scope.prop].nickname }}</span>
          </div>
        </template>
        <template #login_type="scope">
          <el-tag v-if="scope.row.login_type === LoginTypeEnum.EMAIL" type="success">邮箱</el-tag>
          <el-tag v-if="scope.row.login_type === LoginTypeEnum.PHONE" type="danger">手机</el-tag>
          <el-tag v-if="scope.row.login_type === LoginTypeEnum.OAUTH" type="primary">第三方</el-tag>
        </template>
      </page-content>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IOperatData, ISelectedData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import contentConfig from "./config/content";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageContent from "@/components/CURD/PageContent.vue";
import { LoginTypeEnum } from "@/enums/LoginTypeEnum";

const {
  searchRef,
  contentRef,
  addModalRef,
  editModalRef,
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
function handleToolbarClick(data: ISelectedData) {
  console.log(data.name);
}

// 其他操作列
function handleOperatClick(data: IOperatData) {
  console.log(data);

  switch (data.name) {
    default:
      break;
  }
}

// 切换示例
const isA = ref(true);
</script>
