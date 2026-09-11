<template>
  <div class="top-right-btn" :style="style">
    <el-row>
      <slot />
      <el-tooltip
        v-if="search"
        class="item"
        effect="dark"
        :content="showSearch ? '隐藏搜索' : '显示搜索'"
        placement="top"
      >
        <el-button circle icon="Search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button circle icon="Refresh" @click="refresh()" />
      </el-tooltip>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  showSearch: {
    type: Boolean,
    default: true,
  },
  columns: {
    type: Array,
  },
  search: {
    type: Boolean,
    default: true,
  },
  gutter: {
    type: Number,
    default: 10,
  },
});
const emits = defineEmits(["update:showSearch", "queryTable"]);

const style = computed(() => {
  const ret = {};
  return ret;
});

// 搜索
function toggleSearch() {
  emits("update:showSearch", !props.showSearch);
}

// 刷新
function refresh() {
  emits("queryTable");
}
</script>

<style lang="scss" scoped>
:deep(.el-transfer__button) {
  display: block;
  margin-left: 0px;
  border-radius: 50%;
}

:deep(.el-transfer__button:first-child) {
  margin-bottom: 10px;
}

.my-el-transfer {
  text-align: center;
}

.top-right-btn {
  margin-left: auto;
}
</style>
