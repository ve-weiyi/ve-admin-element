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
        <template #icon="scope">
          <img
            src="@/assets/dir.png"
            style="width: 30px; cursor: pointer"
            @click="onClickDir"
          />
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
    </template>
    <template v-else>
      <!-- 搜索 -->
      <page-search
        ref="searchRef2"
        :search-config="searchConfig2"
        @query-click="handleQueryClick"
        @reset-click="handleResetClick"
      />
      <page-content
        ref="contentRef2"
        :content-config="contentConfig2"
        @add-click="handleAddClick"
        @edit-click="handleEditClick"
        @export-click="handleExportClick"
        @search-click="handleSearchClick"
        @toolbar-click="handleToolbarClick"
        @operat-click="handleOperatClick"
        @filter-change="handleFilterChange"
      >
        <template #table-top>
          <!-- 面包屑 -->
          <div class="breadcrumb-container">
            <div class="position">当前位置：</div>
            <el-breadcrumb class="breadcrumb" separator-icon="ArrowRight">
              <el-breadcrumb-item
                v-for="(item, index) in breadcrumbList"
                :key="index"
                :to="{ query: { filePath: item.path } }"
              >
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </template>
        <template #icon="scope">
          <el-image
            style="width: 100%; height: 100%"
            :src="scope.row.file_url"
            fit="cover"
          />
        </template>
        <template #file_name="scope">
          <el-link type="primary" :href="scope.row.file_url" target="_blank">
            {{ scope.row.file_name }}
          </el-link>
        </template>
        <template #file_size="scope">
          {{ calculateFileSize(scope.row.file_size) }}
        </template>
      </page-content>

      <!-- 导入弹窗 -->
      <el-dialog
        v-model="importModalVisible"
        :align-center="true"
        title="导入数据"
        width="600px"
        style="padding-right: 0"
        @close="handleCloseImportModal"
      >
        <!-- 滚动 -->
        <el-scrollbar max-height="60vh">
          <!-- 表单 -->
          <el-form
            ref="importFormRef"
            label-width="auto"
            style="padding-right: var(--el-dialog-padding-primary)"
            :model="importFormData"
            :rules="importFormRules"
          >
            <el-form-item label="文件名" prop="files">
              <el-upload
                class="w-full"
                ref="uploadRef"
                v-model:file-list="importFormData.files"
                accept=""
                multiple
                :drag="true"
                :limit="10"
                :auto-upload="false"
                :on-exceed="handleFileExceed"
              >
                <el-icon class="el-icon--upload">
                  <upload-filled />
                </el-icon>
                <div class="el-upload__text">
                  <span>将文件拖到此处，或</span>
                  <em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">支持多个文件</div>
                </template>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-scrollbar>
        <!-- 弹窗底部操作按钮 -->
        <template #footer>
          <div style="padding-right: var(--el-dialog-padding-primary)">
            <el-button
              type="primary"
              :disabled="importFormData.files.length === 0"
              @click="handleImportSubmit"
            >
              确 定
            </el-button>
            <el-button @click="handleCloseImportModal">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  IObject,
  IOperatData,
  ISelectedData,
  type PageContentInstance,
  type PageModalInstance,
  type PageSearchInstance,
} from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import addModalConfig from "./config/add";
import contentConfig from "./config/content";
import editModalConfig from "./config/edit";
import searchConfig from "./config/search";
import PageSearch from "@/components/CURD/PageSearch.vue";
import PageModal from "@/components/CURD/PageModal.vue";
import PageContent from "@/components/CURD/PageContent.vue";

import contentConfig2 from "./config2/content";
import searchConfig2 from "./config2/search";
import { ref } from "vue";
import {
  genFileId,
  type FormInstance,
  type FormRules,
  type UploadInstance,
  type UploadRawFile,
  type UploadUserFile,
} from "element-plus";
import { compressImage, multipleUploadFile } from "@/utils/file.ts";
import { FileFolderBackDTO } from "@/api/types.ts";

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

const searchRef2 = ref<PageSearchInstance>();
const contentRef2 = ref<PageContentInstance>();

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
  switch (data.name) {
    case "addFolder":
      addModalRef.value?.setModalVisible();
      break;
    case "addFile":
      importModalVisible.value = true;
      break;
    case "return":
      isA.value = true;
      break;
    default:
      break;
  }
}

// 其他操作列
function handleOperatClick(data: IOperatData) {
  console.log(data);
  // 重置密码
}

// 切换示例
const isA = ref(false);

function onClickDir() {
  isA.value = !isA.value;

}

// 导入表单
let isFileImport = false;
const uploadRef = ref<UploadInstance>();
const importModalVisible = ref(false);
const importFormRef = ref<FormInstance>();
const importFormData = reactive<{
  files: UploadUserFile[];
}>({
  files: [],
});
const importFormRules: FormRules = {
  files: [{ required: true, message: "请选择文件" }],
};

// 覆盖前一个文件
function handleFileExceed(files: File[]) {
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
}

// 导入确认
const handleImportSubmit = useThrottleFn(() => {
  importFormRef.value?.validate((valid: boolean) => {
    handleImport();
  });
}, 3000);

// 关闭导入弹窗
function handleCloseImportModal() {
  importModalVisible.value = false;
  importFormRef.value?.resetFields();
  nextTick(() => {
    importFormRef.value?.clearValidate();
  });
}

// 文件导入
async function handleImport() {
  const res = await Promise.all(
    importFormData.files.map((file) => {
      return new Promise((rev, rej) => {
        compressImage(file.raw)
          .then((blob) => rev(blob))
          .catch((error) => rej(error));
      });
    })
  );

  multipleUploadFile(res as Blob[], "files").then((res) => {
    console.log(res);
  });
}

const calculateFileSize = (size: number, isInteger = false) => {
  const B = 1024;
  const KB = Math.pow(1024, 2);
  const MB = Math.pow(1024, 3);
  const GB = Math.pow(1024, 4);
  if (isInteger) {
    // 截取为整数
    if (size < B) {
      return `${size}B`;
    } else if (size < KB) {
      return `${(size / B).toFixed(0)}KB`;
    } else if (size < MB) {
      return `${(size / KB).toFixed(0)}MB`;
    } else if (size < GB) {
      return `${(size / MB).toFixed(0)}GB`;
    } else {
      return `${(size / GB).toFixed(0)}TB`;
    }
  } else {
    // 保留小数位
    if (size < B) {
      return `${size}B`;
    } else if (size < KB) {
      return `${(size / B).toFixed(0)}KB`;
    } else if (size < MB) {
      return `${(size / KB).toFixed(1)}MB`;
    } else if (size < GB) {
      return `${(size / MB).toFixed(2)}GB`;
    } else {
      return `${(size / GB).toFixed(3)}TB`;
    }
  }
};
const handleOpen = (row: FileFolderBackDTO) => {
  router.push({
    query: {
      filePath: `${row.file_path === '/' ? '' : row.file_path}/${row.folder_name}`,
    }
  })
};

const router = useRouter();
const route = useRoute();
const filePath = computed(() => {
  let filePath = route.query.filePath as string;
  return filePath ? filePath : "/";
});
const breadcrumbList = computed(() => {
  let filePath = route.query.filePath as string;
  let filePathList = filePath ? filePath.split("/") : [];
  let res = [];
  let _path = [];
  for (let i = 0; i < filePathList.length; i++) {
    if (filePathList[i]) {
      _path.push(filePathList[i]);
      res.push({
        path: _path.join("/"),
        name: filePathList[i],
      });
    } else if (i === 0) {
      filePathList[i] = "";
      _path.push(filePathList[i]);
      res.push({
        path: "/",
        name: "全部文件",
      });
    }
  }
  return res;
});
</script>
<style scoped>
.article-cover {
  position: relative;
  width: 100%;
  border-radius: 4px;
}

.position {
  height: 30px;
  line-height: 30px;
}

.breadcrumb-container {
  display: flex;
  height: 30px;
  line-height: 30px;
}

.breadcrumb {
  display: flex;
  flex: auto;
  padding-left: 8px;
}
</style>
