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
      <template #is_review="scope">
        <el-tag :type="scope.row[scope.prop] == 1 ? 'success' : 'warning'">
          {{ scope.row[scope.prop] == 1 ? "通过" : "审核中" }}
        </el-tag>
      </template>
      <template #type="scope">
        <el-tag v-if="scope.row[scope.prop] === 1" type="success">文章</el-tag>
        <el-tag v-else-if="scope.row[scope.prop] === 2" type="warning">友链</el-tag>
        <el-tag v-else-if="scope.row[scope.prop] === 3" type="danger">说说</el-tag>
        <el-tag v-else type="info">其他</el-tag>
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
import { RemarkAPI } from "@/api/remark";
import type { RemarkReviewReq } from "@/api/types";
import { ElMessage } from "element-plus";
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

  switch (data.name) {
    case "review": {
      const req: RemarkReviewReq = {
        ids: [data.row.id],
        is_review: data.row.is_review == 1 ? 2 : 1,
      };
      RemarkAPI.updateRemarkReviewApi(req).then(() => {
        ElMessage.success("审核成功");
        contentRef.value?.fetchPageData();
      });
    }
  }
}
</script>
