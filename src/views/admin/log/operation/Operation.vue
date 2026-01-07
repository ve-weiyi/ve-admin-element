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
      @add-click="handleAddClick"
      @edit-click="handleEditClick"
      @export-click="handleExportClick"
      @search-click="handleSearchClick"
      @toolbar-click="handleToolbarClick"
      @operate-click="handleOperateClick"
      @filter-change="handleFilterChange"
    >
      <template #user="scope">
        <UserInfo :user="scope.row[scope.prop]" />
      </template>
      <template #request_method="scope">
        <div v-if="scope.row[scope.prop] === ''"></div>
        <el-tag v-else-if="scope.row[scope.prop] === 'GET'" type="success">GET</el-tag>
        <el-tag v-else-if="scope.row[scope.prop] === 'POST'" type="primary">POST</el-tag>
        <el-tag v-else-if="scope.row[scope.prop] === 'PUT'" type="warning">PUT</el-tag>
        <el-tag v-else-if="scope.row[scope.prop] === 'DELETE'" type="danger">DELETE</el-tag>
        <el-tag v-else type="info">{{ scope.row[scope.prop] }}</el-tag>
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
import { OperationLogAPI } from "@/api/operation_log";
import type { CommentReviewReq } from "@/api/types";
import UserInfo from "@/components/UserInfo/index.vue";

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
function handleToolbarClick(name: string) {
  console.log(name);
}

// 其他操作列
function handleOperateClick(data: IOperateData) {
  console.log(data);
}
</script>
