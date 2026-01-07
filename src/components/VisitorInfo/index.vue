<template>
  <el-popover v-if="visitor" placement="top" :width="280" trigger="hover" :show-after="300">
    <template #reference>
      <div class="visitor-info">
        <el-icon class="visitor-icon"><Monitor /></el-icon>
        <div class="visitor-text">
          <div class="visitor-terminal">{{ visitor.terminal_id.slice(0, 8) }}...</div>
          <div class="visitor-os">{{ visitor.os }}</div>
        </div>
      </div>
    </template>

    <!-- 悬浮详情卡片 -->
    <div class="visitor-detail-card">
      <div class="visitor-detail-header">
        <el-icon class="visitor-detail-icon" :size="40"><Monitor /></el-icon>
        <div class="visitor-detail-info">
          <div class="visitor-detail-title">访客信息</div>
          <div class="visitor-detail-subtitle">{{ visitor.terminal_id }}</div>
        </div>
      </div>

      <el-divider style="margin: 12px 0" />

      <div class="visitor-detail-body">
        <div class="visitor-detail-item">
          <span class="label">终端ID:</span>
          <span class="value">{{ visitor.terminal_id }}</span>
        </div>
        <div class="visitor-detail-item">
          <span class="label">操作系统:</span>
          <span class="value">{{ visitor.os }}</span>
        </div>
        <div class="visitor-detail-item">
          <span class="label">浏览器:</span>
          <span class="value">{{ visitor.browser }}</span>
        </div>
        <div class="visitor-detail-item">
          <span class="label">IP地址:</span>
          <span class="value">{{ visitor.ip_address }}</span>
        </div>
        <div class="visitor-detail-item">
          <span class="label">IP归属地:</span>
          <span class="value">{{ visitor.ip_source }}</span>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { Monitor } from "@element-plus/icons-vue";
import type { VisitorInfoVO } from "@/api/types";

interface Props {
  visitor?: VisitorInfoVO;
}

defineProps<Props>();
</script>

<style scoped>
.visitor-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.visitor-icon {
  color: var(--el-color-primary);
  font-size: 20px;
}

.visitor-text {
  flex: 1;
  min-width: 0;
}

.visitor-terminal {
  font-weight: 450;
  color: var(--el-text-color-primary);
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.visitor-os {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  line-height: 1;
  margin-top: 2px;
}

/* 悬浮详情卡片样式 */
.visitor-detail-card {
  padding: 4px;
}

.visitor-detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.visitor-detail-icon {
  color: var(--el-color-primary);
}

.visitor-detail-info {
  flex: 1;
  min-width: 0;
}

.visitor-detail-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  line-height: 1.4;
}

.visitor-detail-subtitle {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.visitor-detail-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.visitor-detail-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.5;
}

.visitor-detail-item .label {
  flex-shrink: 0;
  color: var(--el-text-color-secondary);
  font-weight: 500;
  min-width: 60px;
}

.visitor-detail-item .value {
  flex: 1;
  color: var(--el-text-color-primary);
  word-break: break-all;
  text-align: left;
}
</style>
