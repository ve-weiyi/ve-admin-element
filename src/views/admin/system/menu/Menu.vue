<template>
  <div class="app-container">
    <!-- 搜索 -->
    <PageSearch
      ref="searchRef"
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />

    <!-- 列表 -->
    <PageContent
      ref="contentRef"
      :content-config="contentConfig"
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
    </PageContent>

    <!-- 添加或修改对话框 -->
    <el-dialog v-model="addOrUpdate" :title="title" width="680px" append-to-body>
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
import type { UpdateMenuReq } from "@/api/types";
import { MenuAPI } from "@/api";
import { ApiStatusEnum, MenuStatusEnum, MenuTypeEnum, MenuVisibleEnum } from "@/enums/blog";
import { usePermissionStore } from "@/stores";
import { collectButtonsFromConfigs } from "@/utils/collect-buttons";

const {
  searchRef,
  contentRef,
  handleQueryClick,
  handleResetClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

// 表单提交
async function handleSubmitClick() {
  if (menuFormData.value.id) {
    await MenuAPI.updateMenu(menuFormData.value as any);
    ElMessage.success("编辑成功");
    addOrUpdate.value = false;
  } else {
    await MenuAPI.createMenu(menuFormData.value as any);
    ElMessage.success("新增成功");
    addOrUpdate.value = false;
  }

  const queryParams = searchRef.value?.getQueryParams();
  contentRef.value?.fetchPageData(queryParams, true);
}

const title = ref("添加菜单");
const addOrUpdate = ref(false);
const menuFormData = ref<UpdateMenuReq>({} as UpdateMenuReq);

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
        const buttonsCache = collectButtonsFromConfigs();
        const menus = convertMenu(constantRoutes as RouteRecordRaw[], buttonsCache);
        await MenuAPI.syncMenu({ menus });
        ElMessage.success("同步成功");

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

function parseComponentPath(componentStr?: string): string {
  if (!componentStr) return "";
  const match = componentStr.match(/\/([^.]+)/);
  return match ? match[1] + ".vue" : "";
}

function convertRouteToMenu(
  route: RouteRecordRaw,
  index: number,
  buttonsCache: Record<string, any>,
  parentId = 0
): any {
  const component = parseComponentPath(route.component?.toString());
  const buttonList = buttonsCache[component] || [];
  const children: any[] = route.children
    ? route.children.map((child, i) => convertRouteToMenu(child, i, buttonsCache))
    : [];

  buttonList.forEach((btn: any, idx: number) => {
    children.push({
      parent_id: 0,
      path: "",
      name: "",
      component: "",
      redirect: "",
      type: MenuTypeEnum.BUTTON,
      title: btn.text,
      icon: "",
      rank: idx + 1,
      perm: btn.perm,
      params: [],
      keep_alive: MenuStatusEnum.NORMAL,
      always_show: MenuStatusEnum.NORMAL,
      visible: MenuVisibleEnum.VISIBLE,
      status: ApiStatusEnum.NORMAL,
      children: [],
    });
  });

  return {
    parent_id: parentId,
    path: route.path || "",
    name: route.name?.toString() || "",
    component,
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
    children,
  };
}

function convertMenu(routes: RouteRecordRaw[], buttonsCache: Record<string, any>): any[] {
  if (!routes?.length) return [];
  return routes.map((route, index) => convertRouteToMenu(route, index, buttonsCache));
}

function refreshList() {
  const queryParams = searchRef.value?.getQueryParams();
  contentRef.value?.fetchPageData(queryParams, true);
}

// 其他工具栏
function handleToolbarClick(name: string) {
  switch (name) {
    case "catalog":
      title.value = "新增目录";
      menuFormData.value = {
        id: 0,
        parent_id: 0,
        path: "",
        name: "",
        component: "",
        redirect: "",
        type: MenuTypeEnum.CATALOG,
        visible: MenuVisibleEnum.VISIBLE,
        status: ApiStatusEnum.NORMAL,
        always_show: 1,
        rank: 1,
      } as any;
      addOrUpdate.value = true;
      break;
    case "sync":
      handleSync();
      break;
    case "clear":
      ElMessageBox.confirm("确认要清空所有菜单吗?", "系统提示", {
        type: "warning",
      })
        .then(async () => {
          try {
            await MenuAPI.cleanMenu();
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
    case "add":
      title.value = "新增菜单";
      menuFormData.value = {
        id: 0,
        parent_id: data.row.id,
        path: "",
        name: "",
        component: "",
        redirect: "",
        type: MenuTypeEnum.MENU,
        visible: MenuVisibleEnum.VISIBLE,
        status: ApiStatusEnum.NORMAL,
        always_show: 1,
        rank: 1,
      } as any;
      addOrUpdate.value = true;
      break;
    case "edit":
      title.value = "编辑菜单";
      menuFormData.value = data.row as UpdateMenuReq;
      addOrUpdate.value = true;
      break;
  }
}
</script>
