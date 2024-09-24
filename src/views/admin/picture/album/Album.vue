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
          <el-button
            icon="delete"
            size="default"
            style="margin-right: 1rem"
            text
            type="primary"
            @click="checkDelete"
          >
            回收站
          </el-button>
        </el-col>
        <right-toolbar v-model:showSearch="showSearch" @query-table="refreshList" />
      </el-row>
      <!-- 空状态 -->
      <el-empty v-if="!tableData" description="暂无相册" />
      <!-- 相册列表 -->
      <el-row v-loading="loading" :gutter="12" class="album-container">
        <el-col v-for="item in tableData" :key="item.id" :md="6">
          <div class="album-item" @click="checkPhoto(item)">
            <!-- 相册操作 -->
            <div class="album-operation">
              <el-dropdown>
                <el-icon style="color: #fff; cursor: pointer">
                  <MoreFilled />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item icon="edit" @click="handleAdd(item)">编辑</el-dropdown-item>
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
    <el-dialog v-model="addModalVisible" top="10vh" width="35%">
      <template #header>
        <div class="dialog-title-container">
          {{ dialogTitle }}
        </div>
      </template>
      <el-form ref="formRef" :model="formData" label-width="80px" size="default">
        <el-form-item label="相册名称">
          <el-input v-model="formData.album_name" style="width: 360px" />
        </el-form-item>
        <el-form-item label="相册描述">
          <el-input v-model="formData.album_desc" style="width: 360px" />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="isUpload">
            <el-radio :label="true">上传文件</el-radio>
            <el-radio :label="false">填写链接</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="相册封面" style="width: 360px">
          <single-image-upload
            v-if="isUpload"
            v-model="formData.album_cover"
            accept="image/*"
            upload-path="/album"
            height="180px"
            width="360px"
          />
          <el-input v-else v-model="formData.album_cover" placeholder="请输入图片链接" />
        </el-form-item>
        <el-form-item label="发布形式">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="2">私密</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="cancelSave">取 消</el-button>
        <el-button type="primary" @click="confirmSave">确 定</el-button>
      </template>
    </el-dialog>
    <!-- 删除对话框 -->
    <el-dialog v-model="deleteModalVisible" width="30%">
      <template #header>
        <div class="dialog-title-container">
          <el-icon style="color: #f90">
            <Warning />
          </el-icon>
          提示
        </div>
      </template>
      <div style="font-size: 1rem">是否删除该相册？</div>
      <template #footer>
        <el-button @click="cancelDelete">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import RightToolbar from "@/components/RightToolbar/index.vue";
import SingleImageUpload from "@/components/Upload/SingleImageUpload.vue";
import "@/styles/table.scss";
import { AlbumAPI } from "@/api/album";
import type { AlbumBackDTO, AlbumNewReq, AlbumQuery } from "@/api/types";

const route = useRoute();
const router = useRouter();

const loading = ref(false);

const showSearch = ref(false);
const queryParams = ref<AlbumQuery>({
  page: 1,
  page_size: 10,
});
const tableData = ref<AlbumBackDTO[]>([]);
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

const addModalVisible = ref(false);
const formData = ref<AlbumNewReq>({ ...initFormData });
const isUpload = ref(true);

const deleteModalVisible = ref(false);
const deleteId = ref(0);

const dialogTitle = computed(() => {
  if (formData.value.id == 0) {
    return "添加相册";
  } else {
    return "编辑相册";
  }
});

function handleAdd(data?: AlbumBackDTO) {
  if (data) {
    formData.value = data;
  } else {
    formData.value = { ...initFormData };
  }
  isUpload.value = true;
  addModalVisible.value = true;
}

function confirmSave() {
  let data = formData.value;
  console.log("confirmSave", data);
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

function cancelSave() {
  addModalVisible.value = false;
}

function handleDelete(data?: AlbumBackDTO) {
  deleteId.value = data.id;
  deleteModalVisible.value = true;
}

function confirmDelete() {
  console.log("confirmDelete", deleteId.value);
  AlbumAPI.deleteAlbumApi({ id: deleteId.value }).then((res) => {
    deleteModalVisible.value = false;
    ElMessage.success("删除成功");
    refreshList();
  });
}

function cancelDelete() {
  deleteModalVisible.value = false;
}

const checkDelete = () => {
  router.push({ path: "/picture/photo/delete" });
};

const checkPhoto = (item) => {
  router.push({ path: "/picture/albums/" + item.id });
};
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
