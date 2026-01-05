<template>
  <div class="profile-container">
    <el-row :gutter="20">
      <!-- 左侧个人信息卡片 -->
      <el-col :span="8">
        <el-card class="user-card">
          <div class="user-info">
            <div class="avatar-wrapper">
              <el-avatar :src="userProfile.avatar" :size="100" />
              <el-button
                type="info"
                class="avatar-edit-btn"
                circle
                :icon="Camera"
                size="small"
                @click="triggerFileUpload"
              />
              <input ref="fileInput" type="file" style="display: none" @change="handleFileChange" />
            </div>
            <div class="user-name">
              <span class="nickname">{{ userProfile.nickname }}</span>
              <el-icon class="edit-icon" @click="handleOpenDialog(DialogType.ACCOUNT)">
                <Edit />
              </el-icon>
            </div>
            <div class="user-role">{{ userProfile.roles }}</div>
          </div>
          <el-divider />
          <div class="user-stats">
            <div class="stat-item">
              <div class="stat-value">0</div>
              <div class="stat-label">待办</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">0</div>
              <div class="stat-label">消息</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">0</div>
              <div class="stat-label">通知</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 右侧信息卡片 -->
      <el-col :span="16">
        <!-- 账号信息 -->
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
        <!-- 安全设置 -->
        <el-card class="security-card">
          <template #header>
            <div class="card-header">
              <span>安全设置</span>
            </div>
          </template>
          <!-- 账户密码 -->
          <div class="security-item">
            <div class="security-info">
              <div class="security-title">账户密码</div>
              <div class="security-desc">定期修改密码有助于保护账户安全</div>
            </div>
            <el-button type="primary" link @click="() => handleOpenDialog(DialogType.PASSWORD)">
              修改
            </el-button>
          </div>
          <!-- 绑定手机 -->
          <div class="security-item">
            <div class="security-info">
              <div class="security-title">绑定手机</div>
              <div class="security-desc">
                <span v-if="userProfile.phone">已绑定手机号：{{ userProfile.phone }}</span>
                <span v-else>未绑定手机</span>
              </div>
            </div>
            <el-button type="primary" link @click="() => handleOpenDialog(DialogType.MOBILE)">
              修改
            </el-button>
          </div>
          <!-- 绑定邮箱 -->
          <div class="security-item">
            <div class="security-info">
              <div class="security-title">绑定邮箱</div>
              <div class="security-desc">
                <span v-if="userProfile.email">已绑定邮箱：{{ userProfile.email }}</span>
                <span v-else>未绑定邮箱</span>
              </div>
            </div>
            <el-button type="primary" link @click="() => handleOpenDialog(DialogType.EMAIL)">
              修改
            </el-button>
          </div>
          <!-- 绑定第三方账号 -->
          <div>
            <div class="security-title">绑定第三方账号</div>
            <p class="tip-text">
              使用以下任一方式都可以登录到您的
              <strong>blog</strong>
              帐号
            </p>

            <!-- 响应式表格容器 -->
            <el-table :data="userProfile.third_party" label-width="auto" border>
              <el-table-column prop="index" label="序号" width="60" align="center">
                <template #default="{ $index }">{{ $index + 1 }}</template>
              </el-table-column>
              <el-table-column
                prop="platform"
                label="平台"
                width="100"
                align="center"
                show-overflow-tooltip
              />
              <el-table-column
                prop="account"
                label="详情"
                width="150"
                align="center"
                show-overflow-tooltip
              >
                <template #default="{ row }">
                  <div class="flex justify-center">
                    <el-avatar :src="row.avatar" :size="24" />
                    <span class="ml-2">{{ row.nickname }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="created_at" label="绑定时间" width="200" align="center">
                <template #default="{ row }">
                  {{ formatDateTime(row.created_at) }}
                </template>
              </el-table-column>
              <el-table-column label="状态" width="100" align="center">
                <template #default><span class="status-active">● 使用中</span></template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center" fixed="right">
                <template #default="{ row }">
                  <el-button type="danger" link border @click="handleUnbindAccount(row.platform)">
                    解除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="bind-more">
              <p class="bind-title">可绑定的第三方账号</p>
              <div class="platform-list">
                <div v-for="item in availablePlatforms" class="platform-tag">
                  <div
                    text-32px
                    cursor-pointer
                    :class="item.icon"
                    @click="handleBindAccount(item.platform)"
                  />
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-card>
        <!-- 登录历史 -->
        <el-card class="info-card">
          <template #header>
            <div class="card-header">
              <span>登录历史</span>
            </div>
          </template>
          <!-- Element 虚拟表格-->
          <el-auto-resizer>
            <template #default="{ _, width }">
              <el-table-v2
                :columns="loginHistoryColumns"
                :data="tableData"
                :width="width"
                :height="600"
                :fixed="true"
              >
                <template #empty>
                  <div class="flex items-center justify-center h-100%">
                    <el-empty />
                  </div>
                </template>
              </el-table-v2>
            </template>
          </el-auto-resizer>
        </el-card>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" :width="500">
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

      <!-- 修改密码 -->
      <el-form
        v-if="dialog.type === DialogType.PASSWORD"
        ref="passwordChangeFormRef"
        :model="passwordChangeForm"
        :rules="passwordChangeRules"
        :label-width="100"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passwordChangeForm.old_password" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordChangeForm.new_password" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordChangeForm.confirm_password" type="password" show-password />
        </el-form-item>
      </el-form>

      <!-- 绑定手机 -->
      <el-form
        v-else-if="dialog.type === DialogType.MOBILE"
        ref="mobileBindingFormRef"
        :model="mobileUpdateForm"
        :rules="mobileBindingRules"
        :label-width="100"
      >
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="mobileUpdateForm.phone" style="width: 250px" />
        </el-form-item>
        <el-form-item label="验证码" prop="verify_code">
          <el-input v-model="mobileUpdateForm.verify_code" style="width: 250px">
            <template #append>
              <el-button :disabled="mobileCountdown > 0" @click="handleSendMobileCode">
                {{ mobileCountdown > 0 ? `${mobileCountdown}s后重新发送` : "发送验证码" }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <!-- 绑定邮箱 -->
      <el-form
        v-else-if="dialog.type === DialogType.EMAIL"
        ref="emailBindingFormRef"
        :model="emailUpdateForm"
        :rules="emailBindingRules"
        :label-width="100"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="emailUpdateForm.email" style="width: 250px" />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="emailUpdateForm.verify_code" style="width: 250px">
            <template #append>
              <el-button :disabled="emailCountdown > 0" @click="handleSendEmailCode">
                {{ emailCountdown > 0 ? `${emailCountdown}s后重新发送` : "发送验证码" }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.visible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { Camera, Edit, Female, Loading, Male } from "@element-plus/icons-vue";
import {
  UpdateUserPasswordReq,
  UpdateUserInfoReq,
  UserInfoResp,
  UpdateUserBindEmailReq,
  UpdateUserBindPhoneReq,
} from "@/api/types.ts";
import { UserAPI } from "@/api/user.ts";
import { AuthAPI } from "@/api/auth.ts";
import { loginHistoryColumns } from "./columns.tsx";
import { thirdPlatformList } from "@/utils/third.ts";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { formatDateTime } from "@/utils/date.ts";
import { uploadFile } from "@/utils/file.ts";

const userProfile = ref<UserInfoResp>(<UserInfoResp>{});

const enum DialogType {
  ACCOUNT = "account",
  PASSWORD = "password",
  MOBILE = "mobile",
  EMAIL = "email",
  GITHUB = "github",
  GITEE = "gitee",
}

const dialog = reactive({
  visible: false,
  title: "",
  type: "" as DialogType, // 修改账号资料,修改密码、绑定手机、绑定邮箱
});

const userProfileForm = reactive<UpdateUserInfoReq>(<UpdateUserInfoReq>{});
const passwordChangeForm = reactive<UpdateUserPasswordReq>(<UpdateUserPasswordReq>{});
const mobileUpdateForm = reactive<UpdateUserBindPhoneReq>(<UpdateUserBindPhoneReq>{});
const emailUpdateForm = reactive<UpdateUserBindEmailReq>(<UpdateUserBindEmailReq>{});

const mobileCountdown = ref(0);
const mobileTimer = ref();

const emailCountdown = ref(0);
const emailTimer = ref();

// 修改密码校验规则
const passwordChangeRules = {
  oldPassword: [{ required: true, message: "请输入原密码", trigger: "blur" }],
  newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
  confirmPassword: [{ required: true, message: "请再次输入新密码", trigger: "blur" }],
};

// 手机号校验规则
const mobileBindingRules = {
  mobile: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: "blur",
    },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

// 邮箱校验规则
const emailBindingRules = {
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
      message: "请输入正确的邮箱地址",
      trigger: "blur",
    },
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
};

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
    case DialogType.GITHUB:
      dialog.title = "绑定第三方账号";
      break;
  }
};

/**
 * 发送手机验证码
 */
function handleSendMobileCode() {
  if (!mobileUpdateForm.phone) {
    ElMessage.error("请输入手机号");
    return;
  }
  // 验证手机号格式
  const reg = /^1[3-9]\d{9}$/;
  if (!reg.test(mobileUpdateForm.phone)) {
    ElMessage.error("手机号格式不正确");
    return;
  }
  // 发送短信验证码
  AuthAPI.sendPhoneVerifyCodeApi({
    phone: mobileUpdateForm.phone,
    type: "bind_phone",
  }).then(() => {
    ElMessage.success("验证码发送成功");

    // 倒计时 60s 重新发送
    mobileCountdown.value = 60;
    mobileTimer.value = setInterval(() => {
      if (mobileCountdown.value > 0) {
        mobileCountdown.value -= 1;
      } else {
        clearInterval(mobileTimer.value!);
      }
    }, 1000);
  });
}

/**
 * 发送邮箱验证码
 */
function handleSendEmailCode() {
  if (!emailUpdateForm.email) {
    ElMessage.error("请输入邮箱");
    return;
  }
  // 验证邮箱格式
  const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  if (!reg.test(emailUpdateForm.email)) {
    ElMessage.error("邮箱格式不正确");
    return;
  }

  // 发送邮箱验证码
  AuthAPI.sendEmailVerifyCodeApi({
    email: emailUpdateForm.email,
    type: "bind_email",
  }).then(() => {
    ElMessage.success("验证码发送成功");
    // 倒计时 60s 重新发送
    emailCountdown.value = 60;
    emailTimer.value = setInterval(() => {
      if (emailCountdown.value > 0) {
        emailCountdown.value -= 1;
      } else {
        clearInterval(emailTimer.value!);
      }
    }, 1000);
  });
}

/**
 * 提交表单
 */
const handleSubmit = async () => {
  if (dialog.type === DialogType.ACCOUNT) {
    UserAPI.updateUserInfoApi(userProfileForm).then(() => {
      ElMessage.success("账号资料修改成功");
      dialog.visible = false;
      loadUserProfile();
    });
  } else if (dialog.type === DialogType.PASSWORD) {
    if (passwordChangeForm.new_password !== passwordChangeForm.confirm_password) {
      ElMessage.error("两次输入的密码不一致");
      return;
    }
    UserAPI.updateUserPasswordApi(passwordChangeForm).then(() => {
      ElMessage.success("密码修改成功");
      dialog.visible = false;
    });
  } else if (dialog.type === DialogType.MOBILE) {
    UserAPI.updateUserBindPhoneApi(mobileUpdateForm).then(() => {
      ElMessage.success("手机号绑定成功");
      dialog.visible = false;
      loadUserProfile();
    });
  } else if (dialog.type === DialogType.EMAIL) {
    UserAPI.updateUserBindEmailApi(emailUpdateForm).then(() => {
      ElMessage.success("邮箱绑定成功");
      dialog.visible = false;
      loadUserProfile();
    });
  }
};

const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  if (file) {
    // 调用文件上传API
    try {
      uploadFile(file, "blog/avatar/").then((res) => {
        // 更新用户头像
        userProfile.value.avatar = res.data.file_url;
        // 更新用户信息
        UserAPI.updateUserAvatarApi({
          avatar: res.data.file_url,
        }).then(() => {
          ElMessage.success("头像上传成功");
        });
      });
    } catch (error) {
      ElMessage.error("头像上传失败" + error);
    }
  }
};

/** 加载用户信息 */
const loadUserProfile = async () => {
  const res = await UserAPI.getUserInfoApi();
  userProfile.value = res.data;
};

onMounted(async () => {
  if (mobileTimer.value) {
    clearInterval(mobileTimer.value);
  }
  if (emailTimer.value) {
    clearInterval(emailTimer.value);
  }
  await loadUserProfile();
});

const loading = ref<boolean>(false);
const tableData = ref<any[]>([]);

const getHistory = async () => {
  loading.value = true;
  UserAPI.getUserLoginHistoryListApi({})
    .then((response) => {
      tableData.value = response.data.list || [];
    })
    .catch((e) => {})
    .finally(() => {
      loading.value = false;
    });
};
onMounted(async () => {
  await getHistory();
});

const route = useRoute();

const availablePlatforms = computed(() => {
  return thirdPlatformList?.filter((platform) => {
    return !userProfile.value.third_party?.some((item) => item.platform === platform.platform);
  });
});

const handleUnbindAccount = (platform: string) => {
  console.log("解除绑定:", platform);
  // 这里添加解除绑定逻辑
  ElMessageBox.confirm(
    `解绑后无法使用第三方账号 <strong>${platform}</strong> 登录`,
    `确定要解除绑定吗？`,
    {
      type: "warning",
      dangerouslyUseHTMLString: true,
    }
  )
    .then(() => {
      UserAPI.deleteUserBindThirdPartyApi({
        platform: platform,
      })
        .then(() => {
          ElMessage.success("解除绑定成功");
          loadUserProfile();
        })
        .catch((error) => {
          ElMessage.error("解除绑定失败，请稍后重试");
        });
    })
    .catch(() => {
      // 取消操作
    });
};

const handleBindAccount = (platform: string) => {
  console.log("绑定平台:", platform);
  // 这里添加绑定逻辑
  const state = route.query.redirect as string;
  AuthAPI.getOauthAuthorizeUrlApi({
    platform: platform,
    state: "bind_account",
  })
    .then((res) => {
      if (res.data?.authorize_url) {
        // 跳转到授权页面
        let url = res.data.authorize_url;
        console.log("第三方登录平台:", platform, state, url);
        window.open(url, "_self");
      } else {
        ElMessage.error("获取授权地址失败");
      }
    })
    .catch((error) => {
      ElMessage.error("第三方登录失败，请稍后重试");
    });
};
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: calc(100vh - 84px);
  padding: 20px;
  background: var(--el-fill-color-blank);
}

.user-card {
  .user-info {
    padding: 20px 0;
    text-align: center;

    .avatar-wrapper {
      position: relative;
      display: inline-block;
      margin-bottom: 16px;

      .avatar-edit-btn {
        position: absolute;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(0, 0, 0, 0.7);
        }
      }
    }

    .user-name {
      margin-bottom: 8px;

      .nickname {
        font-size: 18px;
        font-weight: 600;
        color: var(--el-text-color-primary);
      }

      .edit-icon {
        margin-left: 8px;
        color: var(--el-text-color-secondary);
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          color: var(--el-color-primary);
        }
      }
    }

    .user-role {
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }

  .user-stats {
    display: flex;
    justify-content: space-around;
    padding: 16px 0;

    .stat-item {
      text-align: center;

      .stat-value {
        font-size: 20px;
        font-weight: 600;
        color: var(--el-text-color-primary);
      }

      .stat-label {
        margin-top: 4px;
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}

.info-card,
.security-card {
  margin-bottom: 20px;

  .card-header {
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}

.security-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;

  .security-info {
    .security-title {
      margin-bottom: 4px;
      font-size: 16px;
      font-weight: 500;
      color: var(--el-text-color-primary);
    }

    .security-desc {
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }
}

.el-descriptions {
  .el-descriptions__label {
    font-weight: 500;
    color: var(--el-text-color-regular);
  }

  .el-descriptions__content {
    color: var(--el-text-color-primary);
  }

  .gender-icon {
    margin-left: 8px;
    font-size: 16px;

    &.male {
      color: #409eff;
    }

    &.female {
      color: #f56c6c;
    }
  }
}

.el-dialog {
  .el-dialog__header {
    padding: 20px;
    margin: 0;
    border-bottom: 1px solid var(--el-border-color-light);
  }

  .el-dialog__body {
    padding: 30px 20px;
  }

  .el-dialog__footer {
    padding: 20px;
    border-top: 1px solid var(--el-border-color-light);
  }
}

/* 其他样式保持原样 */
.status-active {
  color: #67c23a;
}

.platform-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.platform-tag {
  margin-right: 20px;
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中（可选，取决于是否希望整个容器在页面中也垂直居中） */
}

// 响应式适配
@media (max-width: 768px) {
  .profile-container {
    padding: 10px;
  }

  .el-col {
    width: 100%;
  }
}
</style>
