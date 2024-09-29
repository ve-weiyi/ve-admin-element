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
        <template #roles="scope">
          <el-tag v-for="(item, index) in scope.row[scope.prop]">
            {{ item.role_name }}
          </el-tag>
        </template>
        <template #login_type="scope">
          <el-tag v-if="scope.row.login_type === LoginTypeEnum.EMAIL" type="success">邮箱</el-tag>
          <el-tag v-if="scope.row.login_type === LoginTypeEnum.PHONE" type="danger">手机</el-tag>
          <el-tag v-if="scope.row.login_type === LoginTypeEnum.OAUTH" type="primary">第三方</el-tag>
        </template>
      </page-content>
      <!-- 编辑 -->
      <page-modal
        ref="editModalRef"
        :modal-config="editModalConfig"
        @submit-click="handleSubmitClick"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IOperatData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import contentConfig from "./config/content";
import editModalConfig from "./config/edit";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageModal from "@/components/CURD/PageModal.vue";
import PageContent from "@/components/CURD/PageContent.vue";
import { logoutApi } from "@/api/auth.ts";
import { LoginTypeEnum } from "@/enums/LoginTypeEnum.ts";

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
  if (name === "custom1") {
    ElMessage.success("点击了自定义1按钮");
  }
}

// 其他操作列
function handleOperatClick(data: IOperatData) {
  console.log(data);

  switch (data.name) {
    case "reset_pwd":
      ElMessageBox.prompt("请输入用户「" + data.row.username + "」的新密码", "重置密码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        if (!value || value.length < 6) {
          ElMessage.warning("密码至少需要6位字符，请重新输入");
          return false;
        }
        logoutApi(data.row.id).then(() => {
          ElMessage.success("密码重置成功，新密码是：" + value);
        });
      });
  }
}

// 切换示例
const isA = ref(true);
</script>
