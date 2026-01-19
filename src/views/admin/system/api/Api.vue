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
      <template #method="scope">
        <div v-if="scope.row.method === ''"></div>
        <el-tag v-else-if="scope.row.method === 'GET'" type="success">GET</el-tag>
        <el-tag v-else-if="scope.row.method === 'POST'" type="primary">POST</el-tag>
        <el-tag v-else-if="scope.row.method === 'PUT'" type="warning">PUT</el-tag>
        <el-tag v-else-if="scope.row.method === 'DELETE'" type="danger">DELETE</el-tag>
        <el-tag v-else type="info">{{ scope.row.method }}</el-tag>
      </template>
      <template #status="scope">
        <el-tag v-if="scope.row.status === ApiStatusEnum.NORMAL" type="success">正常</el-tag>
        <el-tag v-if="scope.row.status === ApiStatusEnum.DISABLED" type="danger">禁用</el-tag>
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
import { ApiAPI } from "@/api/api";
import { ApiStatusEnum } from "@/enums/blog";

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

function handleSync() {
  ElMessageBox.confirm(`确认要<strong>同步接口列表到数据库吗</strong>`, "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    dangerouslyUseHTMLString: true,
    draggable: true,
  })
    .then(({ value }) => {
      ApiAPI.syncApiListApi().then((res) => {
        ElMessage.success("同步成功,请稍后刷新列表");
      });
    })
    .catch(() => {
      ElMessage.warning("同步取消");
    });
}

// 其他工具栏
function handleToolbarClick(name: string) {
  console.log(name);
  switch (name) {
    case "syncApi":
      handleSync();
      break;
    case "clearApi":
      ApiAPI.cleanApiListApi().then((res) => {
        ElMessage.success("清空成功");
        //根据检索条件刷新列表数据
        const queryParams = searchRef.value?.getQueryParams();
        contentRef.value?.fetchPageData(queryParams, true);
      });
      break;
    default:
      break;
  }
}

// 其他操作列
function handleOperateClick(data: IOperateData) {
  console.log(data);
  switch (data.name) {
    case "addSubApi":
      addModalRef.value?.setFormData({
        parent_id: data.row.id,
        parent_name: data.row.name,
      });
      addModalRef.value?.setModalVisible(true);
      break;
    case "edit":
      handleEditClick(data.row);
      break;
    default:
      break;
  }
}
</script>
