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
        <template #icon="scope">
          <svg-icon :icon-class="scope.row.meta.icon" />
        </template>
        <template #is_disable="scope">
          <el-tag v-if="scope.row.meta.is_disable === 0">正常</el-tag>
          <el-tag v-if="scope.row.meta.is_disable === 1" type="danger">
            禁用
          </el-tag>
        </template>
        <template #is_hidden="scope">
          <el-tag v-if="scope.row.meta.is_hidden === 0">否</el-tag>
          <el-tag v-if="scope.row.meta.is_hidden === 1" type="danger">
            是
          </el-tag>
        </template>
      </page-content>

      <!-- 编辑 -->
      <el-dialog v-model="addOrUpdate" width="680px" append-to-body />

      <!-- 添加或修改对话框 -->
      <el-dialog
        :title="title"
        v-model="addOrUpdate"
        width="680px"
        append-to-body
      >
        <MenuForm v-model="menuForm" />
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="addOrUpdate = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmitClick">
              确 定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { IObject, IOperatData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import contentConfig from "./config/content";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageContent from "@/components/CURD/PageContent.vue";
import MenuForm from "./form.vue";
import { MenuNewReq } from "@/api/types.ts";
import { addMenuApi, syncMenuListApi, updateMenuApi } from "@/api/menu.ts";
import { RouteRecordRaw } from "vue-router";
import home from "@/router/admin/home.ts";
import article from "@/router/admin/article.ts";
import message from "@/router/admin/message.ts";
import system from "@/router/admin/system.ts";
import monitor from "@/router/admin/monitor.ts";
import log from "@/router/admin/log.ts";
import mine from "@/router/admin/mine.ts";
import picture from "@/router/admin/picture.ts";
import website from "@/router/admin/website.ts";

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

// 表单提交
async function handleSubmitClick() {
  if (menuForm.value.id) {
    //编辑
    await updateMenuApi(menuForm.value);

    ElMessage.success("编辑成功");
    addOrUpdate.value = false;
  } else {
    //新增
    await addMenuApi(menuForm.value);

    ElMessage.success("新增成功");
    addOrUpdate.value = false;
  }

  //根据检索条件刷新列表数据
  const queryParams = searchRef.value?.getQueryParams();
  contentRef.value?.fetchPageData(queryParams, true);
}

const title = ref("添加菜单");
const addOrUpdate = ref(false);
const menuForm = ref<MenuNewReq>();

function Sync() {
  const constantRoutes = [];
  constantRoutes.push(home);
  constantRoutes.push(article);
  constantRoutes.push(message);
  constantRoutes.push(picture);
  constantRoutes.push(system);
  constantRoutes.push(monitor);
  constantRoutes.push(log);
  constantRoutes.push(website);
  constantRoutes.push(mine);
  console.log("dynamicMenus-->", constantRoutes);
  ElMessageBox.confirm(
    `确认要<strong>同步菜单列表到数据库吗</strong>`,
    "系统提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      dangerouslyUseHTMLString: true,
      draggable: true,
    }
  )
    .then(() => {
      const menus = constantRoutes as RouteRecordRaw[];
      syncMenuListApi({ menus: convertMenu(menus) }).then((res) => {
        ElMessage.success("同步成功");
        //根据检索条件刷新列表数据
        const queryParams = searchRef.value?.getQueryParams();
        contentRef.value?.fetchPageData(queryParams, true);
      });
    })
    .catch(() => {
      ElMessage.warning("同步取消");
    });
}

function convertMenu(menus: any[]) {
  for (let i = 0; i < menus.length; i++) {
    if (menus[i].component) {
      menus[i].component = menus[i].component.toString();
    }
    if (menus[i].children) {
      menus[i].children = convertMenu(menus[i].children);
    }
  }

  return menus;
}

// 其他工具栏
function handleToolbarClick(name: string) {
  console.log(name);
  switch (name) {
    case "addMenu":
      menuForm.value = {
        children: [],
        component: "",
        id: 0,
        meta: {},
        name: "",
        parent_id: 0,
        path: "",
        redirect: "",
        type: 0,
      };
      addOrUpdate.value = true;
      break;
    case "syncMenu":
      Sync();
      break;
    default:
      break;
  }
}

// 其他操作列
function handleOperatClick(data: IOperatData) {
  console.log(data);
  switch (data.name) {
    case "addSubMenu":
      menuForm.value = {
        children: [],
        component: "",
        id: 0,
        meta: {},
        name: "",
        parent_id: data.row.id,
        path: "",
        redirect: "",
        type: 0,
      };
      addOrUpdate.value = true;
      break;
    case "editMenu":
      menuForm.value = data.row as MenuNewReq;
      addOrUpdate.value = true;
      break;
    default:
      break;
  }
}

// 切换示例
const isA = ref(true);
</script>
