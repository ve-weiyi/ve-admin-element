<template>
  <div class="auth-panel-form">
    <h3 class="auth-panel-form__title" text-center>登 录</h3>
    <el-form
      ref="loginFormRef"
      :model="loginFormData"
      :rules="loginRules"
      size="large"
      :validate-on-rule-change="false"
    >
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input v-model.trim="loginFormData.email" placeholder="邮箱">
          <template #prefix>
            <el-dropdown>
              <div>
                <el-icon>
                  <Message />
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(item, index) in loginCredentials"
                    :key="index"
                    @click="setLoginCredentials(item.email, item.password)"
                  >
                    {{ item.nickname }}: {{ item.email }}/{{ item.password }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-tooltip :visible="isCapsLock" content="大写锁定已打开" placement="right">
        <el-form-item prop="password">
          <el-input
            v-model.trim="loginFormData.password"
            placeholder="密码"
            type="password"
            show-password
            @keyup="checkCapsLock"
            @keyup.enter="handleLoginSubmit"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-tooltip>

      <!-- 验证码 -->
      <el-form-item prop="captcha_code">
        <div flex items-center gap-10px>
          <el-input
            v-model.trim="loginFormData.captcha_code"
            placeholder="验证码"
            clearable
            class="flex-1"
            @keyup.enter="handleLoginSubmit"
          >
            <template #prefix>
              <div class="i-svg:captcha" />
            </template>
          </el-input>
          <div cursor-pointer h-40px w-120px flex-center @click="getCaptcha">
            <el-icon v-if="codeLoading" class="is-loading" size="20"><Loading /></el-icon>
            <img
              v-else-if="captchaBase64"
              h-full
              w-full
              block
              border-rd-4px
              object-cover
              shadow="[0_0_0_1px_var(--el-border-color)_inset]"
              :src="captchaBase64"
              alt="captcha_code"
            />
            <el-text v-else type="info" size="small">点击获取验证码</el-text>
          </div>
        </div>
      </el-form-item>

      <div class="flex-x-between w-full">
        <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        <el-link type="primary" underline="never" @click="toOtherForm('resetPwd')">
          忘记密码？
        </el-link>
      </div>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button :loading="loading" type="primary" class="w-full" @click="handleLoginSubmit">
          登 录
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 登录方式切换 -->
    <div flex-center gap-10px>
      <div class="w-full h-[20px] flex justify-between items-center">
        <el-button
          v-for="(item, index) in operates"
          :key="index"
          class="w-full mt-4!"
          size="default"
          @click="toOtherForm(item.key)"
        >
          {{ item.title }}
        </el-button>
      </div>
    </div>

    <!-- 第三方登录 -->
    <div class="third-party-login">
      <div class="divider-container">
        <div class="divider-line"></div>
        <span class="divider-text">其他</span>
        <div class="divider-line"></div>
      </div>
      <div class="social-login">
        <div class="social-login__item">
          <div class="i-svg:wechat" @click="onThirdPartyLogin('wechat')" />
        </div>
        <div class="social-login__item">
          <div class="i-svg:qq" @click="onThirdPartyLogin('qq')" />
        </div>
        <div class="social-login__item">
          <div class="i-svg:github" @click="onThirdPartyLogin('github')" />
        </div>
        <div class="social-login__item">
          <div class="i-svg:gitee" @click="onThirdPartyLogin('gitee')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

import router from "@/router";
import { useUserStore } from "@/store";
import { AuthStorage } from "@/utils/auth";
import { EmailLoginReq } from "@/api/types";
import { AuthAPI } from "@/api/auth";
import { Message } from "@element-plus/icons-vue";

const userStore = useUserStore();
const route = useRoute();

const loginFormRef = ref<FormInstance>();
const loading = ref(false);
// 是否大写锁定
const isCapsLock = ref(false);
// 验证码图片 Base64
const captchaBase64 = ref();
// 记住我
const rememberMe = ref(AuthStorage.getRememberMe());

watch(rememberMe, (val) => {
  AuthStorage.setRememberMe(val);
});

const loginFormData = ref<EmailLoginReq>({
  email: "root@qq.com",
  password: "123456",
  captcha_key: "",
  captcha_code: "",
});

onMounted(() => getCaptcha());

const loginRules = computed<FormRules>(() => {
  return {
    email: [
      {
        required: true,
        trigger: "blur",
        message: "请输入邮箱",
      },
      {
        type: "email",
        trigger: "blur",
        message: "请输入正确的邮箱格式",
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: "请输入密码",
      },
      {
        min: 6,
        message: "密码不能少于6位",
        trigger: "blur",
      },
    ],
    captcha_code: [
      {
        required: true,
        trigger: "blur",
        message: "请输入验证码",
      },
    ],
  };
});

// 获取验证码
const codeLoading = ref(false);

function getCaptcha() {
  codeLoading.value = true;
  AuthAPI.getCaptchaCodeApi({
    height: 40,
    width: 120,
  })
    .then((res) => {
      loginFormData.value.captcha_key = res.data.captcha_key;
      captchaBase64.value = res.data.captcha_base64;
    })
    .finally(() => (codeLoading.value = false));
}

/**
 * 登录提交
 */
async function handleLoginSubmit() {
  try {
    // 1. 表单验证
    const valid = await loginFormRef.value?.validate();
    if (!valid) return;

    if (!loginFormData.value.captcha_key) {
      getCaptcha();
      ElMessage.warning("验证码已刷新，请重新输入");
      return;
    }

    loading.value = true;

    // 2. 执行登录
    try {
      await userStore.emailLogin(loginFormData.value);
      // 登录成功，跳转到目标页面
      const redirectPath = (route.query.redirect as string) || "/";
      await router.push(decodeURIComponent(redirectPath));
    } catch (error: any) {
      // 其他错误，刷新验证码
      getCaptcha();
      throw error;
    }
  } catch (error) {
    // 统一错误处理
    ElMessage.error("登录失败。" + error);
  } finally {
    loading.value = false;
  }
}

// 检查输入大小写
function checkCapsLock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapsLock.value = event.getModifierState("CapsLock");
  }
}

const emit = defineEmits(["update:modelValue"]);

function toOtherForm(type: string) {
  emit("update:modelValue", type);
}

const operates = [
  { key: "phone_login", icon: "i-svg:phone", title: "手机号登录" },
  { key: "register", icon: "i-svg:user-plus", title: "注册" },
];

const loginCredentials = [
  {
    email: "root@qq.com",
    password: "123456",
    nickname: "超级管理员",
  },
  {
    email: "admin@qq.com",
    password: "123456",
    nickname: "系统管理员",
  },
  {
    email: "test@qq.com",
    password: "123456",
    nickname: "测试小游客",
  },
];

// 设置登录凭证
const setLoginCredentials = (email: string, password: string) => {
  loginFormData.value.email = email;
  loginFormData.value.password = password;
};

// 跳转第三方登录地址
const onThirdPartyLogin = (platform: string) => {
  const state = route.query.redirect as string;
  AuthAPI.getOauthAuthorizeUrlApi({
    platform: platform,
    state: state,
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
      ElMessage.error("第三方登录失败，请稍后重试。" + error);
    });
};
</script>

<style lang="scss" scoped>
.auth-panel-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.auth-panel-form__title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
}

.third-party-login {
  .divider-container {
    display: flex;
    align-items: center;
    margin: 16px 0;

    .divider-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(to right, transparent, var(--el-border-color-light), transparent);
    }

    .divider-text {
      padding: 0 16px;
      font-size: 12px;
      color: var(--el-text-color-regular);
      white-space: nowrap;
    }
  }

  .social-login {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: var(--el-text-color-secondary);

    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      font-size: 20px;
      cursor: pointer;
      border-radius: 8px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--el-fill-color);
      }
    }
  }
}
</style>
