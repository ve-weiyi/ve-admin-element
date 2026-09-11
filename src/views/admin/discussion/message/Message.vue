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
      <template #guest_info="scope">
        <GuestInfo :guest="scope.row.guest_info" />
      </template>
      <template #status="scope">
        <el-tag v-if="scope.row.status === MessageStatusEnum.NORMAL" type="success">正常</el-tag>
        <el-tag v-else-if="scope.row.status === MessageStatusEnum.EDITED" type="primary">
          已编辑
        </el-tag>
        <el-tag v-else-if="scope.row.status === MessageStatusEnum.DELETED" type="danger">
          已删除
        </el-tag>
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
import GuestInfo from "@/components/GuestInfo/index.vue";
import { MessageStatusEnum } from "@/enums/blog";

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
  console.log(data);
}
</script>
