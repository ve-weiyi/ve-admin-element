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
      </template>
      <template #visible="scope">
        <el-tag v-if="scope.row.visible === MenuVisibleEnum.VISIBLE" type="success">显示</el-tag>
        <el-tag v-if="scope.row.visible === MenuVisibleEnum.HIDDEN" type="danger">隐藏</el-tag>
      </template>
      <template #status="scope">
        <el-tag v-if="scope.row.status === ApiStatusEnum.NORMAL" type="success">正常</el-tag>
        <el-tag v-if="scope.row.status === ApiStatusEnum.DISABLED" type="danger">禁用</el-tag>
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
import type { NewMenuReq } from "@/api/types";
import { MenuAPI } from "@/api/menu";
import { ApiStatusEnum, MenuStatusEnum, MenuTypeEnum, MenuVisibleEnum } from "@/enums/blog";
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
const menuFormData = ref<NewMenuReq>();

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
 * 转换单个路由为菜单项
 */
function convertRouteToMenu(route: RouteRecordRaw, index: number, parentId = 0): NewMenuReq {
  return {
    parent_id: parentId,
    path: route.path || "",
    name: route.name?.toString() || "",
    component: parseComponentPath(route.component?.toString()),
    redirect: route.redirect?.toString() || "",
    type: route.children?.length ? MenuTypeEnum.CATALOG : MenuTypeEnum.MENU,
    title: route.meta?.title || "",
    icon: route.meta?.icon || "",
    rank: index + 1,
    perm: (route.meta?.perm as string) || "",
    params: Array.isArray(route.meta?.params) ? route.meta.params : [],
    keep_alive: route.meta?.keepAlive ? MenuStatusEnum.DISABLED : MenuStatusEnum.NORMAL,
    always_show: route.meta?.alwaysShow ? MenuStatusEnum.DISABLED : MenuStatusEnum.NORMAL,
    visible: route.meta?.hidden ? MenuVisibleEnum.HIDDEN : MenuVisibleEnum.VISIBLE,
    status: ApiStatusEnum.NORMAL,
    children: route.children ? convertMenu(route.children) : [],
  };
}

/**
 * 转换路由数组为菜单数组
 */
function convertMenu(routes: RouteRecordRaw[]): NewMenuReq[] {
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
  console.log(name);
  switch (name) {
    case "addCatalog":
      title.value = "新增目录";
      menuFormData.value = {
        id: 0,
        parent_id: 0,
        path: "",
        name: "",
        component: "",
        redirect: "",
        children: [],
        type: MenuTypeEnum.CATALOG,
        visible: MenuVisibleEnum.VISIBLE,
        status: ApiStatusEnum.NORMAL,
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
    case "addMenu":
      title.value = "新增菜单";
      menuFormData.value = {
        id: 0,
        parent_id: data.row.id,
        path: "",
        name: "",
        component: "",
        redirect: "",
        children: [],
        type: MenuTypeEnum.MENU,
        visible: MenuVisibleEnum.VISIBLE,
        status: ApiStatusEnum.NORMAL,
        always_show: 1,
        rank: 1,
      };
      addOrUpdate.value = true;
      break;
    case "editMenu":
      title.value = "编辑菜单";
      menuFormData.value = data.row as NewMenuReq;
      addOrUpdate.value = true;
      break;
  }
}
</script>
