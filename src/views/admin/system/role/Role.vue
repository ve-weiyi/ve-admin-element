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

      <!-- 分配权限弹窗 -->
      <el-drawer
        v-if="drawer"
        v-model="drawer"
        :before-close="handleClose"
        :show-close="true"
        size="40%"
      >
        <template #header>
          <a style="font-size: 20px; font-weight: bold">【{{ formData.role_label }}】权限设置</a>
        </template>
        <el-tabs type="border-card">
          <el-tab-pane label="角色菜单权限">
            <el-scrollbar height="700px">
              <Tree
                ref="menuTree"
                :tree-data="menuList"
                :default-check-ids="roleResources.menu_ids"
                @on-node-check="onMenusChange"
              >
                <template #default="{ node, data }">
                  <span>{{ data.title }} {{ data.path }}</span>
                </template>
              </Tree>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="角色接口权限">
            <el-scrollbar height="700px">
              <Tree
                ref="apiTree"
                :tree-data="apiList"
                :default-check-ids="roleResources.api_ids"
                @on-node-check="onApiChange"
              >
                <template #default="{ node, data }">
                  <span>{{ data.name }} {{ data.path }}</span>
                </template>
              </Tree>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">取消</el-button>
            <el-button type="primary" @click="confirmClick">确定</el-button>
          </div>
        </template>
      </el-drawer>
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
import Tree from "./components/tree.vue";
import { RoleAPI } from "@/api/role";
import { ApiAPI } from "@/api/api";
import { MenuAPI } from "@/api/menu";
import type { ApiBackVO, MenuBackVO, RoleBackVO, RoleResourcesResp } from "@/api/types";

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

// 其他工具栏
function handleToolbarClick(data: ISelectedData) {
  console.log(data.name);
}

// 其他操作列
function handleOperatClick(data: IOperatData) {
  console.log(data);
  // 重置密码
  switch (data.name) {
    case "editRoleMenu":
      openDrawer(data.row);
      break;
    default:
      break;
  }
}

// 切换示例
const isA = ref(true);

const menuList = ref<MenuBackVO[]>();
const apiList = ref<ApiBackVO[]>();

const drawer = ref(false);
const formData = ref<RoleBackVO>();
const roleResources = ref<RoleResourcesResp>();
const menuTree = ref();
const apiTree = ref();

const onMenusChange = (value: any) => {
  console.log("onMenusChange", value);
};
const onApiChange = (value: any) => {
  console.log("onApiChange", value);
};

const openDrawer = (v: any) => {
  if (!apiList.value) {
    ApiAPI.findApiListApi({}).then((res) => {
      apiList.value = res.data.list;
    });

    MenuAPI.findMenuListApi({}).then((res) => {
      menuList.value = res.data.list;
    });
  }

  console.log("row", v);
  formData.value = v as RoleBackVO;
  RoleAPI.findRoleResourcesApi({
    id: v.id,
  }).then((res) => {
    roleResources.value = res.data;
    drawer.value = true;
  });
};

const handleClose = (done: () => void) => {
  drawer.value = false;
};

function cancelClick() {
  drawer.value = false;
}

function confirmClick() {
  ElMessageBox.confirm(`是否要更新角色权限?`)
    .then(() => {
      updateMenus();
      updateApis();

      drawer.value = false;
    })
    .catch(() => {
      // catch error
    });
}

function updateMenus() {
  const ids = menuTree.value.getCheckedKeys();

  const v1 = ids ? JSON.stringify(ids.sort(fun)) : "[]";
  const v2 = roleResources.value.menu_ids
    ? JSON.stringify(roleResources.value.menu_ids.sort(fun))
    : "[]";

  const isEqual = v1 === v2;
  console.log("check", v1, isEqual, v1 != "[]" && !isEqual);

  if (!isEqual) {
    RoleAPI.updateRoleMenusApi({
      role_id: roleResources.value.role_id,
      menu_ids: ids,
    }).then((res) => {
      ElMessage.success("操作成功");
    });
  }
}

function updateApis() {
  const ids = apiTree.value.getCheckedKeys();

  const v1 = ids ? JSON.stringify(ids.sort(fun)) : "[]";
  const v2 = roleResources.value.api_ids
    ? JSON.stringify(roleResources.value.api_ids.sort(fun))
    : "[]";

  const isEqual = v1 === v2;
  console.log("check", v1, v2, isEqual, v1 != "[]" && !isEqual);

  if (!isEqual) {
    RoleAPI.updateRoleApisApi({
      role_id: roleResources.value.role_id,
      api_ids: ids,
    }).then((res) => {
      ElMessage.success("操作成功");
    });
  }
}

const fun = (a: number, b: number) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
};

onMounted(() => {});
</script>
