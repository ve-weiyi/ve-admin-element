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
          <el-button type="primary" icon="Search" @click="refreshList">
            搜索
          </el-button>
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
            @click="addFormVisibility = true"
          >
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
        <right-toolbar
          v-model:showSearch="showSearch"
          @query-table="refreshList"
        />
      </el-row>
      <!-- 空状态 -->
      <el-empty v-if="!tableData" description="暂无相册" />
      <!-- 相册列表 -->
      <el-row v-loading="loading" :gutter="12" class="album-container">
        <el-col v-for="item in tableData" :key="item.id" :md="6">
          <div class="album-item" @click="checkPhoto(item)">
            <!-- 相册操作 -->
            <div class="album-operation">
              <el-dropdown @command="(cmd) => handleCommand(cmd, item)">
                <el-icon>
                  <MoreFilled />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item icon="edit" :command="'update'">
                      编辑
                    </el-dropdown-item>
                    <el-dropdown-item icon="delete" :command="'delete'">
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
        :total="count"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 新增模态框 -->
    <el-dialog v-model="addFormVisibility" top="10vh" width="35%">
      <template #header>
        <div class="dialog-title-container">
          <el-icon>
            <MoreFilled />
          </el-icon>
          {{ dialogTitle }}
        </div>
      </template>
      <el-form
        ref="formRef"
        :model="formData"
        label-width="80px"
        size="default"
      >
        <el-form-item label="相册名称">
          <el-input v-model="formData.album_name" style="width: 220px" />
        </el-form-item>
        <el-form-item label="相册描述">
          <el-input v-model="formData.album_desc" style="width: 220px" />
        </el-form-item>
        <el-form-item label="相册封面">
          <el-upload
            :before-upload="beforeUpload"
            :http-request="onUpload"
            :on-success="afterUpload"
            :show-file-list="false"
            class="upload-cover"
            drag
            multiple
          >
            <i v-if="!formData.album_cover" class="el-icon-upload"></i>
            <div v-if="!formData.album_cover" class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <img
              v-else
              :src="formData.album_cover"
              height="180px"
              width="100%"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="发布形式">
          <el-radio-group v-model="formData.status">
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="2">私密</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addFormVisibility = false">取 消</el-button>
        <el-button type="primary" @click="confirmSave">确 定</el-button>
      </template>
    </el-dialog>
    <!-- 删除对话框 -->
    <el-dialog v-model="batchDeleteVisibility" width="30%">
      <template #header>
        <div class="dialog-title-container">
          <el-icon style="color: #ff9900">
            <Warning />
          </el-icon>
          提示
        </div>
      </template>
      <div style="font-size: 1rem">是否删除该相册？</div>
      <template #footer>
        <el-button @click="batchDeleteVisibility = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, UploadRawFile, UploadRequestOptions } from "element-plus";
import "@/styles/table.scss";
import {
  addAlbumApi,
  deleteAlbumApi,
  findAlbumListApi,
  updateAlbumApi,
} from "@/api/album.ts";
import { AlbumNewReq, AlbumQuery } from "@/api/types.ts";
import { compressImage, uploadFile } from "@/utils/file.ts";
import RightToolbar from "@/components/RightToolbar/index.vue";

const route = useRoute();
const router = useRouter();

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
  return uploadFile(options.file, "photo");
}

function afterUpload(res: any) {
  console.log("afterUpload", res);
  formData.value.album_cover = res.data.file_url;
}

const data = reactive({
  loading: false,
  deleteId: 0,
  batchDeleteVisibility: false,
  addFormVisibility: false,
  count: 0,
  showSearch: false,
  queryParams: {
    current: 1,
    size: 18,
  } as AlbumQuery,
  tableData: [],
  formData: {
    id: 0,
    album_name: "",
    album_desc: "",
    album_cover: "",
    status: 1,
  } as AlbumNewReq,
});

const {
  loading,
  deleteId,
  batchDeleteVisibility,
  addFormVisibility,
  count,
  showSearch,
  queryParams,
  tableData,
  formData,
} = toRefs(data);

const handleSizeChange = (size: number) => {
  queryParams.value.page_size = size;
  refreshList();
};
const handleCurrentChange = (current: number) => {
  queryParams.value.page = current;
  refreshList();
};

function refreshList() {
  findAlbumListApi({}).then((res) => {
    tableData.value = res.data.list;
    count.value = res.data.total;
  });
}

onMounted(() => {
  refreshList();
});

const dialogTitle = computed(() => {
  if (formData.value.id == 0) {
    return "添加相册";
  } else {
    return "编辑相册";
  }
});

const checkDelete = () => {
  router.push({ path: "/picture/photo/delete" });
};

const checkPhoto = (item) => {
  router.push({ path: "/picture/albums/" + item.id });
};

const handleAdd = () => {
  formData.value = {
    id: 0,
    album_name: "",
    album_desc: "",
    album_cover: "",
    status: 1,
    is_delete: 0,
  };
  addFormVisibility.value = true;
};

const handleCommand = (command: string, data: AlbumNewReq) => {
  console.log("handleCommand", command, data);
  if (command.includes("update")) {
    formData.value = data;
    addFormVisibility.value = true;
  } else if (command.includes("delete")) {
    deleteId.value = data.id;
    batchDeleteVisibility.value = true;
  }
};

function confirmSave() {
  let data = formData.value;
  console.log("confirmSave", data);
  if (data.id == 0) {
    addAlbumApi(data).then((res) => {
      addFormVisibility.value = false;
      ElMessage.success("创建成功");
      refreshList();
    });
  } else {
    updateAlbumApi(data).then((res) => {
      batchDeleteVisibility.value = false;
      ElMessage.success("编辑成功");
      refreshList();
    });
  }
}

function confirmDelete() {
  console.log("confirmDelete", deleteId.value);
  deleteAlbumApi({ id: deleteId.value }).then((res) => {
    batchDeleteVisibility.value = false;
    ElMessage.success("删除成功");
    refreshList();
  });
}
</script>

<style scoped>
.album-cover {
  position: relative;
  border-radius: 4px;
  width: 100%;
  height: 170px;
}

.album-cover::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.album-photo-count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  z-index: 1000;
  position: absolute;
  left: 0;
  right: 0;
  padding: 0 0.5rem;
  bottom: 2.6rem;
  color: #fff;
}

.album-name {
  text-align: center;
  margin-top: 0.5rem;
}

.album-item {
  position: relative;
  cursor: pointer;
  margin-bottom: 1rem;
}

.album-operation {
  position: absolute;
  z-index: 1000;
  top: 0.5rem;
  right: 0.8rem;
}
</style>
