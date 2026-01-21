<template>
  <el-dropdown class="notice__dropdown" trigger="click">
    <div class="notice__trigger">
      <el-badge v-if="list.length > 0" :value="list.length" :max="99">
        <div class="i-svg:bell" />
      </el-badge>

      <div v-else class="i-svg:bell" />
    </div>

    <template #dropdown>
      <div class="p-5">
        <template v-if="list.length > 0">
          <div v-for="item in list" :key="item.id" class="w-500px py-3">
            <div class="flex-y-center">
              <el-tag
                size="small"
                :type="
                  item.level === NoticeLevelEnum.WARNING
                    ? 'warning'
                    : item.level === NoticeLevelEnum.ERROR
                      ? 'danger'
                      : 'info'
                "
              >
                {{
                  item.type === NoticeTypeEnum.SYSTEM
                    ? "系统"
                    : item.type === NoticeTypeEnum.MAINTENANCE
                      ? "维护"
                      : item.type === NoticeTypeEnum.UPDATE
                        ? "更新"
                        : "提醒"
                }}
              </el-tag>
              <el-text
                size="small"
                class="w-200px cursor-pointer !ml-2 !flex-1"
                truncated
                @click="read(String(item.id))"
              >
                {{ item.title }}
              </el-text>

              <div class="text-xs text-gray">
                {{ formatTime(item.publish_time) }}
              </div>
            </div>
          </div>
          <el-divider />
          <div class="flex-x-between">
            <el-link type="primary" underline="never" @click="goMore">
              <span class="text-xs">查看更多</span>
              <el-icon class="text-xs">
                <ArrowRight />
              </el-icon>
            </el-link>
            <el-link v-if="list.length > 0" type="primary" underline="never" @click="readAll">
              <span class="text-xs">全部已读</span>
            </el-link>
          </div>
        </template>
        <template v-else>
          <div class="flex-center h-150px w-350px">
            <el-empty :image-size="50" description="暂无消息" />
          </div>
        </template>
      </div>
    </template>
  </el-dropdown>

  <el-dialog
    v-model="dialogVisible"
    :title="detail?.title ?? '通知详情'"
    width="800px"
    custom-class="notification-detail"
  >
    <div v-if="detail" class="p-x-20px">
      <div class="flex-y-center mb-16px text-13px text-color-secondary">
        <span class="flex-y-center">
          <el-icon><User /></el-icon>
          {{ detail.publisher_id }}
        </span>
        <span class="ml-2 flex-y-center">
          <el-icon><Timer /></el-icon>
          {{ formatTime(detail.publish_time) }}
        </span>
      </div>

      <div class="max-h-60vh pt-16px mb-24px overflow-y-auto border-t border-solid border-color">
        <div v-html="detail.content"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { useNotice } from "./useNotice";
import { NoticeTypeEnum, NoticeLevelEnum } from "@/enums/blog";

const { list, detail, dialogVisible, read, readAll, goMore } = useNotice();

const formatTime = (timestamp: number | null) => {
  if (!timestamp) return "";
  return useDateFormat(timestamp, "YYYY-MM-DD HH:mm:ss").value;
};
</script>

<style lang="scss" scoped>
.notice {
  &__dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
