<template>
  <div>
    <h3 text-center m-0 mb-20px>登录</h3>
    <el-form ref="loginFormRef" :model="loginFormData" :rules="loginRules" size="large">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model.trim="loginFormData.username" placeholder="用户名">
          <template #prefix>
            <el-dropdown>
              <div>
                <el-icon>
                  <User />
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(item, index) in loginCredentials"
                    :key="index"
                    @click="setLoginCredentials(item.username, item.password)"
                  >
                    {{ item.nickname }}: {{ item.username }}/{{ item.password }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
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
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-tooltip>

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

      <div class="flex-x-between w-full">
        <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        <el-link type="primary" underline="never" @click="toOtherForm('resetPwd')">
          忘记密码
        </el-link>
      </div>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button :loading="loading" type="primary" class="w-full" @click="handleLoginSubmit">
          登录
        </el-button>
      </el-form-item>

      <!-- 登录方式切换 -->
      <el-form-item>
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
      </el-form-item>
    </el-form>

    <!-- 第三方登录 -->
    <el-form-item>
      <el-divider>
        <el-text size="small">其他登录方式</el-text>
      </el-divider>
      <div class="flex-center gap-x-5 w-full text-[var(--el-text-color-secondary)]">
        <CommonWrapper>
          <div text-20px class="i-svg:wechat" @click="onThirdPartyLogin('wechat')" />
        </CommonWrapper>
        <CommonWrapper>
          <div text-20px cursor-pointer class="i-svg:qq" @click="onThirdPartyLogin('qq')" />
        </CommonWrapper>
        <CommonWrapper>
          <div text-20px cursor-pointer class="i-svg:github" @click="onThirdPartyLogin('github')" />
        </CommonWrapper>
        <CommonWrapper>
          <div text-20px cursor-pointer class="i-svg:gitee" @click="onThirdPartyLogin('gitee')" />
        </CommonWrapper>
      </div>
    </el-form-item>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { LocationQuery, RouteLocationRaw, useRoute } from "vue-router";
import router from "@/router";
import { useUserStore } from "@/store";
import CommonWrapper from "@/components/CommonWrapper/index.vue";
import { AuthAPI } from "@/api/auth.ts";
import { LoginReq } from "@/api/types.ts";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const route = useRoute();

onMounted(() => getCaptcha());

const loginFormRef = ref<FormInstance>();
const loading = ref(false); // 按钮 loading 状态
const isCapsLock = ref(false); // 是否大写锁定
const captchaBase64 = ref(); // 验证码图片Base64字符串
const rememberMe = ref(false); // 记住我

const loginFormData = ref<LoginReq>({
  username: "root",
  password: "123456",
  captcha_key: "",
  captcha_code: "",
  // rememberMe: false,
});

const loginRules = computed(() => {
  return {
    username: [
      {
        required: true,
        trigger: "blur",
        message: "请输入用户名",
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
        message: "密码长度不能小于6位",
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

// 登录提交处理
async function handleLoginSubmit() {
  try {
    // 1. 表单验证
    const valid = await loginFormRef.value?.validate();
    if (!valid) return;

    loading.value = true;

    // 2. 执行登录
    await userStore.login(loginFormData.value);

    // 3. 获取用户信息
    await userStore.getUserInfo();

    // 4. 解析并跳转目标地址
    const redirect = resolveRedirectTarget(route.query);
    await router.push(redirect);

    // TODO 5. 判断用户是否点击了记住我？采用明文保存或使用jsencrypt库？
  } catch (error) {
    // 5. 统一错误处理
    getCaptcha(); // 刷新验证码
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
  { key: "email_login", icon: "i-svg:email", title: "邮箱登录" },
  { key: "phone_login", icon: "i-svg:phone", title: "手机登录" },
  { key: "register", icon: "i-svg:user-plus", title: "注册" },
];

const loginCredentials = [
  {
    username: "root",
    password: "123456",
    nickname: "超级管理员",
  },
  {
    username: "admin",
    password: "123456",
    nickname: "系统管理员",
  },
  {
    username: "test",
    password: "123456",
    nickname: "测试小游客",
  },
];

// 设置登录凭证
const setLoginCredentials = (username: string, password: string) => {
  loginFormData.value.username = username;
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
      console.error("第三方登录失败:", error);
      ElMessage.error("第三方登录失败，请稍后重试");
    });
};
</script>
