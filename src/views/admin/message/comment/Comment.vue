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
      <template #reply_user="scope">
        <div v-if="scope.row[scope.prop]" style="display: flex; align-items: center; gap: 8px">
          <el-image
            :src="scope.row[scope.prop].avatar"
            :preview-teleported="true"
            :style="`width: ${scope.imageWidth ?? 40}px; height: ${scope.imageHeight ?? 40}px`"
          />
          <span style="line-height: 1">{{ scope.row[scope.prop].nickname }}</span>
        </div>
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
import { CommentAPI } from "@/api/comment";
import type { CommentReviewReq } from "@/api/types";
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
  let selectionIds = [];
  contentRef.value.getSelectionData().forEach((item) => {
    selectionIds.push(item.id);
  });
  switch (name) {
    case "review": {
      const req: CommentReviewReq = {
        ids: selectionIds as number[],
        is_review: 1,
      };
      CommentAPI.updateCommentReviewApi(req).then(() => {
        ElMessage.success("审核成功");
        contentRef.value?.fetchPageData();
      });
    }
  }
}

// 其他操作列
function handleOperateClick(data: IOperateData) {
  console.log(data);

  switch (data.name) {
    case "review": {
      const req: CommentReviewReq = {
        ids: [data.row.id],
        is_review: data.row.is_review == 1 ? 2 : 1,
      };
      CommentAPI.updateCommentReviewApi(req).then(() => {
        ElMessage.success("审核成功");
        contentRef.value?.fetchPageData();
      });
    }
  }
}
</script>
