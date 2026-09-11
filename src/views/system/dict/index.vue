<template>
  <div class="app-container">
    <div class="filter-section">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="keywords">
          <el-input
            v-model="queryParams.keywords"
            placeholder="字典名称/编码"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item class="search-buttons">
          <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
          <el-button icon="refresh" @click="handleResetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="hover" class="table-section">
      <div class="table-section__toolbar">
        <div class="table-section__toolbar--actions">
          <el-button type="success" icon="plus" @click="handleCreateClick()">新增</el-button>
          <el-button
            type="danger"
            :disabled="selectedCodes.length === 0"
            icon="delete"
            @click="handleBatchDelete()"
          >
            删除
          </el-button>
        </div>
      </div>

      <el-table
        v-loading="loading"
        highlight-current-row
        :data="pagedData"
        border
        class="table-section__content"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="字典名称" prop="name" />
        <el-table-column label="字典编码" prop="code" />
        <el-table-column label="状态" prop="status">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
              {{ scope.row.status === 1 ? "启用" : "禁用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="220">
          <template #default="scope">
            <el-button
              type="primary"
              link
              size="small"
              @click.stop="openDictData(scope.row as DictType)"
            >
              <template #icon>
                <Collection />
              </template>
              字典数据
            </el-button>

            <el-button
              type="primary"
              link
              size="small"
              icon="edit"
              @click.stop="handleEditClick(scope.row as DictType)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              icon="delete"
              @click.stop="handleDelete(scope.row.code)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>

    <el-dialog
      v-model="dialogState.visible"
      :title="dialogState.title"
      width="500px"
      @close="closeDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入字典名称" />
        </el-form-item>

        <el-form-item label="字典编码" prop="code">
          <el-input
            v-model="formData.code"
            placeholder="请输入字典编码"
            :disabled="!!editingCode"
          />
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Dict",
  inheritAttrs: false,
});

import { useDictStoreHook } from "@/stores/dict";
import type { DictType } from "@/config/dict";
import type { FormInstance, FormRules } from "element-plus";
import router from "@/router";

const dictStore = useDictStoreHook();

const queryFormRef = ref<FormInstance>();
const dataFormRef = ref<FormInstance>();

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keywords: "" as string,
});

const loading = ref(false);
const selectedCodes = ref<string[]>([]);
const editingCode = ref<string | null>(null);

const dialogState = reactive({
  title: "",
  visible: false,
});

const formData = reactive<Partial<DictType>>({
  name: "",
  code: "",
  status: 1,
  remark: "",
  items: [],
});

const rules: FormRules = {
  name: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入字典编码", trigger: "blur" }],
};

const filteredList = computed(() => {
  const all = dictStore.getDictTypes();
  if (!queryParams.keywords) return all;
  const kw = queryParams.keywords.toLowerCase();
  return all.filter((d) => d.name.toLowerCase().includes(kw) || d.code.toLowerCase().includes(kw));
});

const total = computed(() => filteredList.value.length);

const pagedData = computed(() => {
  const start = (queryParams.pageNum - 1) * queryParams.pageSize;
  return filteredList.value.slice(start, start + queryParams.pageSize);
});

function handleQuery() {
  queryParams.pageNum = 1;
}

function handleResetQuery() {
  queryFormRef.value?.resetFields();
  queryParams.pageNum = 1;
  queryParams.keywords = "";
}

function handleSelectionChange(selection: DictType[]) {
  selectedCodes.value = selection.map((item) => item.code);
}

function handleCreateClick() {
  editingCode.value = null;
  dialogState.title = "新增字典";
  dialogState.visible = true;
}

function handleEditClick(row: DictType) {
  editingCode.value = row.code;
  dialogState.title = "修改字典";
  dialogState.visible = true;
  const dict = dictStore.getDictType(row.code);
  if (dict) {
    formData.name = dict.name;
    formData.code = dict.code;
    formData.status = dict.status ?? 1;
    formData.remark = dict.remark ?? "";
    formData.items = dict.items ? [...dict.items] : [];
  }
}

function handleSubmit() {
  dataFormRef.value?.validate((isValid) => {
    if (isValid) {
      const data: DictType = {
        name: formData.name!,
        code: formData.code!,
        status: formData.status ?? 1,
        remark: formData.remark,
        items: formData.items || [],
      };

      if (editingCode.value) {
        dictStore.updateDictType(editingCode.value, data);
        ElMessage.success("修改成功");
      } else {
        dictStore.addDictType(data);
        ElMessage.success("新增成功");
      }
      closeDialog();
    }
  });
}

function closeDialog() {
  dialogState.visible = false;
  dataFormRef.value?.resetFields();
  dataFormRef.value?.clearValidate();
  formData.name = "";
  formData.code = "";
  formData.status = 1;
  formData.remark = "";
  formData.items = [];
}

function handleDelete(code: string) {
  ElMessageBox.confirm("确认删除该字典?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    dictStore.removeDictType(code);
    ElMessage.success("删除成功");
  });
}

function handleBatchDelete() {
  if (selectedCodes.value.length === 0) {
    ElMessage.warning("请勾选删除项");
    return;
  }
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    selectedCodes.value.forEach((code) => dictStore.removeDictType(code));
    selectedCodes.value = [];
    ElMessage.success("删除成功");
  });
}

function openDictData(row: DictType) {
  const route = router.resolve({
    name: "DictItem",
    query: { dictCode: row.code, title: `【${row.name}】字典数据` },
  });
  if (route.matched.length === 0) {
    ElMessage.error("路由未注册，请刷新页面后重试");
    return;
  }
  router.push(route);
}
</script>
