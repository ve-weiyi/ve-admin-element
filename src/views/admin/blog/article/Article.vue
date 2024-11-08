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
        <template #table-header>
          <!-- 表格菜单 -->
          <div v-if="statusList.length !== 0" class="status-menu">
            <span>状态</span>
            <template v-for="item of statusList" :key="item.value">
              <span
                :class="isActive(item.value)"
                @click="handleStatusCheck(item.value)"
              >
                {{ item.label }}
              </span>
            </template>
          </div>
        </template>
        <template #status="scope">
          <el-tag :type="scope.row[scope.prop] == 1 ? 'success' : 'info'">
            {{ scope.row[scope.prop] == 1 ? "启用" : "禁用" }}
          </el-tag>
        </template>
      </page-content>
    </template>
  </div>
</template>

<script setup lang="ts">
import { IObject, IOperatData, ISelectedData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import contentConfig from "./config/content";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageContent from "@/components/CURD/PageContent.vue";
import { recycleArticleApi } from "@/api/article.ts";
import "@/styles/table.scss";
import { ArticleDeleteEnum, ArticleStatusEnum } from "@/enums/ArticleEnum.ts";

const {
  searchRef,
  contentRef,
  addModalRef,
  editModalRef,
  handleQueryClick,
  handleResetClick,
  // handleAddClick,
  // handleEditClick,
  // handleSubmitClick,
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

const route = useRoute();
const router = useRouter();

// 其他操作列
function handleOperatClick(data: IOperatData) {
  console.log(data);

  switch (data.name) {
    case "editArticle":
      router.push({ path: `/article/edit/${data.row.id}` });
      break;
    case "recycleArticle":
      recycleArticleApi({
        id: data.row.id,
        is_delete: 1,
      }).then(() => {
        data.row.is_delete = 1;
        ElMessage.success("回收成功");
      });
    case "restoreArticle":
      recycleArticleApi({
        id: data.row.id,
        is_delete: 0,
      }).then(() => {
        data.row.is_delete = 0;
        ElMessage.success("恢复成功");
      });
    case "removeArticle":
    default:
      break;
  }
}

// 切换示例
const isA = ref(true);

/** ******** start status menu **********/
type StatusTag = {
  value: string | number;
  label: string;
  condition: any;
};

const statusList: StatusTag[] = [
  { value: "all", label: "全部", condition: {} },
  {
    value: "public",
    label: "公开",
    condition: {
      is_delete: ArticleDeleteEnum.NO,
      status: ArticleStatusEnum.PUBLIC,
    },
  },
  {
    value: "private",
    label: "私密",
    condition: {
      is_delete: ArticleDeleteEnum.NO,
      status: ArticleStatusEnum.PRIVATE,
    },
  },
  {
    value: "draft",
    label: "草稿",
    condition: {
      is_delete: ArticleDeleteEnum.NO,
      status: ArticleStatusEnum.DRAFT,
    },
  },
  {
    value: "delete",
    label: "回收站",
    condition: { is_delete: ArticleDeleteEnum.YES },
  },
];

const status = ref<string | number>(
  statusList.length > 0 ? statusList[0].value : 0
);

const isActive = (value: string | number) => {
  return value == status.value ? "status-menu-active" : "status-menu-normal";
};
// 选择了状态
const handleStatusCheck = (value: string | number) => {
  status.value = value;
  const conditions =
    statusList.find((v) => v.value === status.value)?.condition || {};

  handleQueryClick(conditions);
};
</script>
