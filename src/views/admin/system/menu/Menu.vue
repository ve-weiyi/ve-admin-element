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
        <template #title="scope">
          <template v-if="scope.row.icon && scope.row.icon.startsWith('el-icon')">
            <el-icon style="vertical-align: -0.15em">
              <component :is="scope.row.icon.replace('el-icon-', '')" />
            </el-icon>
          </template>
          <template v-else-if="scope.row.icon">
            <svg-icon :icon-class="scope.row.icon" />
          </template>
          <template v-else>
            <svg-icon icon-class="menu" />
          </template>
          {{ scope.row.title }}
        </template>
        <template #type="scope">
          <el-tag v-if="scope.row.type === MenuTypeEnum.CATEGORY" type="warning">
            目录
          </el-tag>
          <el-tag v-if="scope.row.type === MenuTypeEnum.MENU" type="success">菜单</el-tag>
          <el-tag v-if="scope.row.type === MenuTypeEnum.BUTTON" type="danger">
            按钮
          </el-tag>
          <el-tag v-if="scope.row.type === MenuTypeEnum.EXTLINK" type="info">外链</el-tag>
        </template>

        <template #icon="scope">
          <svg-icon :icon-class="scope.row.icon" />
        </template>
        <template #is_disable="scope">
          <el-tag v-if="scope.row.is_disable === 0" type="success">正常</el-tag>
          <el-tag v-if="scope.row.is_disable === 1" type="danger">禁用</el-tag>
        </template>
        <template #is_hidden="scope">
          <el-tag v-if="scope.row.is_hidden === 0" type="success">显示</el-tag>
          <el-tag v-if="scope.row.is_hidden === 1" type="danger">隐藏</el-tag>
        </template>
      </page-content>

      <!-- 编辑 -->
      <el-dialog v-model="addOrUpdate" width="680px" append-to-body />

      <!-- 添加或修改对话框 -->
      <el-dialog :title="title" v-model="addOrUpdate" width="680px" append-to-body>
        <MenuForm v-model="menuForm" />
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="addOrUpdate = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmitClick">确 定</el-button>
          </div>
        </template>
      </el-dialog>
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
import MenuForm from "./form.vue";
import { MenuNewReq } from "@/api/types.ts";
import {
  addMenuApi,
  cleanMenuListApi,
  syncMenuListApi,
  updateMenuApi,
} from "@/api/menu.ts";
import { RouteRecordRaw } from "vue-router";
import { MenuTypeEnum } from "@/enums/MenuTypeEnum.ts";
import { usePermissionStore } from "@/store";

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
  const permissionStore = usePermissionStore();
  const constantRoutes = permissionStore.getMockRoutes();
  console.log("dynamicMenus-->", constantRoutes);
  ElMessageBox.confirm(`确认要<strong>同步菜单列表到数据库吗</strong>`, "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    dangerouslyUseHTMLString: true,
    draggable: true,
  })
    .then(() => {
      const menus = constantRoutes as RouteRecordRaw[];
      syncMenuListApi({ menus: convertMenu(menus) }).then((res) => {
        ElMessage.success("同步成功,请稍后刷新列表");
      });
    })
    .catch(() => {
      ElMessage.warning("同步取消");
    });
}

function convertMenu(menus: any[]): MenuNewReq[] {
  let result: MenuNewReq[] = [];
  menus?.forEach((menu, index) => {
    const input = menu.component.toString();
    const start = input.indexOf("/");
    const end = input.indexOf(".");

    const item: MenuNewReq = {
      parent_id: 0,
      path: menu.path,
      name: menu.name,
      component: input.slice(start, end),
      redirect: menu.redirect,
      type: menu.children ? 0 : 1,
      title: menu.meta.title,
      icon: menu.meta.icon,
      rank: index + 1,
      perm: menu.meta.perm,
      params: menu.meta.params,
      keep_alive: menu.meta.keepAlive ? 1 : 0,
      always_show: menu.meta.alwaysShow ? 1 : 0,
      is_hidden: menu.meta.hidden ? 1 : 0,
      is_disable: 0,
      children: convertMenu(menu.children),
    };

    result.push(item);
  });
  return result;
}

// 其他工具栏
function handleToolbarClick(data: ISelectedData) {
  console.log(data.name);
  switch (data.name) {
    case "addMenu":
      menuForm.value = null;
      addOrUpdate.value = true;
      break;
    case "syncMenu":
      Sync();
      break;
    case "clearMenu":
      cleanMenuListApi().then((res) => {
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
    case "addSubMenu":
      menuForm.value = {
        parent_id: data.row.id,
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
