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
import type { IOperatData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import contentConfig from "./config/content";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageContent from "@/components/CURD/PageContent.vue";
import { updateCommentReviewApi } from "@/api/comment.ts";
import { CommentReviewReq } from "@/api/types.ts";

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
    case "review": {
      const req: CommentReviewReq = {
        id: data.row.id,
        is_review: data.row.is_review == 1 ? 2 : 1,
      };
      updateCommentReviewApi(req).then(() => {
        ElMessage.success("审核成功");
        contentRef.value?.fetchPageData();
      });
    }
  }
}

// 切换示例
const isA = ref(true);
</script>
