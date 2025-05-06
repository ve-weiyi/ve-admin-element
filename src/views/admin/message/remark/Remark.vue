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
        <template #user="scope">
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
          <el-tag
            :type="
              scope.row[scope.prop] == 1
                ? 'success'
                : scope.row[scope.prop] == 2
                  ? 'warning'
                  : scope.row[scope.prop] == 3
                    ? 'danger'
                    : 'info'
            "
          >
            {{
              scope.row[scope.prop] == 1
                ? "文章"
                : scope.row[scope.prop] == 2
                  ? "友链"
                  : scope.row[scope.prop] == 3
                    ? "说说"
                    : "其他"
            }}
          </el-tag>
        </template>
      </page-content>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IOperatData, ISelectedData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import contentConfig from "./config/content";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageContent from "@/components/CURD/PageContent.vue";
import { RemarkAPI } from "@/api/remark";
import type { RemarkReviewReq } from "@/api/types";

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
function handleToolbarClick(data: ISelectedData) {
  console.log(data.name);
}

// 其他操作列
function handleOperatClick(data: IOperatData) {
  console.log(data);

  switch (data.name) {
    case "review": {
      const req: RemarkReviewReq = {
        ids: [data.row.id],
        is_review: data.row.is_review == 1 ? 2 : 1,
      };
      RemarkAPI.updateRemarkReviewApi(req).then(() => {
        ElMessage.success("审核成功");
        contentRef.value?.fetchPageData();
      });
    }
  }
}

// 切换示例
const isA = ref(true);
</script>
