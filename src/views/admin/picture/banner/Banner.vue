<template>
  <div class="app-container">
    <el-card class="main-card">
      <div class="table-title">{{ route.meta.title }}</div>
      <!-- 操作按钮 -->
      <el-row :gutter="10" style="margin-bottom: 8px">
        <el-col :span="1.5">
          <el-button
            icon="plus"
            size="default"
            type="primary"
            @click="openModel(null)"
          >
            新建页面
          </el-button>
        </el-col>
        <right-toolbar :search="false" @query-table="listPages()" />
      </el-row>

      <el-empty v-if="pageList.length == 0" description="暂无页面" />
      <el-row v-loading="loading" v-if="pageList.length > 0" :gutter="12">
        <el-col v-for="item of pageList" :key="item.id" :md="6">
          <div class="page-item">
            <div class="page-operation">
              <!-- 操作 -->
              <el-dropdown trigger="click" @command="handleCommand">
                <el-icon style="color: #fff; cursor: pointer">
                  <MoreFilled />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      :command="'update' + JSON.stringify(item)"
                    >
                      <el-icon>
                        <Edit />
                      </el-icon>
                      编辑
                    </el-dropdown-item>
                    <el-dropdown-item :command="'delete' + item.id">
                      <el-icon>
                        <Delete />
                      </el-icon>
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <el-image :src="item.banner_cover" class="page-cover" fit="cover" />
            <div class="page-name">{{ item.banner_name }}</div>
          </div>
        </el-col>
      </el-row>
      <el-dialog v-model="addOrEdit" top="10vh" width="35%">
        <template #header>
          <div class="dialog-title-container">{{ pageTitle }}</div>
        </template>
        <el-form :model="pageForum" label-width="80px" size="default">
          <el-form-item label="页面名称">
            <el-input v-model="pageForum.banner_name" style="width: 220px" />
          </el-form-item>
          <el-form-item label="页面标签">
            <el-input v-model="pageForum.banner_label" style="width: 220px" />
          </el-form-item>
          <el-form-item label="页面封面">
            <el-upload
              :before-upload="beforeUpload"
              :http-request="onUpload"
              :on-success="afterUpload"
              :show-file-list="false"
              class="upload-cover"
              drag
              multiple
            >
              <i v-if="pageForum.banner_cover == ''" class="el-icon-upload" />
              <div v-if="pageForum.banner_cover == ''" class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <el-image
                v-else
                :src="pageForum.banner_cover"
                class="page-cover"
                fit="cover"
                height="180px"
                width="360px"
              />
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="addOrEdit = false">取 消</el-button>
          <el-button type="primary" @click="addOrEditPage">确 定</el-button>
        </template>
      </el-dialog>
      <el-dialog v-model="isdeletePage" width="30%">
        <template #header>
          <div class="dialog-title-container">
            <el-icon style="color: #ff9900">
              <WarningFilled />
            </el-icon>
            提示
          </div>
        </template>
        <div style="font-size: 1rem">是否删除该页面？</div>
        <template #footer>
          <el-button @click="isdeletePage = false">取 消</el-button>
          <el-button type="primary" @click="deletePage">确 定</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { compressImage, uploadFile } from "@/utils/file.ts";
import axios from "axios";
import {
  ElMessage,
  ElNotification,
  UploadRawFile,
  UploadRequestOptions,
} from "element-plus";
import "@/styles/table.scss";
import { BannerBackDTO } from "@/api/types";
import { findBannerListApi } from "@/api/banner.ts";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const keywords = ref("");
const loading = ref(true);
const current = ref(1);
const size = ref(8);
const count = ref(0);
const isdeletePage = ref(false);
const addOrEdit = ref(false);
const pageForum = reactive({
  id: 0,
  banner_name: "",
  banner_label: "",
  banner_cover: "",
});
const pageList = ref<BannerBackDTO[]>([]);
const pageTitle = ref();

const openModel = (item) => {
  if (item) {
    console.log(item);
    Object.assign(pageForum, JSON.parse(item));
    pageTitle.value = "修改页面";
  } else {
    Object.assign(pageForum, {
      id: null,
      banner_name: "",
      banner_label: "",
      banner_cover: "",
    });
    pageTitle.value = "新建页面";
  }
  addOrEdit.value = true;
};

const listPages = () => {
  findBannerListApi({}).then((res) => {
    pageList.value = res.data.list || [];
    loading.value = false;
  });
};

const addOrEditPage = () => {
  if (pageForum.banner_name.trim() == "") {
    ElMessage.error("页面名称不能为空");
    return false;
  }
  if (pageForum.banner_label.trim() == "") {
    ElMessage.error("页面标签不能为空");
    return false;
  }
  if (pageForum.banner_cover == null) {
    ElMessage.error("页面封面不能为空");
    return false;
  }
  findBannerListApi({}).then((res) => {
    pageList.value = res.data.list;
  });
  addOrEdit.value = false;
};

// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
function beforeUpload(rawFile: UploadRawFile) {
  console.log("beforeUpload", rawFile.name, rawFile.size);

  if (rawFile.size / 1024 < 500) {
    return true;
  }

  return compressImage(rawFile);
}

function onUpload(options: UploadRequestOptions) {
  return uploadFile(options.file, "/page");
}

const afterUpload = (response) => {
  pageForum.banner_cover = response.data.file_url;
};

const handleCommand = (command) => {
  console.log("command", command);
  const type = command.substring(0, 6);
  const data = command.substring(6);
  if (type == "delete") {
    pageForum.id = data;
    isdeletePage.value = true;
  } else {
    console.log(data);
    openModel(data);
  }
};

const deletePage = () => {
  axios.delete("/api/admin/pages/" + pageForum.id).then(({ data }) => {
    if (data.logic) {
      ElNotification.success({
        title: "成功",
        message: data.message,
      });
      listPages();
    } else {
      ElNotification.error({
        title: "失败",
        message: data.message,
      });
    }
    isdeletePage.value = false;
  });
};

onMounted(() => {
  listPages();
});
</script>

<style scoped>
.page-cover {
  position: relative;
  border-radius: 4px;
  width: 100%;
  height: 170px;
}

.page-name {
  text-align: center;
  margin-top: 0.5rem;
}

.page-item {
  position: relative;
  cursor: pointer;
  margin-bottom: 1rem;
}

.page-operation {
  position: absolute;
  z-index: 1000;
  top: 0.5rem;
  right: 0.8rem;
}
</style>
