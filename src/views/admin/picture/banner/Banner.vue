<template>
  <div class="app-container">
    <el-card v-show="showSearch" shadow="never" class="mb-[10px]">
      <!-- 搜索栏 -->
      <el-form :inline="true">
        <el-form-item label="页面名称">
          <el-input
            v-model="queryParams.banner_name"
            style="width: 200px"
            placeholder="请输入页面名称"
            clearable
            @keyup.enter="refreshList"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="refreshList">
            搜索
          </el-button>
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
          <el-button
            icon="plus"
            size="default"
            type="primary"
            @click="handleAdd()"
          >
            新建页面
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
        <right-toolbar
          v-model:showSearch="showSearch"
          @query-table="refreshList"
        />
      </el-row>
      <!-- 空状态 -->
      <el-empty v-if="!tableData" description="暂无页面" />
      <!-- 页面列表 -->
      <el-row v-loading="loading" :gutter="12" class="album-container">
        <el-col v-for="item in tableData" :key="item.id" :md="6">
          <div class="album-item" @click="checkPhoto(item)">
            <!-- 页面操作 -->
            <div class="album-operation">
              <el-dropdown>
                <el-icon style="color: #fff; cursor: pointer">
                  <MoreFilled />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item icon="edit" @click="handleAdd(item)">
                      编辑
                    </el-dropdown-item>
                    <el-dropdown-item icon="delete" @click="handleDelete(item)">
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <el-image
              :src="item.banner_cover"
              class="album-cover"
              fit="cover"
            />
            <div class="album-name">{{ item.banner_name }}</div>
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
        ref="formRef"
        :model="formData"
        label-width="80px"
        size="default"
      >
        <el-form-item label="页面名称">
          <el-input v-model="formData.banner_name" style="width: 300px" />
        </el-form-item>
        <el-form-item label="页面标签">
          <el-input v-model="formData.banner_label" style="width: 360px" />
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="isUpload">
            <el-radio :label="true">上传文件</el-radio>
            <el-radio :label="false">填写链接</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="页面封面" style="width: 360px">
          <el-upload
            v-if="isUpload"
            :before-upload="beforeUpload"
            :http-request="onUpload"
            :on-success="afterUpload"
            :show-file-list="false"
            class="upload-cover"
            drag
            multiple
          >
            <i v-if="!formData.banner_cover" class="el-icon-upload"></i>
            <div v-if="!formData.banner_cover" class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <el-image
              v-else
              :src="formData.banner_cover"
              class="page-cover"
              fit="cover"
              height="180px"
              width="360px"
            />
          </el-upload>
          <el-input
            v-else
            v-model="formData.banner_cover"
            placeholder="请输入图片链接"
          />
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
      <div style="font-size: 1rem">是否删除该页面？</div>
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
import { ElMessage, UploadRawFile, UploadRequestOptions } from "element-plus";
import RightToolbar from "@/components/RightToolbar/index.vue";
import "@/styles/table.scss";
import {
  addBannerApi,
  deleteBannerApi,
  findBannerListApi,
  updateBannerApi,
} from "@/api/banner.ts";
import { BannerBackDTO, BannerNewReq, BannerQuery } from "@/api/types.ts";
import { compressImage, uploadFile } from "@/utils/file.ts";

const route = useRoute();
const router = useRouter();

const loading = ref(false);

const showSearch = ref(false);
const queryParams = ref<BannerQuery>({
  page: 1,
  page_size: 10,
});
const tableData = ref<BannerBackDTO[]>([]);
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
  findBannerListApi(queryParams.value).then((res) => {
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

const initFormData = <BannerNewReq>{
  id: 0,
  banner_name: "",
  banner_label: "",
  banner_cover: "",
};

const addModalVisible = ref(false);
const formData = ref<BannerNewReq>({ ...initFormData });
const isUpload = ref(true);

const deleteModalVisible = ref(false);
const deleteId = ref(0);

const dialogTitle = computed(() => {
  if (formData.value.id == 0) {
    return "添加页面";
  } else {
    return "编辑页面";
  }
});

function handleAdd(data?: BannerBackDTO) {
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
    addBannerApi(data).then((res) => {
      addModalVisible.value = false;
      ElMessage.success("创建成功");
      refreshList();
    });
  } else {
    updateBannerApi(data).then((res) => {
      addModalVisible.value = false;
      ElMessage.success("编辑成功");
      refreshList();
    });
  }
}

function cancelSave() {
  addModalVisible.value = false;
}

function handleDelete(data?: BannerBackDTO) {
  deleteId.value = data.id;
  deleteModalVisible.value = true;
}

function confirmDelete() {
  console.log("confirmDelete", deleteId.value);
  deleteBannerApi({ id: deleteId.value }).then((res) => {
    deleteModalVisible.value = false;
    ElMessage.success("删除成功");
    refreshList();
  });
}

function cancelDelete() {
  deleteModalVisible.value = false;
}

// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
function beforeUpload(rawFile: UploadRawFile) {
  console.log("beforeUpload", rawFile.name, rawFile.size);

  if (rawFile.size / 1024 < 500) {
    return true;
  }

  return compressImage(rawFile);
}

function onUpload(options: UploadRequestOptions) {
  console.log("onUpload", options.filename);
  return uploadFile(options.file, "/album");
}

function afterUpload(res: any) {
  console.log("afterUpload", res);
  formData.value.banner_cover = res.data.file_url;
}

const checkDelete = () => {
  router.push({ path: "/picture/photo/delete" });
};

const checkPhoto = (item) => {
  router.push({ path: "/picture/albums/" + item.id });
};
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
