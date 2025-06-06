<template>
  <div>
    <h3 text-center m-0 mb-20px>重置密码</h3>
    <el-form ref="formRef" :model="model" :rules="rules" size="large">
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input v-model.trim="model.email" placeholder="邮箱">
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

      <el-form-item>
        <el-button type="warning" class="w-full" @click="submit">重置密码</el-button>
      </el-form-item>
    </el-form>

    <div flex-center gap-10px>
      <el-text size="default">想起密码了？</el-text>
      <el-link type="primary" underline="never" @click="toLogin">登录</el-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { ResetPasswordReq } from "@/api/types.ts";
import { AuthAPI } from "@/api/auth.ts";
import { Lock } from "@element-plus/icons-vue";

const emit = defineEmits(["update:modelValue"]);
const toLogin = () => emit("update:modelValue", "login");

const model = ref<ResetPasswordReq>(<ResetPasswordReq>{});

const rules = computed(() => {
  return {
    email: [
      {
        required: true,
        trigger: "blur",
        message: "请输入邮箱",
      },
    ],
  };
});

const formRef = ref<FormInstance>();

const isCapsLock = ref(false); // 是否大写锁定
// 检查输入大小写
function checkCapsLock(event: KeyboardEvent) {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapsLock.value = event.getModifierState("CapsLock");
  }
}

const submit = async () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      AuthAPI.resetPasswordApi(model.value).then(() => {
        ElMessage.success("重置密码成功");
        emit("update:modelValue", "login");
      });
    }
  });
};

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
    type: "reset_password",
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
</script>
