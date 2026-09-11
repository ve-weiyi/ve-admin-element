<template>
  <el-popover v-if="guest" placement="top" :width="280" trigger="hover" :show-after="300">
    <template #reference>
      <div class="guest-info">
        <el-icon class="guest-icon"><Monitor /></el-icon>
        <div class="guest-text">
          <div class="guest-device">{{ guest.device_id.slice(0, 8) }}...</div>
          <div class="guest-os">{{ guest.os }}</div>
        </div>
      </div>
    </template>

    <!-- 悬浮详情卡片 -->
    <div class="guest-detail-card">
      <div class="guest-detail-header">
        <el-icon class="guest-detail-icon" :size="40"><Monitor /></el-icon>
        <div class="guest-detail-info">
          <div class="guest-detail-title">访客信息</div>
          <div class="guest-detail-subtitle">{{ guest.device_id }}</div>
        </div>
      </div>

      <el-divider style="margin: 12px 0" />

      <div class="guest-detail-body">
        <div class="guest-detail-item">
          <span class="label">设备ID:</span>
          <span class="value">{{ guest.device_id }}</span>
        </div>
        <div class="guest-detail-item">
          <span class="label">操作系统:</span>
          <span class="value">{{ guest.os }}</span>
        </div>
        <div class="guest-detail-item">
          <span class="label">浏览器:</span>
          <span class="value">{{ guest.browser }}</span>
        </div>
        <div class="guest-detail-item">
          <span class="label">IP地址:</span>
          <span class="value">{{ guest.ip_address }}</span>
        </div>
        <div class="guest-detail-item">
          <span class="label">IP归属地:</span>
          <span class="value">{{ guest.ip_source }}</span>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { Monitor } from "@element-plus/icons-vue";
import type { GuestInfoVO } from "@/api/types";

interface Props {
  guest?: GuestInfoVO;
}

defineProps<Props>();
</script>

<style scoped>
.guest-info {
  display: flex;
  gap: 8px;
  align-items: center;
}

.guest-icon {
  font-size: 20px;
  color: var(--el-color-primary);
}

.guest-text {
  flex: 1;
  min-width: 0;
}

.guest-device {
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 450;
  line-height: 1.2;
  color: var(--el-text-color-primary);
  white-space: nowrap;
}

.guest-os {
  margin-top: 2px;
  font-size: 12px;
  line-height: 1;
  color: var(--el-text-color-secondary);
}

/* 悬浮详情卡片样式 */
.guest-detail-card {
  padding: 4px;
}

.guest-detail-header {
  display: flex;
  gap: 12px;
  align-items: center;
}

.guest-detail-icon {
  color: var(--el-color-primary);
}

.guest-detail-info {
  flex: 1;
  min-width: 0;
}

.guest-detail-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--el-text-color-primary);
}

.guest-detail-subtitle {
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  white-space: nowrap;
}

.guest-detail-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.guest-detail-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 13px;
  line-height: 1.5;
}

.guest-detail-item .label {
  flex-shrink: 0;
  min-width: 60px;
  font-weight: 500;
  color: var(--el-text-color-secondary);
}

.guest-detail-item .value {
  flex: 1;
  color: var(--el-text-color-primary);
  text-align: left;
  word-break: break-all;
}
</style>
