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
      @edit-click="handleEditClick"
      @search-click="handleSearchClick"
      @toolbar-click="handleToolbarClick"
      @operate-click="handleOperateClick"
      @filter-change="handleFilterChange"
    >
      <template #roles="scope">
        <el-tag v-for="item in scope.row.roles">
          {{ item.role_key }}
        </el-tag>
      </template>
      <template #register_type="scope">
        <el-tag v-if="scope.row.register_type === LoginTypeEnum.EMAIL" type="success">邮箱</el-tag>
        <el-tag v-else-if="scope.row.register_type === LoginTypeEnum.PHONE" type="danger">
          手机
        </el-tag>
        <el-tag v-else type="primary">{{ scope.row.register_type }}</el-tag>
      </template>
    </PageContent>
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
import contentConfig from "./config/content";
import editModalConfig from "./config/edit";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageModal from "@/components/CURD/PageModal.vue";
import PageContent from "@/components/CURD/PageContent.vue";
import { LoginTypeEnum } from "@/enums/blog";
import { UserAPI } from "@/api";

const {
  searchRef,
  contentRef,
  editModalRef,
  handleQueryClick,
  handleResetClick,
  handleEditClick,
  handleSubmitClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

// 其他工具栏
function handleToolbarClick(name: string) {
  console.log(name);
}

// 其他操作列
function handleOperateClick(data: IOperateData) {
  switch (data.name) {
    case "edit":
      handleEditClick(data.row, (row) => {
        return {
          ...row,
          role_ids: row?.roles?.map((r: any) => r.role_id) || [],
        };
      });
      break;
    case "delete":
      ElMessage.warning("暂不支持删除用户操作");
      break;
    case "reset":
      ElMessageBox.prompt("请输入用户「" + data.row.username + "」的新密码", "重置密码", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        if (!value || value.length < 6) {
          ElMessage.warning("密码至少需要6位字符，请重新输入");
          return;
        }
        UserAPI.resetUserPassword({
          user_id: data.row.user_id,
          new_password: value,
        }).then(() => {
          ElMessage.success("密码重置成功，新密码是：" + value);
        });
      });
  }
}
</script>
