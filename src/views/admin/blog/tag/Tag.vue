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
        <template #status="scope">
          <el-tag :type="scope.row[scope.prop] == 1 ? 'success' : 'info'">
            {{ scope.row[scope.prop] == 1 ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </page-content>

      <!-- 新增 -->
      <page-modal
        ref="addModalRef"
        :modal-config="addModalConfig"
        @submit-click="handleSubmitClick"
      />

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
import type { IObject, IOperatData, ISelectedData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import addModalConfig from "./config/add";
import contentConfig from "./config/content";
import editModalConfig from "./config/edit";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageModal from "@/components/CURD/PageModal.vue";
import PageContent from "@/components/CURD/PageContent.vue";

const {
  searchRef,
  contentRef,
  addModalRef,
  editModalRef,
  handleQueryClick,
  handleResetClick,
  // handleAddClick,
  // handleEditClick,
  handleSubmitClick,
  handleExportClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

// 新增
async function handleAddClick() {
  addModalRef.value?.setModalVisible();
}

// 编辑
async function handleEditClick(row: IObject) {
  editModalRef.value?.setModalVisible(row);
}

// 其他工具栏
function handleToolbarClick(data: ISelectedData) {
  console.log(data.name);
}

// 其他操作列
function handleOperatClick(data: IOperatData) {
  console.log(data);
  // 重置密码
}

// 切换示例
const isA = ref(true);
</script>
