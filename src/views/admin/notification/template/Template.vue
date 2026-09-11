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
      @add-click="handleAddClick"
      @edit-click="handleEditClick"
      @search-click="handleSearchClick"
      @toolbar-click="handleToolbarClick"
      @operate-click="handleOperateClick"
      @filter-change="handleFilterChange"
    >
      <template #channel="scope">
        <el-tag v-if="scope.row.channel === 'sms'" type="danger">短信</el-tag>
        <el-tag v-else-if="scope.row.channel === 'email'" type="warning">邮件</el-tag>
        <el-tag v-else-if="scope.row.channel === 'inbox'" type="success">站内</el-tag>
        <el-tag v-else type="info">{{ scope.row.channel }}</el-tag>
      </template>
      <template #enabled="scope">
        <el-tag v-if="scope.row.enabled === SwitchEnum.ON" type="success">启用</el-tag>
        <el-tag v-else type="info">禁用</el-tag>
      </template>
    </PageContent>

    <!-- 新增 -->
    <PageModal ref="addModalRef" :modal-config="addModalConfig" @submit-click="handleSubmitClick" />

    <!-- 编辑 -->
    <PageModal
      ref="editModalRef"
      :modal-config="editModalConfig"
      @submit-click="handleSubmitClick"
    />
  </div>
</template>

<script setup lang="ts">
import type { IOperateData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import addModalConfig from "./config/add";
import contentConfig from "./config/content";
import editModalConfig from "./config/edit";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageModal from "@/components/CURD/PageModal.vue";
import PageContent from "@/components/CURD/PageContent.vue";
import { SwitchEnum } from "@/enums/blog";

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
  handleSearchClick,
  handleFilterChange,
} = usePage();

function handleToolbarClick(name: string) {
  console.log(name);
}

function handleOperateClick(data: IOperateData) {
  switch (data.name) {
    case "edit":
      handleEditClick(data.row);
      break;
    default:
      console.log(data);
      break;
  }
}
</script>
