<template>
  <div>
    <h3 text-center m-0 mb-20px>登录</h3>
    <el-form ref="loginFormRef" :model="loginFormData" :rules="loginRules" size="large">
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input v-model.trim="loginFormData.email" placeholder="邮箱">
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          v-model.trim="loginFormData.password"
          placeholder="密码"
          type="password"
          show-password
          @keyup.enter="handleLoginSubmit"
        >
          <template #prefix>
            <el-icon>
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="captchaCode">
        <div flex>
          <el-input
            v-model.trim="loginFormData.captcha_code"
            placeholder="验证码"
            @keyup.enter="handleLoginSubmit"
          >
            <template #prefix>
              <div class="i-svg:captcha" />
            </template>
          </el-input>
          <div cursor-pointer h="[40px]" w="[120px]" flex-center ml-10px @click="getCaptcha">
            <el-icon v-if="codeLoading" class="is-loading">
              <Loading />
            </el-icon>

            <img
              v-else
              object-cover
              border-rd-4px
              p-1px
              shadow="[0_0_0_1px_var(--el-border-color)_inset]"
              :src="captchaBase64"
              alt="code"
            />
          </div>
        </div>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button :loading="loading" type="primary" class="w-full" @click="handleLoginSubmit">
          登录
        </el-button>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" class="w-full" @click="toOtherForm('login')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { LocationQuery, RouteLocationRaw, useRoute } from "vue-router";
import router from "@/router";
import { useUserStore } from "@/store";
import { AuthAPI } from "@/api/auth";
import { EmailLoginReq } from "@/api/types";
import { Message } from "@element-plus/icons-vue";

const userStore = useUserStore();
const route = useRoute();

const loginFormRef = ref<FormInstance>();
const loading = ref(false); // 按钮 loading 状态

const loginFormData = ref<EmailLoginReq>(<EmailLoginReq>{});

const loginRules = computed(() => {
  return {
    email: [
      {
        required: true,
        trigger: "blur",
        message: "请输入邮箱",
      },
    ],
    verify_code: [
      {
        required: true,
        trigger: "blur",
        message: "请输入验证码",
      },
    ],
  };
});

// 登录提交处理
async function handleLoginSubmit() {
  try {
    // 1. 表单验证
    const valid = await loginFormRef.value?.validate();
    if (!valid) return;

    loading.value = true;

    // 2. 执行登录
    await userStore.emailLogin(loginFormData.value);

    // 3. 获取用户信息
    await userStore.getUserInfo();

    // 4. 解析并跳转目标地址
    const redirect = resolveRedirectTarget(route.query);
    await router.push(redirect);

    // TODO 5. 判断用户是否点击了记住我？采用明文保存或使用jsencrypt库？
  } catch (error) {
    // 5. 统一错误处理
    console.error("登录失败:", error);
  } finally {
    loading.value = false;
  }
}

/**
 * 解析重定向目标
 * @param query 路由查询参数
 * @returns 标准化后的路由地址对象
 */
function resolveRedirectTarget(query: LocationQuery): RouteLocationRaw {
  // 默认跳转路径
  const defaultPath = "/";

  // 获取原始重定向路径
  const rawRedirect = (query.redirect as string) || defaultPath;

  try {
    // 6. 使用Vue Router解析路径
    const resolved = router.resolve(rawRedirect);
    return {
      path: resolved.path,
      query: resolved.query,
    };
  } catch {
    // 7. 异常处理：返回安全路径
    return { path: defaultPath };
  }
}

const emit = defineEmits(["update:modelValue"]);

function toOtherForm(type: string) {
  emit("update:modelValue", type);
}

// 获取验证码
const captchaBase64 = ref();
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

onMounted(() => getCaptcha());
</script>
