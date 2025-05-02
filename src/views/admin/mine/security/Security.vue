<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>安全设置</span>
      </div>
    </template>
    <!-- 账户密码 -->
    <el-row>
      <el-col :span="16">
        <div class="font-bold">账户密码</div>
        <div class="text-14px mt-2">
          定期修改密码有助于保护账户安全
          <el-button
            type="primary"
            plain
            size="small"
            @click="() => handleOpenDialog(DialogType.PASSWORD)"
            class="ml-5"
          >
            修改
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 绑定手机 -->
    <div class="mt-5">
      <div class="font-bold">绑定手机</div>
      <div class="text-14px mt-2">
        <span v-if="userProfile.phone">已绑定手机号：{{ userProfile.phone }}</span>
        <span v-else>未绑定手机</span>
        <el-button
          type="primary"
          plain
          size="small"
          @click="() => handleOpenDialog(DialogType.MOBILE)"
          class="ml-5"
          v-if="userProfile.phone"
        >
          更换
        </el-button>
        <el-button
          type="primary"
          plain
          size="small"
          @click="() => handleOpenDialog(DialogType.MOBILE)"
          class="ml-5"
          v-else
        >
          绑定
        </el-button>
      </div>
    </div>
    <!-- 绑定邮箱 -->
    <div class="mt-5">
      <div class="font-bold">绑定邮箱</div>
      <div class="text-14px mt-2">
        <span v-if="userProfile.email">已绑定邮箱：{{ userProfile.email }}</span>
        <span v-else>未绑定邮箱</span>
        <el-button
          type="primary"
          plain
          size="small"
          @click="() => handleOpenDialog(DialogType.EMAIL)"
          class="ml-5"
          v-if="userProfile.email"
        >
          更换
        </el-button>
        <el-button
          type="primary"
          plain
          size="small"
          @click="() => handleOpenDialog(DialogType.EMAIL)"
          class="ml-5"
          v-else
        >
          绑定
        </el-button>
      </div>
    </div>
  </el-card>

  <!-- 弹窗 -->
  <el-dialog :title="dialog.title" v-model="dialog.visible" :width="500" append-to-body>
    <!-- 修改密码 -->
    <el-form
      v-if="dialog.type === DialogType.PASSWORD"
      :model="passwordChangeForm"
      :rules="passwordChangeRules"
      ref="passwordChangeFormRef"
      :label-width="100"
    >
      <el-form-item label="原密码" prop="oldPassword">
        <el-input type="password" v-model="passwordChangeForm.oldPassword" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="passwordChangeForm.newPassword" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="passwordChangeForm.confirmPassword" show-password />
      </el-form-item>
    </el-form>
    <!-- 绑定手机 -->
    <el-form
      v-else-if="dialog.type === DialogType.MOBILE"
      :model="mobileBindingForm"
      :rules="mobileBindingRules"
      ref="mobileBindingFormRef"
      :label-width="100"
    >
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="mobileBindingForm.phone" style="width: 250px" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="mobileBindingForm.code" style="width: 250px">
          <template #append>
            <el-button
              class="ml-5"
              :disabled="mobileCountdown > 0"
              @click="handleSendVerificationCode('MOBILE')"
            >
              {{ mobileCountdown > 0 ? `${mobileCountdown}s后重新发送` : "发送验证码" }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <!-- 绑定邮箱 -->
    <el-form
      v-else-if="dialog.type === DialogType.EMAIL"
      :model="emailBindingForm"
      :rules="emailBindingRules"
      ref="emailBindingFormRef"
      :label-width="100"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="emailBindingForm.email" style="width: 250px" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="emailBindingForm.code" style="width: 250px">
          <template #append>
            <el-button
              class="ml-5"
              :disabled="emailCountdown > 0"
              @click="handleSendVerificationCode('EMAIL')"
            >
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
</template>

<script lang="ts" setup>
import { UserAPI } from "@/api/user";
import { ElMessage } from "element-plus";
import {
  UpdateUserBindEmailReq,
  UpdateUserBindPhoneReq,
  UpdateUserPasswordReq,
  UserInfoResp,
} from "@/api/types";
import { useUserStore } from "@/store";
import { AuthAPI } from "@/api/auth.ts";

const userProfile = ref<UserInfoResp>(useUserStore().userInfo);

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
  if (dialog.type === DialogType.PASSWORD) {
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

/** 加载用户信息 */
const loadUserProfile = async () => {
  userProfile.value = await useUserStore().getUserInfo();
};

onMounted(async () => {
  if (mobileTimer.value) {
    clearInterval(mobileTimer.value);
  }
  if (emailTimer.value) {
    clearInterval(emailTimer.value);
  }
});
</script>

<style lang="scss" scoped>
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
</style>
