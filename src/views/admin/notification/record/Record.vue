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
      <template #channel="scope">
        <el-tag v-if="scope.row.channel === 'inbox'" type="primary">站内消息</el-tag>
        <el-tag v-else-if="scope.row.channel === 'sms'" type="warning">短信</el-tag>
        <el-tag v-else-if="scope.row.channel === 'email'" type="success">邮件</el-tag>
        <el-tag v-else type="info">{{ scope.row.channel }}</el-tag>
      </template>
      <template #status="scope">
        <template v-if="scope.row.channel === 'inbox'">
          <el-tag v-if="scope.row.status === 'unread'" type="warning">未读</el-tag>
          <el-tag v-else-if="scope.row.status === 'read'" type="success">已读</el-tag>
          <el-tag v-else type="info">{{ scope.row.status }}</el-tag>
        </template>
        <template v-else>
          <el-tag v-if="scope.row.status === 'pending'" type="warning">待发送</el-tag>
          <el-tag v-else-if="scope.row.status === 'sent'" type="success">已发送</el-tag>
          <el-tag v-else-if="scope.row.status === 'failed'" type="danger">发送失败</el-tag>
          <el-tag v-else type="info">{{ scope.row.status }}</el-tag>
        </template>
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

const {
  searchRef,
  contentRef,
  handleQueryClick,
  handleResetClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

function handleToolbarClick(name: string) {
  console.log(name);
}

function handleOperateClick(data: IOperateData) {
  console.log(data);
}
</script>
