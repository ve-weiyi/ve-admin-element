<template>
  <div class="app-container">
    <!-- 列表 -->
    <template v-if="isA">
      <!-- 列表 -->
      <page-content
        ref="contentRef"
        :content-config="contentConfig"
        @export-click="handleExportClick"
        @search-click="handleSearchClick"
        @toolbar-click="handleToolbarClick"
        @operat-click="handleOperatClick"
        @filter-change="handleFilterChange"
      >
        <template #table-header>
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
          <img
            v-if="scope.row.file_type === ''"
            src="@/assets/dir.png"
            class="article-cover"
            style="cursor: pointer"
            @click="handleOpen(scope.row)"
          />
          <el-image v-else class="article-cover" :src="scope.row.file_url" fit="cover" />
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
    </template>

    <!-- 新建文件夹对话框 -->
    <el-dialog title="新建文件夹" v-model="folderModalVisible" width="500px" append-to-body>
      <el-form
        ref="folderFormRef"
        label-width="100px"
        :model="folderFormData"
        :rules="folderFormRules"
      >
        <el-form-item label="文件夹路径" prop="file_path">
          <el-input disabled v-model="folderFormData.file_path" style="width: 250px" />
        </el-form-item>
        <el-form-item label="文件夹名称" prop="file_name">
          <el-input
            placeholder="请输入文件夹名称"
            v-model="folderFormData.file_name"
            style="width: 250px"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitFolderForm">确 定</el-button>
          <el-button @click="cancelFolderForm">取 消</el-button>
        </div>
      </template>
    </el-dialog>
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
            <file-upload
              class="w-full"
              v-model="importFormData.files"
              :drag="true"
              :limit="10"
              :auto-upload="false"
              tip="支持多个文件"
            />
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
  </div>
</template>

<script setup lang="ts">
import type { IOperatData, ISelectedData } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import contentConfig from "./config/content";
import PageContent from "@/components/CURD/PageContent.vue";
import FileUpload from "@/components/Upload/FileUpload.vue";

import { ref } from "vue";
import {
  type FormInstance,
  type FormRules,
  type UploadInstance,
  type UploadUserFile,
} from "element-plus";
import { multipleUploadFile } from "@/utils/file";
import type { FileBackDTO, FileFolderNewReq } from "@/api/types";
import { FileAPI } from "@/api/file";

const {
  contentRef,
  handleQueryClick,
  handleResetClick,
  // handleAddClick,
  // handleEditClick,
  handleSubmitClick,
  handleExportClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

// 其他工具栏
function handleToolbarClick(data: ISelectedData) {
  console.log(data.name);
  switch (data.name) {
    case "addFolder":
      folderFormData.file_path = filePath.value;
      folderModalVisible.value = true;
      break;
    case "addFile":
      importFormData.file_path = filePath.value;
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
const isA = ref(true);

const folderModalVisible = ref(false);
const folderFormRef = ref<FormInstance>();
const folderFormRules = reactive<FormRules>({
  file_name: [{ required: true, message: "请输入文件夹名称", trigger: "blur" }],
});
const folderFormData = reactive<FileFolderNewReq>({
  file_path: "",
  file_name: "",
});

function submitFolderForm() {
  folderFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      console.log(folderFormData);
      FileAPI.addFileFolderApi(folderFormData).then((res) => {
        fetchPageData();
        folderModalVisible.value = false;
        ElMessage.success("新建文件夹成功");
      });
    }
  });
}

function cancelFolderForm() {
  folderModalVisible.value = false;
}

// 导入表单

const uploadRef = ref<UploadInstance>();
const importModalVisible = ref(false);
const importFormRef = ref<FormInstance>();
const importFormData = reactive<{
  files: UploadUserFile[];
  file_path: string;
}>({
  files: [],
  file_path: "",
});
const importFormRules: FormRules = {
  files: [{ required: true, message: "请选择文件" }],
};

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
  multipleUploadFile(
    importFormData.files.map((file) => {
      return file.raw;
    }),
    importFormData.file_path
  ).then((res) => {
    console.log(res);
    fetchPageData();
    handleCloseImportModal();
    ElMessage.success("文件上传成功");
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

function fetchPageData() {
  const queryParams = {
    file_path: filePath.value,
  };
  contentRef.value.fetchPageData(queryParams);
}

const handleOpen = (row: FileBackDTO) => {
  console.log("open dir->", row);
  router.push({
    query: {
      filePath: `${row.file_path === "/" ? "" : row.file_path}/${row.file_name}`,
    },
  });
};

watch(
  () => filePath.value,
  () => {
    fetchPageData();
  }
);

onMounted(() => {
  fetchPageData();
});
</script>
<style scoped>
.article-cover {
  position: relative;
  width: 80%;
  height: 80%;
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
