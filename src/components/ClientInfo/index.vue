<template>
  <el-popover v-if="client" placement="top" :width="280" trigger="hover" :show-after="300">
    <template #reference>
      <div class="client-info">
        <el-icon class="client-icon"><Monitor /></el-icon>
        <div class="client-text">
          <div class="client-terminal">{{ client.terminal_id.slice(0, 8) }}...</div>
          <div class="client-os">{{ client.os }}</div>
        </div>
      </div>
    </template>

    <!-- 悬浮详情卡片 -->
    <div class="client-detail-card">
      <div class="client-detail-header">
        <el-icon class="client-detail-icon" :size="40"><Monitor /></el-icon>
        <div class="client-detail-info">
          <div class="client-detail-title">访客信息</div>
          <div class="client-detail-subtitle">{{ client.terminal_id }}</div>
        </div>
      </div>

      <el-divider style="margin: 12px 0" />

      <div class="client-detail-body">
        <div class="client-detail-item">
          <span class="label">终端ID:</span>
          <span class="value">{{ client.terminal_id }}</span>
        </div>
        <div class="client-detail-item">
          <span class="label">操作系统:</span>
          <span class="value">{{ client.os }}</span>
        </div>
        <div class="client-detail-item">
          <span class="label">浏览器:</span>
          <span class="value">{{ client.browser }}</span>
        </div>
        <div class="client-detail-item">
          <span class="label">IP地址:</span>
          <span class="value">{{ client.ip_address }}</span>
        </div>
        <div class="client-detail-item">
          <span class="label">IP归属地:</span>
          <span class="value">{{ client.ip_source }}</span>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { Monitor } from "@element-plus/icons-vue";
import type { ClientInfoVO } from "@/api/types";

interface Props {
  client?: ClientInfoVO;
}

defineProps<Props>();
</script>

<style scoped>
.client-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.client-icon {
  color: var(--el-color-primary);
  font-size: 20px;
}

.client-text {
  flex: 1;
  min-width: 0;
}

.client-terminal {
  font-weight: 450;
  color: var(--el-text-color-primary);
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.client-os {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  line-height: 1;
  margin-top: 2px;
}

/* 悬浮详情卡片样式 */
.client-detail-card {
  padding: 4px;
}

.client-detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.client-detail-icon {
  color: var(--el-color-primary);
}

.client-detail-info {
  flex: 1;
  min-width: 0;
}

.client-detail-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  line-height: 1.4;
}

.client-detail-subtitle {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.client-detail-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.client-detail-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.5;
}

.client-detail-item .label {
  flex-shrink: 0;
  color: var(--el-text-color-secondary);
  font-weight: 500;
  min-width: 60px;
}

.client-detail-item .value {
  flex: 1;
  color: var(--el-text-color-primary);
  word-break: break-all;
  text-align: left;
}
</style>
