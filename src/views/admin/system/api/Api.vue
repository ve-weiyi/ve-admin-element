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
import { ApiAPI } from "@/api/api";

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

function Sync() {
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
function handleToolbarClick(data: ISelectedData) {
  console.log(data.name);
  switch (data.name) {
    case "addApi":
      addModalRef.value?.setModalVisible({});
      break;
    case "syncApi":
      Sync();
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
function handleOperatClick(data: IOperatData) {
  console.log(data);
  switch (data.name) {
    case "addSubApi":
      addModalRef.value?.setModalVisible({
        parent_id: data.row.id,
        parent_name: data.row.name,
      });
      break;
    case "editApi":
      break;
    default:
      break;
  }
}

// 切换示例
const isA = ref(true);
</script>
