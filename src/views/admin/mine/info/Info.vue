<template>
  <el-card class="info-card">
    <template #header>
      <div class="card-header">
        <span>账号信息</span>
      </div>
    </template>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="用户名">
        {{ userProfile.username }}
        <el-icon v-if="userProfile.gender === 0" class="gender-icon male">
          <Loading />
        </el-icon>
        <el-icon v-else-if="userProfile.gender === 1" class="gender-icon male">
          <Male />
        </el-icon>
        <el-icon v-else class="gender-icon female">
          <Female />
        </el-icon>
      </el-descriptions-item>
      <el-descriptions-item label="手机号码">
        {{ userProfile.phone || "未绑定" }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">
        {{ userProfile.email || "未绑定" }}
      </el-descriptions-item>
      <el-descriptions-item label="个人介绍">
        {{ userProfile.intro }}
      </el-descriptions-item>
      <el-descriptions-item label="个人网站">
        {{ userProfile.website }}
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ userProfile.created_at }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>

  <!-- 弹窗 -->
  <el-dialog :title="dialog.title" v-model="dialog.visible" :width="500" append-to-body>
    <!-- 账号资料 -->
    <el-form
      v-if="dialog.type === DialogType.ACCOUNT"
      ref="userProfileFormRef"
      :model="userProfileForm"
      :label-width="100"
    >
      <el-form-item label="昵称">
        <el-input v-model="userProfileForm.nickname" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="userProfileForm.gender">
          <el-option label="保密" :value="0" />
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="userProfileForm.intro" />
      </el-form-item>
      <el-form-item label="个人网站">
        <el-input v-model="userProfileForm.website" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { UserInfoResp } from "@/api/types";
import { UserAPI } from "@/api/user";
import { useUserStore } from "@/store";
import AvatarCropper from "@/components/AvatarCropper/index.vue";
import { ElMessage } from "element-plus";
import { uploadFile } from "@/utils/file";
import { Female, Loading, Male } from "@element-plus/icons-vue";

const userProfile = ref<UserInfoResp>(useUserStore().userInfo);
const userProfileForm = reactive<any>({});

enum DialogType {
  ACCOUNT = "account",
  PASSWORD = "password",
  MOBILE = "mobile",
  EMAIL = "email",
}

const dialog = reactive({
  visible: false,
  title: "",
  type: "" as DialogType, // 修改账号资料,修改密码、绑定手机、绑定邮箱
});

/**
 * 打开弹窗
 * @param type 弹窗类型 ACCOUNT: 账号资料 PASSWORD: 修改密码 MOBILE: 绑定手机 EMAIL: 绑定邮箱
 */
const handleOpenDialog = (type: DialogType) => {
  dialog.type = type;
  dialog.visible = true;
  switch (type) {
    case DialogType.ACCOUNT:
      dialog.title = "账号资料";
      // 初始化表单数据
      userProfileForm.nickname = userProfile.value.nickname;
      userProfileForm.gender = userProfile.value.gender;
      userProfileForm.intro = userProfile.value.intro;
      userProfileForm.website = userProfile.value.website;
      break;
    case DialogType.PASSWORD:
      dialog.title = "修改密码";
      break;
    case DialogType.MOBILE:
      dialog.title = "绑定手机";
      break;
    case DialogType.EMAIL:
      dialog.title = "绑定邮箱";
      break;
  }
};

/**
 * 提交表单
 */
const handleSubmit = async () => {
  UserAPI.getUserInfoApi(userProfileForm).then(() => {
    ElMessage.success("账号资料修改成功");
    dialog.visible = false;
    loadUserProfile();
  });
};

function confirmUpload(file: Blob) {
  uploadFile(file, "avatar").then((response) => {
    console.log("confirmUpload", response);
    ElMessage.success(response.message);
    userProfile.value.avatar = response.data.file_url;
    UserAPI.updateUserInfoApi(userProfile.value);
  });
}

/** 加载用户信息 */
const loadUserProfile = async () => {
  const data = await UserAPI.getUserInfoApi();
  userProfile.value = data.data;
};

onMounted(async () => {});
</script>

<style lang="scss" scoped>
.info-card {
  margin-bottom: 20px;

  .card-header {
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}
</style>
