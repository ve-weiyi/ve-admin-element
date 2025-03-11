<template>
  <el-tooltip content="布局大小" effect="dark" placement="bottom">
    <el-dropdown trigger="click" @command="handleSizeChange">
      <div>
        <div class="i-svg:size" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item of sizeOptions"
            :key="item.value"
            :disabled="appStore.size == item.value"
            :command="item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<script setup lang="ts">
import { SizeEnum } from "@/enums/SizeEnum";
import { useAppStore } from "@/store/modules/app";

const sizeOptions = computed(() => {
  return [
    { label: "默认", value: SizeEnum.DEFAULT },
    { label: "大型", value: SizeEnum.LARGE },
    { label: "小型", value: SizeEnum.SMALL },
  ];
});

const appStore = useAppStore();
function handleSizeChange(size: string) {
  appStore.changeSize(size);
  ElMessage.success("切换布局大小成功");
}
</script>
