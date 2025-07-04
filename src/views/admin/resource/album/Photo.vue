<template>
  <div class="app-container">
    <el-card class="main-card">
      <!-- 标题 -->
      <div class="table-title">{{ route.meta.title }}</div>
      <!-- 相册信息 -->
      <el-row :gutter="12" style="margin-bottom: 15px">
        <el-col :span="1.5">
          <el-image fit="cover" class="album-cover" :src="albumInfo.album_cover" />
        </el-col>
        <el-col :span="12">
          <el-row align="bottom">
            <span class="album-name">{{ albumInfo.album_name }}</span>
            <span class="photo-count">{{ albumInfo.photo_count }}张</span>
          </el-row>
          <el-row class="album-desc">{{ albumInfo.album_desc }}</el-row>
          <el-row class="select-count">已选择{{ selectPhotoIdList.length }}张</el-row>
        </el-col>
      </el-row>
      <!-- 操作按钮 -->
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="1.5">
          <el-button type="primary" plain icon="Upload" @click="upload = true">上传</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="Promotion"
            :disabled="selectPhotoIdList.length == 0"
            @click="handleMove"
          >
            移动
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

        <right-toolbar :search="false" @query-table="getList"></right-toolbar>
      </el-row>
      <!-- 空状态 -->
      <el-empty
        v-if="photoList?.length === 0"
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
        v-model:current-page="queryParams.page"
        v-model:page-size="queryParams.page_size"
        class="pagination-container"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 修改对话框 -->
    <el-dialog v-model="update" title="修改照片" width="550px" append-to-body>
      <el-form ref="photoFormRef" label-width="100px" :model="photoForm" :rules="rules">
        <el-form-item label="照片名称" prop="photo_name">
          <el-input
            v-model="photoForm.photo_name"
            placeholder="请输入照片名称"
            style="width: 250px"
          />
        </el-form-item>
        <el-form-item label="照片描述" prop="photo_desc">
          <el-input
            v-model="photoForm.photo_desc"
            placeholder="请输入照片描述"
            style="width: 250px"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="update = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 上传对话框 -->
    <el-dialog v-model="upload" title="上传照片" width="60%" append-to-body>
      <multi-image-upload
        v-model:file-list="uploadList"
        list-type="picture-card"
        :show-file-list="true"
        upload-path="blog/photo/"
      />
      <template #footer>
        <div class="dialog-footer">
          <div>共上传{{ uploadList?.length }}张照片</div>
          <div>
            <el-button type="primary" :disabled="uploadList.length == 0" @click="handleAdd">
              确 定
            </el-button>
            <el-button @click="upload = false">取 消</el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules, UploadUserFile } from "element-plus";
import { onMounted, reactive, ref, toRefs, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AlbumAPI } from "@/api/album.ts";
import { PhotoAPI } from "@/api/photo.ts";
import type { AlbumBackVO, PhotoBackVO, PhotoNewReq, PhotoQuery } from "@/api/types.ts";
import "@/styles/table.scss";
import RightToolbar from "@/components/RightToolbar/index.vue";

const photoFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  photo_name: [{ required: true, message: "请输入照片名称", trigger: "blur" }],
});

const data = reactive({
  count: 0,
  loading: false,
  upload: false,
  update: false,
  checkAll: false,
  isIndeterminate: false,
  queryParams: {
    page: 1,
    page_size: 10,
    total: 10,
  } as PhotoQuery,
  photoForm: {} as PhotoNewReq,
  photoIdList: [] as number[],
  selectPhotoIdList: [] as number[],
  photoList: [] as PhotoBackVO[],
  albumInfo: {} as AlbumBackVO,
  uploadList: [] as UploadUserFile[],
});
const {
  count,
  loading,
  upload,
  update,
  checkAll,
  isIndeterminate,
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
const handleCommand = (photo: PhotoBackVO) => {
  photoFormRef.value?.resetFields();
  photoForm.value = photo;
  update.value = true;
};

const handleMove = () => {
  ElMessage.warning("该功能暂未实现");
};

const handleDelete = () => {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      PhotoAPI.preDeletePhotoApi({
        ids: selectPhotoIdList.value,
        is_delete: 1,
      }).then((res) => {
        getList();
        selectPhotoIdList.value = [];
        isIndeterminate.value = false;
      });
    })
    .catch(() => {});
};
const handleAdd = () => {
  if (uploadList.value.length > 0) {
    uploadList.value.forEach((item) => {
      // photoUrlList.push(item.url);
      let data: PhotoNewReq = {
        album_id: albumId,
        photo_name: "",
        photo_desc: "",
        photo_src: item.url,
        is_delete: 0,
      };

      PhotoAPI.addPhotoApi(data).then((res) => {
        ElMessage.success("添加照片成功");
        uploadList.value = [];
        getList();
        upload.value = false;
      });
    });
  }
};
const submitForm = () => {
  photoFormRef.value?.validate((valid) => {
    if (valid) {
      PhotoAPI.updatePhotoApi(photoForm.value).then((res) => {
        if (res.flag) {
          ElMessage.success(res.msg);
          getList();
        }
        update.value = false;
      });
    }
  });
};
const getList = () => {
  loading.value = true;
  const data: PhotoQuery = {
    page: queryParams.value.page,
    page_size: queryParams.value.page_size,
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

const route = useRoute();
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
