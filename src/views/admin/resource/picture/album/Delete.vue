<template>
  <div class="app-container">
    <el-card class="main-card">
      <!-- 标题 -->
      <div class="table-title">{{ route.meta.title }}</div>

      <!-- 操作按钮 -->
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="Promotion"
            :disabled="selectPhotoIdList.length == 0"
          >
            批量恢复
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="Delete"
            :disabled="selectPhotoIdList.length == 0"
            @click="handleDelete"
          >
            批量删除
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
        </el-col>
        <right-toolbar :search="false" @query-table="getList" />
      </el-row>
      <!-- 空状态 -->
      <el-empty
        v-if="photoList.length === 0"
        style="width: 100%; height: 500px"
        description="暂无照片"
      />
      <!-- 照片列表 -->
      <el-checkbox-group
        v-model="selectPhotoIdList"
        style="min-height: 500px"
        @change="handleCheckedPhotoChange"
      >
        <el-row class="picture-list" :gutter="10">
          <el-col
            v-for="photo of photoList"
            :key="photo.id"
            :xs="12"
            :sm="6"
            :lg="4"
            style="margin-bottom: 1rem"
          >
            <el-checkbox :value="photo.id">
              <template #default>
                <div class="photo-item">
                  <div class="photo-operation">
                    <el-dropdown @command="handleCommand">
                      <el-icon style="color: #fff">
                        <MoreFilled />
                      </el-icon>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item :command="photo">编辑</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                  <el-image
                    class="photo-cover"
                    fit="cover"
                    :src="photo.photo_src"
                    :preview-src-list="[photo.photo_src]"
                  />
                  <div class="photo-name">{{ photo.photo_name }}</div>
                </div>
              </template>
            </el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
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
      <!-- 图片预览 -->
      <el-dialog v-model="dialogVisible" append-to-body>
        <img :src="dialogImageUrl" style="max-width: 100%" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, UploadFile, UploadUserFile } from "element-plus";
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import { AlbumAPI } from "@/api/album.ts";
import { PhotoAPI } from "@/api/photo.ts";
import type { AlbumBackDTO, PhotoBackDTO, PhotoNewReq, PhotoQuery } from "@/api/types.ts";
import "@/styles/table.scss";
import RightToolbar from "@/components/RightToolbar/index.vue";

const photoFormRef = ref<FormInstance>();

const route = useRoute();
const data = reactive({
  count: 0,
  loading: false,
  upload: false,
  update: false,
  checkAll: false,
  isIndeterminate: false,
  dialogImageUrl: "",
  dialogVisible: false,
  queryParams: {
    page: 1,
    page_size: 10,
    total: 10,
  } as PhotoQuery,
  photoForm: {} as PhotoNewReq,
  photoIdList: [] as number[],
  selectPhotoIdList: [] as number[],
  photoList: [] as PhotoBackDTO[],
  albumInfo: {} as AlbumBackDTO,
  uploadList: [] as UploadUserFile[],
});
const {
  count,
  loading,
  upload,
  update,
  checkAll,
  isIndeterminate,
  dialogImageUrl,
  dialogVisible,
  queryParams,
  photoForm,
  photoIdList,
  selectPhotoIdList,
  photoList,
  albumInfo,
  uploadList,
} = toRefs(data);
watch(
  () => photoList.value,
  (newValue) => {
    photoIdList.value = [];
    if (newValue && newValue.length > 0) {
      newValue.forEach((item) => {
        photoIdList.value.push(item.id);
      });
    }
  }
);
const handleSizeChange = (size: number) => {
  queryParams.value.page_size = size;
  getList();
};
const handleCurrentChange = (current: number) => {
  queryParams.value.page = current;
  getList();
};
const handleCheckAllChange = (val: boolean) => {
  selectPhotoIdList.value = val ? photoIdList.value : [];
  isIndeterminate.value = false;
};
const handleCheckedPhotoChange = (value: number[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === photoIdList.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < photoIdList.value.length;
};
const handleCommand = (photo: PhotoBackDTO) => {
  photoFormRef.value?.resetFields();
  photoForm.value = photo;
  update.value = true;
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};
const handleMove = () => {};
const handleDelete = () => {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      PhotoAPI.batchDeletePhotoApi({ ids: selectPhotoIdList.value }).then((res) => {
        if (res.flag) {
          ElMessage.success(res.message);
          getList();
          selectPhotoIdList.value = [];
          isIndeterminate.value = false;
        }
      });
    })
    .catch(() => {});
};

const getList = () => {
  loading.value = true;
  const data: PhotoQuery = {
    page: 1,
    page_size: 10,
    album_id: albumId,
  };

  PhotoAPI.findPhotoListApi(data).then((res) => {
    photoList.value = res.data.list;
    count.value = res.data.total;
    loading.value = false;
  });
};

function getAlbumInfo(id: number) {
  AlbumAPI.getAlbumApi({
    id,
  }).then((res) => {
    console.log("getAlbumInfo", res);
    albumInfo.value = res.data;
    document.title = `${albumInfo.value.album_name} - 相册`;
  });
}

const albumId = route.params.id ? parseInt(route.params.id as string) : 0; // 假设路由参数名
onMounted(() => {
  getAlbumInfo(albumId);
  getList();
});
</script>

<style lang="scss" scoped>
.album-cover {
  border-radius: 4px;
  width: 5rem;
  height: 5rem;
}

.album-name {
  font-size: 1.25rem;
}

.photo-count {
  font-size: 13px;
  margin: 0 0 0.1rem 0.5rem;
}

.album-desc {
  font-size: 15px;
  margin-top: 0.4rem;
}

.select-count {
  font-size: 13px;
  margin-top: 0.4rem;
}

.photo-item {
  position: relative;
  width: 100%;
  cursor: pointer;

  margin-bottom: 1rem;

  .photo-operation {
    position: absolute;
    top: 0.3rem;
    right: 0.5rem;
    z-index: 9;
  }

  .photo-cover {
    width: 100%;
    height: 7rem;
    border-radius: 4px;
  }

  .photo-name {
    font-size: 14px;
    margin-top: 0.3rem;
    text-align: center;
  }
}

.upload-container {
  min-height: 400px;
  max-height: 600px;
  overflow: auto;

  .upload {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.picture-list {
  :deep(.el-checkbox) {
    display: inline-block !important;
  }

  :deep(.el-checkbox__input) {
    position: absolute !important;
    top: 0.3rem;
    left: 0.8rem;
  }
}
</style>
