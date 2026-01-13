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
      <template #login_type="scope">
        <el-tag v-if="scope.row.login_type === LoginTypeEnum.USERNAME" type="success">
          用户名
        </el-tag>
        <el-tag v-else-if="scope.row.login_type === LoginTypeEnum.EMAIL" type="danger">邮箱</el-tag>
        <el-tag v-else-if="scope.row.login_type === LoginTypeEnum.PHONE" type="danger">手机</el-tag>
        <el-tag v-else-if="scope.row.login_type === LoginTypeEnum.OAUTH" type="primary">
          第三方
        </el-tag>
        <el-tag v-else type="primary">{{ scope.row.login_type }}</el-tag>
      </template>
      <template #app_name="scope">
        <el-tag v-if="scope.row.app_name === 'admin-web'" type="success">admin</el-tag>
        <el-tag v-else-if="scope.row.app_name === 'blog-web'" type="danger">blog</el-tag>
        <el-tag v-else type="primary">{{ scope.row.app_name }}</el-tag>
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
import { LoginTypeEnum } from "@/enums/blog/index";

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
    default:
      break;
  }
}
</script>
