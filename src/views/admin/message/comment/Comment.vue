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
      <template #user_info="scope">
        <UserInfo :user="scope.row[scope.prop]" />
      </template>
      <template #client_info="scope">
        <ClientInfo :client="scope.row[scope.prop]" />
      </template>
      <template #reply_user_info="scope">
        <div v-if="scope.row[scope.prop]" style="display: flex; align-items: center; gap: 8px">
          <el-image
            :src="scope.row[scope.prop].avatar"
            :preview-teleported="true"
            :style="`width: ${scope.imageWidth ?? 40}px; height: ${scope.imageHeight ?? 40}px`"
          />
          <span style="line-height: 1">{{ scope.row[scope.prop].nickname }}</span>
        </div>
      </template>
      <template #status="scope">
        <el-tag v-if="scope.row[scope.prop] === CommentStatusEnum.NORMAL" type="success">
          正常
        </el-tag>
        <el-tag v-else-if="scope.row[scope.prop] === CommentStatusEnum.EDITED" type="primary">
          已编辑
        </el-tag>
        <el-tag v-else-if="scope.row[scope.prop] === CommentStatusEnum.DELETED" type="danger">
          已删除
        </el-tag>
      </template>
      <template #type="scope">
        <el-tag v-if="scope.row[scope.prop] === CommentTypeEnum.ARTICLE" type="success">
          文章
        </el-tag>
        <el-tag v-else-if="scope.row[scope.prop] === CommentTypeEnum.FRIEND" type="warning">
          友链
        </el-tag>
        <el-tag v-else-if="scope.row[scope.prop] === CommentTypeEnum.TALK" type="danger">
          说说
        </el-tag>
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
import UserInfo from "@/components/UserInfo/index.vue";
import ClientInfo from "@/components/ClientInfo/index.vue";
import { CommentStatusEnum, CommentTypeEnum } from "@/enums/blog";

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
