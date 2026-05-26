<template>
  <div class="login-page">
    <div class="login-page__body">
      <section class="login-card">
        <div class="login-card__brand">
          <div class="login-card__logo-wrap">
            <el-image :src="logo" class="login-card__logo" />
          </div>
          <div class="login-card__meta">
            <div class="login-card__title-row">
              <span class="login-card__title">{{ appConfig.title }}</span>
            </div>
            <div v-if="appConfig.version" class="login-card__version-row">
              <el-text size="small" type="info">VERSION</el-text>
              <el-tag size="small" effect="light" round>
                {{ `v${appConfig.version}` }}
              </el-tag>
            </div>
          </div>
        </div>

        <div class="login-card__form">
          <h3 class="login-form__title text-center">用户登录</h3>
          <el-form
            ref="loginFormRef"
            :model="loginFormData"
            :rules="loginRules"
            size="large"
            :validate-on-rule-change="false"
          >
            <el-form-item prop="username">
              <el-input v-model.trim="loginFormData.username" placeholder="用户名">
                <template #prefix>
                  <el-icon><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>

            <el-tooltip :visible="isCapsLock" content="大写锁定已开启" placement="right">
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

            <el-form-item prop="captchaCode">
              <div flex items-center gap-10px>
                <el-input
                  v-model.trim="loginFormData.captchaCode"
                  placeholder="验证码"
                  clearable
                  class="flex-1"
                  @keyup.enter="handleLoginSubmit"
                >
                  <template #prefix>
                    <div class="i-svg:captcha" />
                  </template>
                </el-input>
                <div cursor-pointer h-44px w-140px flex-center @click="getCaptcha">
                  <el-icon v-if="codeLoading" class="is-loading" size="20"><Loading /></el-icon>
                  <img
                    v-else-if="captchaBase64"
                    border-rd-4px
                    w-full
                    h-full
                    block
                    object-cover
                    shadow="[0_0_0_1px_var(--el-border-color)_inset]"
                    :src="captchaBase64"
                    alt="captchaCode"
                    title="点击刷新验证码"
                    @error="getCaptcha"
                  />
                  <el-text v-else type="info" size="small">点击获取验证码</el-text>
                </div>
              </div>
            </el-form-item>

            <div class="flex-x-between w-full">
              <el-checkbox v-model="loginFormData.rememberMe">记住我</el-checkbox>
            </div>

            <el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                class="w-full"
                @click="handleLoginSubmit"
              >
                登 录
              </el-button>
            </el-form-item>
          </el-form>
        </div>

        <footer class="login-card__footer">
          <el-text size="small">Copyright © 2021 - 2025 youlai.tech</el-text>
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup>
import { User, Lock, Loading } from "@element-plus/icons-vue";
import AuthAPI from "@/api/auth";
import router from "@/router";
import { useUserStore } from "@/stores";
import { AuthStorage } from "@/utils/auth";
import logo from "@/assets/images/logo.png";
import { appConfig } from "@/settings";

const userStore = useUserStore();
const route = useRoute();

const loginFormRef = ref();
const loading = ref(false);
const isCapsLock = ref(false);
const captchaBase64 = ref();
const codeLoading = ref(false);

const rememberMe = AuthStorage.getRememberMe();
const loginFormData = ref({
  username: "admin",
  password: "123456",
  captchaId: "",
  captchaCode: "",
  rememberMe,
});

const loginRules = computed(() => ({
  username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  password: [
    { required: true, trigger: "blur", message: "请输入密码" },
    { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
  ],
  captchaCode: [{ required: true, trigger: "blur", message: "请输入验证码" }],
}));

function getCaptcha() {
  codeLoading.value = true;
  AuthAPI.getCaptcha()
    .then((data) => {
      loginFormData.value.captchaId = data.captchaId;
      captchaBase64.value = data.captchaBase64;
    })
    .finally(() => (codeLoading.value = false));
}

async function handleLoginSubmit() {
  const valid = await loginFormRef.value?.validate().then(
    () => true,
    () => false
  );
  if (!valid) return;

  loading.value = true;
  try {
    await userStore.login(loginFormData.value).then(
      async () => {
        const redirectPath = route.query.redirect || "/";
        await router.push(decodeURIComponent(redirectPath));
      },
      () => {
        getCaptcha();
      }
    );
  } finally {
    loading.value = false;
  }
}

function checkCapsLock(event) {
  if (event instanceof KeyboardEvent) {
    isCapsLock.value = event.getModifierState("CapsLock");
  }
}

onMounted(() => getCaptcha());
</script>

<style lang="scss" scoped>
.login-page {
  --login-card-bg: rgb(255 255 255 / 90%);
  --login-card-border: rgb(0 0 0 / 6%);

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: clamp(1rem, 3vw, 2rem);
  overflow: hidden;
  background: #f5f8ff;

  &::before {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    content: "";
    background: url("@/assets/images/login/bg.svg") center/cover no-repeat;
  }
}

.dark .login-page {
  --login-card-bg: rgb(22 26 36 / 90%);
  --login-card-border: rgb(255 255 255 / 7%);

  background: #0b0f19;

  &::before {
    background-image: url("@/assets/images/login/bg-dark.svg");
  }
}

.login-page__body {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: clamp(1.5rem, 2vw, 2.5rem);
}

.login-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: min(420px, 100%);
  padding: clamp(1.5rem, 3vw, 2.25rem);
  margin-inline: auto;
  background: var(--login-card-bg);
  border: 1px solid var(--login-card-border);
  border-radius: 20px;
  box-shadow:
    0 2px 4px rgb(0 0 0 / 2%),
    0 12px 32px rgb(0 0 0 / 6%);
  backdrop-filter: blur(16px);
  animation: cardIn 0.7s ease;
}

.login-card__brand {
  display: flex;
  gap: 12px;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--login-card-border);
}

.login-card__logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  background: var(--el-color-primary-light-9);
  border-radius: 14px;
}

.login-card__logo {
  width: 26px;
  height: 26px;
}

.login-card__meta {
  flex: 1;
  min-width: 0;
}

.login-card__title {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.05rem;
  font-weight: 650;
  white-space: nowrap;
}

.login-card__version-row {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 2px;
  font-size: 0.72rem;
}

.login-form__title {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 600;
}

.login-card__form {
  :deep(.el-form-item) {
    margin-bottom: 18px;
  }

  :deep(.el-input__wrapper) {
    background: rgb(0 0 0 / 2%);
    border-radius: 10px;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 6%) inset;
    transition: all 0.2s;

    &:hover {
      box-shadow: 0 0 0 1px rgb(0 0 0 / 10%) inset;
    }

    &.is-focus {
      background: transparent;
      box-shadow: 0 0 0 1.5px var(--el-color-primary) inset;
    }
  }
}

.dark .login-card__form {
  :deep(.el-input__wrapper) {
    background: rgb(255 255 255 / 3%);
    box-shadow: 0 0 0 1px rgb(255 255 255 / 8%) inset;

    &:hover {
      box-shadow: 0 0 0 1px rgb(255 255 255 / 14%) inset;
    }

    &.is-focus {
      background: rgb(255 255 255 / 5%);
      box-shadow: 0 0 0 1.5px var(--el-color-primary) inset;
    }
  }
}

.login-card__footer {
  padding-top: 14px;
  font-size: 0.78rem;
  color: var(--el-text-color-placeholder);
  text-align: center;
  border-top: 1px solid var(--login-card-border);
}

@media (max-width: 768px) {
  .login-page__body {
    padding: 0.5rem;
  }
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
