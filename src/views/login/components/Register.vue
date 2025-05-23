<template>
  <div>
    <h3 text-center m-0 mb-20px>注册</h3>
    <el-form ref="formRef" :model="model" :rules="rules" size="large">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model.trim="model.username" placeholder="用户名">
          <template #prefix>
            <el-icon>
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-tooltip :visible="isCapsLock" content="大写锁定已开启" placement="right">
        <el-form-item prop="password">
          <el-input
            v-model.trim="model.password"
            placeholder="密码"
            type="password"
            show-password
            @keyup="checkCapsLock"
            @keyup.enter="submit"
          >
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-tooltip>

      <!-- 确认密码
      <el-tooltip :visible="isCapsLock" content="大写锁定已开启" placement="right">
        <el-form-item prop="confirmPassword">
          <el-input
            v-model.trim="model.confirm_password"
            placeholder="确认密码"
            type="password"
            show-password
            @keyup="checkCapsLock"
            @keyup.enter="submit"
          >
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-tooltip>
      -->

      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input v-model.trim="model.email" placeholder="绑定邮箱">
          <template #prefix>
            <el-icon>
              <Message />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="verify_code">
        <div class="w-full flex justify-between">
          <el-input v-model.trim="model.verify_code" placeholder="验证码" @keyup.enter="submit">
            <template #prefix>
              <div class="i-svg:captcha" />
            </template>
          </el-input>
          <el-button :disabled="isDisabled" class="ml-2!" @click="sendCaptchaCode()">
            {{ countdown > 0 ? `${countdown}s后重新发送` : "发送验证码" }}
          </el-button>
        </div>
      </el-form-item>

      <div class="flex-x-between w-full">
        <el-checkbox v-model="isRead">
          <div class="flex items-center">
            我已仔细阅读并接受
            <el-link type="primary" underline="never">《用户协议》</el-link>
          </div>
        </el-checkbox>
<!--        <el-link type="primary" underline="never" @click="toLogin">登录</el-link>-->
      </div>

      <!-- 注册按钮 -->
      <el-form-item>
        <el-button :loading="loading" type="success" class="w-full" @click="submit">注册</el-button>
      </el-form-item>
    </el-form>
    <div flex-center gap-10px>
      <el-text size="default">已有账号？</el-text>
      <el-link type="primary" underline="never" @click="toLogin">登 录</el-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { Lock, Message } from "@element-plus/icons-vue";
import { RegisterReq } from "@/api/types.ts";
import { AuthAPI } from "@/api/auth.ts";
import { verify } from "node:crypto";

const emit = defineEmits(["update:modelValue"]);
const toLogin = () => emit("update:modelValue", "login");

const formRef = ref<FormInstance>();
const loading = ref(false); // 按钮 loading 状态
const isCapsLock = ref(false); // 是否大写锁定
const isRead = ref(false);

const model = ref<RegisterReq>(<RegisterReq>{});

const rules = computed(() => {
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
    // confirm_password: [
    //   {
    //     required: true,
    //     trigger: "blur",
    //     message: "请输入确认密码",
    //   },
    //   {
    //     min: 6,
    //     message: "密码长度不能小于6位",
    //     trigger: "blur",
    //   },
    //   {
    //     validator: (_: any, value: string) => {
    //       return value === model.value.password;
    //     },
    //     trigger: "blur",
    //     message: "两次输入的密码不一致",
    //   },
    // ],
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

// 获取验证码
const countdown = ref(0); // 倒计时秒数
const timer = ref<number | null>(null); // 定时器
const isDisabled = computed(() => {
  return countdown.value > 0 || !model.value.email;
});

function startCountdown() {
  countdown.value = 60;
  timer.value = window.setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0 && timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }, 1000);
}

function sendCaptchaCode() {
  AuthAPI.sendEmailVerifyCodeApi({
    email: model.value.email,
    type: "register",
  }).then(() => {
    ElMessage.success("验证码已发送，请注意查收");
    startCountdown();
  });
}

// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});

// 检查输入大小写
function checkCapsLock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapsLock.value = event.getModifierState("CapsLock");
  }
}

const submit = async () => {
  await formRef.value?.validate();
  ElMessage.warning("开发中 ...");
};
</script>
