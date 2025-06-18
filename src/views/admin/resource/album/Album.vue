<template>
  <div class="app-container">
    <el-card v-show="showSearch" shadow="never" class="mb-[10px]">
      <!-- 搜索栏 -->
      <el-form :inline="true">
        <el-form-item label="相册名称">
          <el-input
            v-model="queryParams.album_name"
            style="width: 200px"
            placeholder="请输入相册名称"
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
    <el-card class="main-card">
      <!-- 标题 -->
      <div class="table-title">{{ route.meta.title }}</div>
      <!-- 操作按钮 -->
      <el-row :gutter="10" style="margin-bottom: 8px">
        <el-col :span="1.5">
          <el-button icon="plus" size="default" type="primary" @click="handleAdd()">
            新建相册
          </el-button>
        </el-col>
        <right-toolbar v-model:showSearch="showSearch" @query-table="refreshList">
          <el-button
            icon="delete"
            size="default"
            style="margin-right: 1rem"
            text
            type="primary"
            @click="routeToDelete"
          >
            回收站
          </el-button>
        </right-toolbar>
      </el-row>
      <!-- 空状态 -->
      <el-empty v-if="!tableData" description="暂无相册" />
      <!-- 相册列表 -->
      <el-row v-loading="loading" :gutter="12" class="album-container">
        <el-col v-for="item in tableData" :key="item.id" :md="6">
          <div class="album-item" @click="routeToPhoto(item)">
            <!-- 相册操作 -->
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
            <div class="album-photo-count">
              <div>{{ item.photo_count }}</div>
              <el-icon v-if="item.status === 2">
                <Lock />
              </el-icon>
            </div>
            <el-image :src="item.album_cover" class="album-cover" fit="cover" />
            <div class="album-name">{{ item.album_name }}</div>
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
    <el-dialog v-model="addModalVisible" width="35%">
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
        <el-form-item label="相册名称" prop="album_name">
          <el-input v-model="addFormData.album_name" />
        </el-form-item>
        <el-form-item label="相册描述" prop="album_desc">
          <el-input v-model="addFormData.album_desc" />
        </el-form-item>
        <el-form-item label="相册封面" prop="album_cover">
          <el-radio-group v-model="isUpload">
            <el-radio :value="true">上传文件</el-radio>
            <el-radio :value="false">填写链接</el-radio>
          </el-radio-group>
        </el-form-item>
        <div>
          <single-image-upload
            v-if="isUpload"
            v-model="addFormData.album_cover"
            accept="image/*"
            upload-path="blog/album/"
          />
          <el-input v-else v-model="addFormData.album_cover" placeholder="请输入图片链接" />
        </div>
        <el-form-item label="发布形式" prop="status">
          <el-radio-group v-model="addFormData.status">
            <el-radio :value="1">公开</el-radio>
            <el-radio :value="2">私密</el-radio>
          </el-radio-group>
        </el-form-item>
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
import SingleImageUpload from "@/components/Upload/SingleImageUpload.vue";
import "@/styles/table.scss";
import { AlbumAPI } from "@/api/album.ts";
import type { AlbumBackVO, AlbumNewReq, AlbumQuery } from "@/api/types.ts";

const loading = ref(false);

const showSearch = ref(false);
const queryParams = ref<AlbumQuery>({
  page: 1,
  page_size: 10,
});
const tableData = ref<AlbumBackVO[]>([]);
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
  AlbumAPI.findAlbumListApi(queryParams.value).then((res) => {
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

const initFormData = <AlbumNewReq>{
  id: 0,
  album_name: "",
  album_desc: "",
  album_cover: "",
  status: 1,
  is_delete: 0,
};

const isUpload = ref(true);

const dialogTitle = computed(() => {
  if (addFormData.id == 0) {
    return "添加相册";
  } else {
    return "编辑相册";
  }
});

const addModalVisible = ref(false);
const addFormRef = ref<FormInstance>();
const addFormRules = reactive<FormRules<AlbumNewReq>>({
  album_name: [{ required: true, message: "请输入相册名称", trigger: "blur" }],
  album_desc: [{ required: true, message: "请输入相册描述", trigger: "blur" }],
  album_cover: [{ required: true, message: "请上传相册封面", trigger: "blur" }],
  status: [{ required: true, message: "请选择发布形式", trigger: "change" }],
});
const addFormData = reactive<AlbumNewReq>({ ...initFormData });

function addFormSubmit() {
  addFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      const data = { ...addFormData };
      if (data.id == 0) {
        AlbumAPI.addAlbumApi(data).then((res) => {
          addModalVisible.value = false;
          ElMessage.success("创建成功");
          refreshList();
        });
      } else {
        AlbumAPI.updateAlbumApi(data).then((res) => {
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

const route = useRoute();
const router = useRouter();
const routeToPhoto = (item) => {
  router.push({ path: "/resource/albums/" + item.id });
};
const routeToDelete = () => {
  router.push({ path: `/resource/photo/delete` });
};

function handleAdd() {
  Object.assign(addFormData, initFormData);
  isUpload.value = true;
  addModalVisible.value = true;
}

function handleEdit(data?: AlbumBackVO) {
  Object.assign(addFormData, data);
  isUpload.value = true;
  addModalVisible.value = true;
}

function handleDelete(data?: AlbumBackVO) {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      console.log("confirmDelete", data);
      AlbumAPI.preDeleteAlbumApi({
        ids: [data.id],
        is_delete: 1,
      })
        .then((res) => {
          ElMessage.success("删除成功");
          refreshList();
        })
        .catch((error) => {
          ElMessage.error("删除失败: " + error.message);
        });
    })
    .catch(() => {});
}
</script>

<style scoped>
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
  background: rgb(0 0 0 / 20%);
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
