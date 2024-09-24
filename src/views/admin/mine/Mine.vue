<template>
  <div class="app-container">
    <el-tabs tab-position="left">
      <!-- 基本设置 Tab Pane -->
      <el-tab-pane label="账号信息">
        <div class="w-full">
          <Info />
        </div>
      </el-tab-pane>

      <!-- 安全设置  -->
      <el-tab-pane label="安全设置">
        <Identity />
      </el-tab-pane>

      <el-tab-pane label="登录历史">
        <History />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="tsx" setup>
import Identity from "./identity/Identity.vue";
import Info from "./info/Info.vue";
import History from "./history/History.vue";
</script>
<style lang="scss" scoped>
/** 关闭tag标签  */
.app-container {
  /* 50px = navbar = 50px */
  height: calc(100vh - 50px);
  background: var(--el-fill-color-blank);
}

/** 开启tag标签  */
.hasTagsView {
  .app-container {
    /* 84px = navbar + tags-view = 50px + 34px */
    height: calc(100vh - 84px);
  }
}
</style>
