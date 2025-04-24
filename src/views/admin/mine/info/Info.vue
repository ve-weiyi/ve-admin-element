<template>
  <el-card>
    <!-- 头像和昵称部分 -->
    <div class="relative w-100px h-100px flex-center">
      <AvatarCropper :src="userProfile.avatar" :fixed-number="[1, 1]" @on-confirm="confirmUpload" />
    </div>
    <div class="mt-5">
      {{ userProfile.nickname }}
      <el-icon class="align-middle cursor-pointer" @click="handleOpenDialog(DialogType.ACCOUNT)">
        <Edit />
      </el-icon>
    </div>
    <!-- 用户信息描述 -->
    <el-descriptions :column="1" class="mt-10">
      <!-- 用户名 -->
      <el-descriptions-item>
        <template #label>
          <el-icon class="align-middle">
            <User />
          </el-icon>
          用户名
        </template>
        {{ userProfile.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon class="align-middle">
            <Phone />
          </el-icon>
          手机号码
        </template>
        {{ userProfile.phone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon class="align-middle">
            <Message />
          </el-icon>
          邮箱
        </template>
        {{ userProfile.email }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <el-icon class="align-middle">
            <Message />
          </el-icon>
          个人简介
        </template>
        {{ userProfile.intro }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <el-icon class="align-middle">
            <Message />
          </el-icon>
          个人网站
        </template>
        {{ userProfile.website }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <SvgIcon icon-class="role" />
          角色
        </template>
        {{ userProfile.roles }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <el-icon class="align-middle">
            <Timer />
          </el-icon>
          创建日期
        </template>
        {{ userProfile.created_at }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>

  <!-- 弹窗 -->
  <el-dialog :title="dialog.title" v-model="dialog.visible" :width="500" append-to-body>
    <!-- 账号资料 -->
    <el-form
      v-if="dialog.type === DialogType.ACCOUNT"
      :model="userProfileForm"
      ref="userProfileFormRef"
      :label-width="100"
    >
      <el-form-item label="昵称">
        <el-input v-model="userProfileForm.nickname" />
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
      userProfileForm.id = userProfile.value.user_id;
      userProfileForm.nickname = userProfile.value.nickname;
      userProfileForm.gender = userProfile.value.intro;
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

<style lang="scss" scoped></style>
