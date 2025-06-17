<template>
  <div class="app-container">
    <!-- 搜索栏 -->
    <el-card v-show="showSearch" shadow="never" class="mb-[10px]">
      <el-form :inline="true">
        <el-form-item label="页面名称">
          <el-input
            v-model="queryParams.page_name"
            style="width: 200px"
            placeholder="请输入页面名称"
            clearable
            @keyup.enter="refreshList"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="refreshList">搜索</el-button>
          <el-button icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表栏 -->
    <el-card class="main-card">
      <!-- 标题 -->
      <div class="table-title">{{ route.meta.title }}</div>
      <!-- 操作按钮 -->
      <el-row :gutter="10" style="margin-bottom: 8px">
        <el-col :span="1.5">
          <el-button icon="plus" size="default" type="primary" @click="handleAdd()">
            新建页面
          </el-button>
        </el-col>
        <right-toolbar v-model:showSearch="showSearch" @query-table="refreshList" />
      </el-row>
      <!-- 空状态 -->
      <el-empty v-if="!tableData" description="暂无页面" />
      <!-- 页面列表 -->
      <el-row v-loading="loading" :gutter="12" class="album-container">
        <el-col v-for="item in tableData" :key="item.id" :md="6">
          <div class="album-item" @click="handleEdit(item)">
            <!-- 页面操作 -->
            <div class="album-operation">
              <el-dropdown>
                <el-icon style="color: #fff; cursor: pointer">
                  <MoreFilled />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item icon="edit" @click="handleEdit(item)">编辑</el-dropdown-item>
                    <el-dropdown-item icon="delete" @click="handleDelete(item)">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <el-image :src="item.page_cover" class="album-cover" fit="cover" />
            <div class="album-name">{{ item.page_name }}</div>
          </div>
        </el-col>
      </el-row>
      <!-- 分页 -->
      <el-pagination
        class="pagination-container"
        v-model:current-page="queryParams.page"
        v-model:page-size="queryParams.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        hide-on-single-page
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 新增模态框 -->
    <el-dialog v-model="addModalVisible" top="10vh" width="35%">
      <template #header>
        <div class="dialog-title-container">
          {{ dialogTitle }}
        </div>
      </template>
      <el-form
        ref="addFormRef"
        :model="addFormData"
        :rules="addFormRules"
        label-width="80px"
        size="default"
      >
        <el-form-item label="页面名称" prop="page_name">
          <el-input v-model="addFormData.page_name" />
        </el-form-item>
        <el-form-item label="页面标签" prop="page_label">
          <el-input v-model="addFormData.page_label" />
        </el-form-item>
        <el-form-item label="上传封面" prop="page_cover">
          <el-radio-group v-model="uploadType">
            <el-radio value="upload">上传文件</el-radio>
            <el-radio value="select">选择文件</el-radio>
            <el-radio value="input">填写链接</el-radio>
          </el-radio-group>
        </el-form-item>
        <option-image-upload v-model="addFormData.page_cover" :upload-type="uploadType" />
      </el-form>
      <template #footer>
        <el-button @click="addFormCancel">取 消</el-button>
        <el-button type="primary" @click="addFormSubmit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import RightToolbar from "@/components/RightToolbar/index.vue";
import "@/styles/table.scss";
import { PageAPI } from "@/api/page.ts";
import type { PageBackVO, PageNewReq, PageQueryReq } from "@/api/types.ts";
import OptionImageUpload from "@/components/Upload/OptionImageUpload.vue";

const route = useRoute();
const router = useRouter();

const loading = ref(false);

const showSearch = ref(false);
const queryParams = ref<PageQueryReq>({
  page: 1,
  page_size: 10,
});
const tableData = ref<PageBackVO[]>([]);
const total = ref(0);

const handleSizeChange = (size: number) => {
  queryParams.value.page_size = size;
  refreshList();
};
const handleCurrentChange = (current: number) => {
  queryParams.value.page = current;
  refreshList();
};

function refreshList() {
  PageAPI.findPageListApi(queryParams.value).then((res) => {
    tableData.value = res.data.list;
    total.value = res.data.total;
  });
}

function resetSearch() {
  queryParams.value = {
    page: 1,
    page_size: 10,
  };
}

onMounted(() => {
  refreshList();
});

const initFormData = <PageNewReq>{
  id: 0,
  page_name: "",
  page_label: "",
  page_cover: "",
};

const uploadType = ref("upload");

const dialogTitle = computed(() => {
  if (addFormData.id == 0) {
    return "添加页面";
  } else {
    return "编辑页面";
  }
});

const addModalVisible = ref(false);
const addFormRef = ref<FormInstance>();
const addFormRules = reactive<FormRules<PageNewReq>>({
  page_name: [{ required: true, message: "请输入页面名称", trigger: "blur" }],
  page_label: [{ required: true, message: "请输入页面标签", trigger: "blur" }],
  page_cover: [{ required: true, message: "请上传页面封面", trigger: "blur" }],
});
const addFormData = reactive<PageNewReq>({ ...initFormData });

function addFormSubmit() {
  addFormRef.value?.validate((valid: boolean) => {
    console.log("addFormSubmit", valid);
    if (valid) {
      let data = { ...addFormData };
      if (data.id == 0) {
        PageAPI.addPageApi(data).then((res) => {
          addModalVisible.value = false;
          ElMessage.success("创建成功");
          refreshList();
        });
      } else {
        PageAPI.updatePageApi(data).then((res) => {
          addModalVisible.value = false;
          ElMessage.success("编辑成功");
          refreshList();
        });
      }
    }
  });
}

function addFormCancel() {
  addModalVisible.value = false;
}

function handleAdd() {
  Object.assign(addFormData, initFormData);
  addModalVisible.value = true;
}

function handleEdit(data?: PageBackVO) {
  Object.assign(addFormData, data);
  addModalVisible.value = true;
}

function handleDelete(data?: PageBackVO) {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    PageAPI.deletePageApi({ id: data.id })
      .then((res) => {
        ElMessage.success("删除成功");
        refreshList();
      })
      .catch((error) => {
        ElMessage.error("删除失败: " + error.message);
      });
  });
}
</script>

<style scoped>
.upload-cover {
  width: 100%;
}

.album-cover {
  position: relative;
  width: 100%;
  height: 170px;
  border-radius: 4px;
}

.album-cover::before {
  position: absolute;
  inset: 0;
  content: "";
}

.album-photo-count {
  position: absolute;
  right: 0;
  bottom: 2.6rem;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  font-size: 1.5rem;
  color: #fff;
}

.album-name {
  margin-top: 0.5rem;
  text-align: center;
}

.album-item {
  position: relative;
  margin-bottom: 1rem;
  cursor: pointer;
}

.album-operation {
  position: absolute;
  top: 0.5rem;
  right: 0.8rem;
  z-index: 1000;
}
</style>
