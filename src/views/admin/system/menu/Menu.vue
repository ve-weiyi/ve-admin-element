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
      <template #title="scope">
        <template v-if="scope.row.icon && scope.row.icon.startsWith('el-icon')">
          <el-icon style="vertical-align: -0.15em">
            <component :is="scope.row.icon.replace('el-icon-', '')" />
          </el-icon>
        </template>
        <template v-else-if="scope.row.icon">
          <div :class="`i-svg:${scope.row.icon}`" />
        </template>
        {{ scope.row.title }}
      </template>
      <template #type="scope">
        <el-tag v-if="scope.row.type === MenuTypeEnum.CATALOG" type="warning">目录</el-tag>
        <el-tag v-if="scope.row.type === MenuTypeEnum.MENU" type="success">菜单</el-tag>
        <el-tag v-if="scope.row.type === MenuTypeEnum.BUTTON" type="danger">按钮</el-tag>
        <el-tag v-if="scope.row.type === MenuTypeEnum.EXTLINK" type="info">外链</el-tag>
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

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" v-model="addOrUpdate" width="680px" append-to-body>
      <MenuForm v-model="menuFormData" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addOrUpdate = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmitClick">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { IOperateData } from "@/components/CURD/types";
import type { RouteRecordRaw } from "vue-router";
import usePage from "@/components/CURD/usePage";
import contentConfig from "./config/content";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageContent from "@/components/CURD/PageContent.vue";
import MenuForm from "./form.vue";
import type { MenuNewReq } from "@/api/types";
import { MenuAPI } from "@/api/menu";
import { MenuTypeEnum, SwitchStatusEnum } from "@/enums/blog";
import { usePermissionStore } from "@/store";

const {
  searchRef,
  contentRef,
  addModalRef,
  editModalRef,
  handleQueryClick,
  handleResetClick,
  handleAddClick,
  handleEditClick,
  // handleSubmitClick,
  handleExportClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

// 表单提交
async function handleSubmitClick() {
  if (menuFormData.value.id) {
    //编辑
    await MenuAPI.updateMenuApi(menuFormData.value);

    ElMessage.success("编辑成功");
    addOrUpdate.value = false;
  } else {
    //新增
    await MenuAPI.addMenuApi(menuFormData.value);

    ElMessage.success("新增成功");
    addOrUpdate.value = false;
  }

  //根据检索条件刷新列表数据
  const queryParams = searchRef.value?.getQueryParams();
  contentRef.value?.fetchPageData(queryParams, true);
}

const title = ref("添加菜单");
const addOrUpdate = ref(false);
const menuFormData = ref<MenuNewReq>();

function handleSync() {
  const permissionStore = usePermissionStore();
  const constantRoutes = permissionStore.getMockRoutes();

  ElMessageBox.confirm(`确认要<strong>同步菜单列表到数据库吗</strong>`, "系统提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    dangerouslyUseHTMLString: true,
    draggable: true,
  })
    .then(async () => {
      try {
        const menus = convertMenu(constantRoutes as RouteRecordRaw[]);
        await MenuAPI.syncMenuListApi({ menus });
        ElMessage.success("同步成功");

        // 自动刷新列表
        const queryParams = searchRef.value?.getQueryParams();
        contentRef.value?.fetchPageData(queryParams, true);
      } catch (error) {
        ElMessage.error("同步失败: " + error);
      }
    })
    .catch(() => {
      ElMessage.info("已取消同步");
    });
}

/**
 * 解析组件路径
 */
function parseComponentPath(componentStr?: string): string {
  if (!componentStr) return "";

  const match = componentStr.match(/\/([^.]+)/);
  return match ? match[1] + ".vue" : "";
}

/**
 * 获取菜单类型
 */
function getMenuType(route: RouteRecordRaw): string {
  // 优先使用 meta 中明确定义的类型
  if (route.meta?.type) {
    return route.meta.type as string;
  }

  // 外链判断
  if (route.path?.startsWith("http")) {
    return MenuTypeEnum.EXTLINK;
  }

  // 无组件且有子路由 = 目录
  if (!route.component && route.children?.length) {
    return MenuTypeEnum.CATALOG;
  }

  // 有组件 = 菜单
  if (route.component) {
    return MenuTypeEnum.MENU;
  }

  // 默认为菜单
  return MenuTypeEnum.MENU;
}

/**
 * 转换单个路由为菜单项
 */
function convertRouteToMenu(route: RouteRecordRaw, index: number, parentId = 0): MenuNewReq {
  return {
    parent_id: parentId,
    path: route.path || "",
    name: route.name?.toString() || "",
    component: parseComponentPath(route.component?.toString()),
    redirect: route.redirect?.toString() || "",
    type: getMenuType(route),
    title: route.meta?.title || "",
    icon: route.meta?.icon || "",
    rank: index + 1,
    perm: (route.meta?.perm as string) || "",
    params: Array.isArray(route.meta?.params) ? route.meta.params : [],
    keep_alive: route.meta?.keepAlive ? SwitchStatusEnum.ENABLED : SwitchStatusEnum.DISABLED,
    always_show: route.meta?.alwaysShow ? SwitchStatusEnum.ENABLED : SwitchStatusEnum.DISABLED,
    is_hidden: route.meta?.hidden ? SwitchStatusEnum.ENABLED : SwitchStatusEnum.DISABLED,
    is_disable: SwitchStatusEnum.DISABLED,
    children: route.children ? convertMenu(route.children) : [],
  };
}

/**
 * 转换路由数组为菜单数组
 */
function convertMenu(routes: RouteRecordRaw[]): MenuNewReq[] {
  if (!routes?.length) return [];

  return routes.map((route, index) => convertRouteToMenu(route, index));
}

/**
 * 刷新列表数据
 */
function refreshList() {
  const queryParams = searchRef.value?.getQueryParams();
  contentRef.value?.fetchPageData(queryParams, true);
}

// 其他工具栏
function handleToolbarClick(name: string) {
  switch (name) {
    case "addMenu":
      title.value = "新增菜单";
      menuFormData.value = {
        id: 0,
        parent_id: 0,
        path: "",
        name: "",
        component: "",
        redirect: "",
        children: [],
        type: MenuTypeEnum.CATALOG,
        is_hidden: 0,
        is_disable: 0,
        always_show: 1,
        rank: 1,
      };
      addOrUpdate.value = true;
      break;
    case "syncMenu":
      handleSync();
      break;
    case "clearMenu":
      ElMessageBox.confirm("确认要清空所有菜单吗?", "系统提示", {
        type: "warning",
      })
        .then(async () => {
          try {
            await MenuAPI.cleanMenuListApi();
            ElMessage.success("清空成功");
            refreshList();
          } catch (error) {
            ElMessage.error("清空失败: " + error);
          }
        })
        .catch(() => {
          ElMessage.info("已取消清空");
        });
      break;
  }
}

// 其他操作列
function handleOperateClick(data: IOperateData) {
  switch (data.name) {
    case "addSubMenu":
      title.value = "新增子菜单";
      menuFormData.value = {
        id: 0,
        parent_id: data.row.id,
        path: "",
        name: "",
        component: "",
        redirect: "",
        children: [],
        type: MenuTypeEnum.CATALOG,
        is_hidden: 0,
        is_disable: 0,
        always_show: 1,
        rank: 1,
      };
      addOrUpdate.value = true;
      break;
    case "editMenu":
      title.value = "编辑菜单";
      menuFormData.value = data.row as MenuNewReq;
      addOrUpdate.value = true;
      break;
  }
}
</script>
