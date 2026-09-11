<template>
  <el-popover v-if="user" placement="top" :width="280" trigger="hover" :show-after="300">
    <template #reference>
      <div class="user-avatar">
        <el-avatar :src="user.avatar" :size="size" fit="cover" class="user-avatar-img">
          <el-icon><User /></el-icon>
        </el-avatar>
        <div class="user-info">
          <div class="user-nickname">{{ user.nickname }}</div>
          <div v-if="showUsername && user.username" class="user-username">@{{ user.username }}</div>
        </div>
      </div>
    </template>

    <!-- 悬浮详情卡片 -->
    <div class="user-detail-card">
      <div class="user-detail-header">
        <el-avatar :src="user.avatar" :size="60" fit="cover">
          <el-icon><User /></el-icon>
        </el-avatar>
        <div class="user-detail-info">
          <div class="user-detail-nickname">{{ user.nickname }}</div>
          <div v-if="user.username" class="user-detail-username">@{{ user.username }}</div>
        </div>
      </div>

      <el-divider style="margin: 12px 0" />

      <div class="user-detail-body">
        <div v-if="user.user_id" class="user-detail-item">
          <span class="label">ID:</span>
          <span class="value">{{ user.user_id }}</span>
        </div>
        <div v-if="user.gender !== undefined" class="user-detail-item">
          <span class="label">性别:</span>
          <span class="value">{{ getGenderText(user.gender) }}</span>
        </div>
        <div v-if="user.intro" class="user-detail-item">
          <span class="label">简介:</span>
          <span class="value">{{ user.intro }}</span>
        </div>
        <div v-if="user.website" class="user-detail-item">
          <span class="label">网站:</span>
          <el-link :href="user.website" target="_blank" type="primary" class="value website-link">
            {{ user.website }}
          </el-link>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { User } from "@element-plus/icons-vue";
import type { UserInfoVO } from "@/api/types";

interface Props {
  user?: UserInfoVO & { gender?: number; intro?: string; website?: string };
  size?: number;
  showUsername?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 40,
  showUsername: false,
});

const getGenderText = (gender: number) => {
  const genderMap: Record<number, string> = {
    0: "未知",
    1: "男",
    2: "女",
  };
  return genderMap[gender] || "未知";
};
</script>

<style scoped>
.user-avatar {
  display: flex;
  gap: 12px;
  align-items: center;
}

.user-avatar-img {
  flex-shrink: 0;
  border: 2px solid var(--el-border-color-lighter);
  transition: all 0.3s;
}

.user-avatar-img:hover {
  border-color: var(--el-color-primary);
  transform: scale(1.05);
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-nickname {
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 450;
  line-height: 1.2;
  color: var(--el-text-color-primary);
  white-space: nowrap;
}

.user-username {
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  line-height: 1;
  color: var(--el-text-color-secondary);
  white-space: nowrap;
}

/* 悬浮详情卡片样式 */
.user-detail-card {
  padding: 4px;
}

.user-detail-header {
  display: flex;
  gap: 12px;
  align-items: center;
}

.user-detail-info {
  flex: 1;
  min-width: 0;
}

.user-detail-nickname {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--el-text-color-primary);
  white-space: nowrap;
}

.user-detail-username {
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  white-space: nowrap;
}

.user-detail-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.user-detail-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 13px;
  line-height: 1.5;
}

.user-detail-item .label {
  flex-shrink: 0;
  min-width: 40px;
  font-weight: 500;
  color: var(--el-text-color-secondary);
}

.user-detail-item .value {
  flex: 1;
  color: var(--el-text-color-primary);
  text-align: left;
  word-break: break-all;
}

.website-link {
  justify-content: flex-start !important;
  text-decoration: none !important;
}
</style>
