<template>
  <div class="app-container">
    <div class="filter-section">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="keywords">
          <el-input
            v-model="queryParams.keywords"
            placeholder="字典标签/字典值"
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

    <el-card shadow="never" class="table-section">
      <div class="table-section__toolbar">
        <div class="table-section__toolbar--actions">
          <el-button type="success" icon="plus" @click="openDialog()">新增</el-button>
          <el-button
            type="danger"
            :disabled="selectedIds.length === 0"
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="字典项标签" prop="label" />
        <el-table-column label="字典项值" prop="value" />
        <el-table-column label="排序" prop="sort" />
        <el-table-column label="状态">
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
              icon="edit"
              @click.stop="openDialog(scope.row as DictItem)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              size="small"
              icon="delete"
              @click.stop="handleDelete(scope.row.id)"
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
      width="600px"
      @close="closeDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="字典项标签" prop="label">
          <el-input v-model="formData.label" placeholder="请输入字典标签" />
        </el-form-item>
        <el-form-item label="字典项值" prop="value">
          <el-input v-model="formData.value" placeholder="请输入字典值" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio :value="1">启用</el-radio>
            <el-radio :value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="formData.sort" controls-position="right" />
        </el-form-item>
        <el-form-item>
          <template #label>
            <div class="flex-y-center">
              标签类型
              <el-tooltip>
                <template #content>回显样式，为空时则显示 '文本'</template>
                <el-icon class="ml-1 cursor-pointer">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-select
            v-model="formData.tagType"
            placeholder="请选择标签类型"
            clearable
            @clear="formData.tagType = ''"
          >
            <template #label="{ value }">
              <el-tag v-if="value" :type="value">
                {{ formData.label ? formData.label : "字典标签" }}
              </el-tag>
            </template>
            <el-option v-for="type in tagType" :key="type" :label="type" :value="type as string">
              <div flex-y-center gap-10px>
                <el-tag :type="type">{{ formData.label ?? "字典标签" }}</el-tag>
                <span>{{ type }}</span>
              </div>
            </el-option>
          </el-select>
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
import { useDictStoreHook } from "@/stores/dict";
import type { DictItem } from "@/config/dict";
import type { FormInstance, FormRules } from "element-plus";

const route = useRoute();
const dictStore = useDictStoreHook();

const dictCode = ref(route.query.dictCode as string);

const queryFormRef = ref<FormInstance>();
const dataFormRef = ref<FormInstance>();

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  keywords: "" as string,
});

const loading = ref(false);
const selectedIds = ref<string[]>([]);
const editingId = ref<string | null>(null);

const dialogState = reactive({
  title: "",
  visible: false,
});

const formData = reactive<Partial<DictItem>>({
  label: "",
  value: "",
  status: 1,
  sort: 1,
  tagType: "",
});

const tagType = ["primary", "success", "info", "warning", "danger"] as const;

const rules: FormRules = {
  value: [{ required: true, message: "请输入字典值", trigger: "blur" }],
  label: [{ required: true, message: "请输入字典标签", trigger: "blur" }],
};

const allItems = computed(() => {
  const dict = dictStore.getDictType(dictCode.value);
  return dict?.items || [];
});

const filteredItems = computed(() => {
  if (!queryParams.keywords) return allItems.value;
  const kw = queryParams.keywords.toLowerCase();
  return allItems.value.filter(
    (item) => item.label.toLowerCase().includes(kw) || item.value.toLowerCase().includes(kw)
  );
});

const total = computed(() => filteredItems.value.length);

const pagedData = computed(() => {
  const start = (queryParams.pageNum - 1) * queryParams.pageSize;
  return filteredItems.value.slice(start, start + queryParams.pageSize);
});

function handleQuery() {
  queryParams.pageNum = 1;
}

function handleResetQuery() {
  queryFormRef.value?.resetFields();
  queryParams.pageNum = 1;
  queryParams.keywords = "";
}

function handleSelectionChange(selection: DictItem[]) {
  selectedIds.value = selection.map((item) => item.id!);
}

function openDialog(row?: DictItem) {
  editingId.value = row?.id || null;
  dialogState.title = row?.id ? "编辑字典值" : "新增字典项";
  dialogState.visible = true;

  if (row) {
    formData.label = row.label;
    formData.value = row.value;
    formData.status = row.status ?? 1;
    formData.sort = row.sort ?? 1;
    formData.tagType = row.tagType ?? "";
  }
}

function handleSubmit() {
  dataFormRef.value?.validate((isValid) => {
    if (isValid) {
      const item: DictItem = {
        id: editingId.value || Date.now().toString(),
        label: formData.label!,
        value: formData.value!,
        status: formData.status ?? 1,
        sort: formData.sort ?? 1,
        tagType: formData.tagType || undefined,
      };

      if (editingId.value) {
        dictStore.updateDictItem(dictCode.value, editingId.value, item);
        ElMessage.success("修改成功");
      } else {
        dictStore.addDictItem(dictCode.value, item);
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
  editingId.value = null;
  formData.label = "";
  formData.value = "";
  formData.status = 1;
  formData.sort = 1;
  formData.tagType = "";
}

function handleDelete(id?: string) {
  if (!id) {
    ElMessage.warning("请选择删除项");
    return;
  }
  ElMessageBox.confirm("确认删除该字典项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    dictStore.removeDictItem(dictCode.value, id);
    ElMessage.success("删除成功");
  });
}

function handleBatchDelete() {
  if (selectedIds.value.length === 0) {
    ElMessage.warning("请勾选删除项");
    return;
  }
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    selectedIds.value.forEach((id) => dictStore.removeDictItem(dictCode.value, id));
    selectedIds.value = [];
    ElMessage.success("删除成功");
  });
}
</script>
