<template>
  <el-drawer
    v-model="drawerVisible"
    size="380"
    title="项目设置"
    :before-close="handleCloseDrawer"
    class="settings-drawer"
  >
    <div class="settings-content">
      <section class="config-section">
        <el-divider>主题模式</el-divider>

        <div class="flex-center">
          <el-radio-group v-model="themeMode" class="theme-mode-group">
            <el-radio-button :value="ThemeMode.LIGHT">明亮</el-radio-button>
            <el-radio-button :value="ThemeMode.DARK">暗黑</el-radio-button>
            <el-radio-button :value="ThemeMode.AUTO">自动</el-radio-button>
          </el-radio-group>
        </div>
      </section>

      <!-- 界面设置 -->
      <section class="config-section">
        <el-divider>界面设置</el-divider>

        <div class="config-item flex-x-between">
          <span class="text-xs">主题颜色</span>
          <el-color-picker
            v-model="selectedThemeColor"
            :predefine="colorPresets"
            popper-class="theme-picker-dropdown"
          />
        </div>

        <div class="config-item flex-x-between">
          <span class="text-xs">显示标签页</span>
          <el-switch v-model="settingsStore.showTagsView" />
        </div>

        <div class="config-item flex-x-between">
          <span class="text-xs">显示 Logo</span>
          <el-switch v-model="settingsStore.showAppLogo" />
        </div>

        <div class="config-item flex-x-between">
          <span class="text-xs">显示水印</span>
          <el-switch v-model="settingsStore.showWatermark" />
        </div>

        <div class="config-item flex-x-between">
          <span class="text-xs">页面切换动画</span>
          <el-select v-model="settingsStore.pageSwitchingAnimation" style="width: 150px">
            <el-option
              v-for="(item, key) in pageSwitchingAnimationOptions"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="config-item flex-x-between">
          <span class="text-xs">灰色模式</span>
          <el-switch v-model="settingsStore.grayMode" />
        </div>

        <div class="config-item flex-x-between">
          <span class="text-xs">色弱模式</span>
          <el-switch v-model="settingsStore.colorWeak" />
        </div>

        <div
          v-if="settingsStore.resolvedTheme !== ThemeMode.DARK"
          class="config-item flex-x-between"
        >
          <span class="text-xs">侧边栏配色</span>
          <el-radio-group v-model="sidebarColor" @change="changeSidebarColor">
            <el-radio :value="SidebarColor.CLASSIC_BLUE">经典蓝</el-radio>
            <el-radio :value="SidebarColor.MINIMAL_WHITE">极简白</el-radio>
          </el-radio-group>
        </div>
      </section>

      <!-- 布局设置 -->
      <section class="config-section">
        <el-divider>导航布局</el-divider>

        <div class="layout-select">
          <div class="layout-grid">
            <el-tooltip
              v-for="item in layoutOptions"
              :key="item.value"
              :content="item.label"
              placement="bottom"
            >
              <div
                role="button"
                tabindex="0"
                :class="[
                  'layout-item',
                  item.className,
                  {
                    'is-active': settingsStore.layout === item.value,
                  },
                ]"
                @click="handleLayoutChange(item.value)"
                @keydown.enter.space="handleLayoutChange(item.value)"
              >
                <div class="layout-preview">
                  <div v-if="item.value !== LayoutMode.LEFT" class="layout-header"></div>
                  <div v-if="item.value !== LayoutMode.TOP" class="layout-sidebar"></div>
                  <div class="layout-main"></div>
                </div>
                <div class="layout-name">{{ item.label }}</div>
                <div v-if="settingsStore.layout === item.value" class="layout-check">
                  <el-icon><Check /></el-icon>
                </div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </section>
    </div>

    <!-- 操作按钮区域 -->
    <template #footer>
      <div class="action-buttons">
        <el-tooltip content="复制配置将生成当前设置的代码" placement="top">
          <el-button
            type="primary"
            size="default"
            :icon="copyIcon"
            :loading="copyLoading"
            @click="handleCopySettings"
          >
            {{ copyLoading ? "复制中..." : "复制配置" }}
          </el-button>
        </el-tooltip>
        <el-tooltip content="重置将恢复所有设置为默认值" placement="top">
          <el-button
            type="warning"
            size="default"
            :icon="resetIcon"
            :loading="resetLoading"
            @click="handleResetSettings"
          >
            {{ resetLoading ? "重置中..." : "重置配置" }}
          </el-button>
        </el-tooltip>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { DocumentCopy, RefreshLeft, Check } from "@element-plus/icons-vue";
import { LayoutMode, SidebarColor, ThemeMode } from "@/enums";
import { useSettingsStore } from "@/stores";
import { themeColorPresets } from "@/settings";

const pageSwitchingAnimationOptions = [
  { label: "无动画", value: "none" },
  { label: "淡入淡出", value: "fade" },
  { label: "滑动", value: "fade-slide" },
  { label: "缩放", value: "fade-scale" },
];

const copyIcon = markRaw(DocumentCopy);
const resetIcon = markRaw(RefreshLeft);

const copyLoading = ref(false);
const resetLoading = ref(false);

const layoutOptions = [
  { value: LayoutMode.LEFT, label: "左侧布局", className: "left" },
  { value: LayoutMode.TOP, label: "顶部布局", className: "top" },
  { value: LayoutMode.MIX, label: "混合布局", className: "mix" },
];

const colorPresets = [...themeColorPresets];

const settingsStore = useSettingsStore();

const sidebarColor = ref(settingsStore.sidebarColorScheme);
const themeMode = computed({
  get: () => settingsStore.theme,
  set: (value: ThemeMode) => {
    settingsStore.theme = value;
  },
});

const selectedThemeColor = computed({
  get: () => settingsStore.themeColor,
  set: (value) => {
    settingsStore.themeColor = value;
  },
});

const drawerVisible = computed({
  get: () => settingsStore.settingsVisible,
  set: (value) => (settingsStore.settingsVisible = value),
});

const changeSidebarColor = (val: any) => {
  settingsStore.sidebarColorScheme = val;
};

const handleLayoutChange = (layout: LayoutMode) => {
  if (settingsStore.layout === layout) return;
  settingsStore.layout = layout;
};

const handleCopySettings = async () => {
  try {
    copyLoading.value = true;
    const configCode = generateSettingsCode();
    await navigator.clipboard.writeText(configCode);
    ElMessage.success({ message: "复制成功", duration: 3000 });
  } catch {
    ElMessage.error("复制配置失败");
  } finally {
    copyLoading.value = false;
  }
};

const handleResetSettings = async () => {
  resetLoading.value = true;
  try {
    settingsStore.resetSettings();
    sidebarColor.value = settingsStore.sidebarColorScheme;
    ElMessage.success("重置成功");
  } catch {
    ElMessage.error("重置配置失败");
  } finally {
    resetLoading.value = false;
  }
};

const generateSettingsCode = (): string => {
  const settings = {
    title: "pkg.name",
    version: "pkg.version",
    showSettings: true,
    showTagsView: settingsStore.showTagsView,
    showAppLogo: settingsStore.showAppLogo,
    layout: `LayoutMode.${settingsStore.layout.toUpperCase()}`,
    theme: `ThemeMode.${settingsStore.theme.toUpperCase()}`,
    size: "ComponentSize.DEFAULT",
    language: "LanguageEnum.ZH_CN",
    themeColor: `"${settingsStore.themeColor}"`,
    showWatermark: settingsStore.showWatermark,
    watermarkContent: "pkg.name",
    sidebarColorScheme: `SidebarColor.${settingsStore.sidebarColorScheme.toUpperCase().replace("-", "_")}`,
  };

  return `const defaultSettings = {
  title: ${settings.title},
  version: ${settings.version},
  showSettings: ${settings.showSettings},
  showTagsView: ${settings.showTagsView},
  showAppLogo: ${settings.showAppLogo},
  layout: ${settings.layout},
  theme: ${settings.theme},
  size: ${settings.size},
  language: ${settings.language},
  themeColor: ${settings.themeColor},
  showWatermark: ${settings.showWatermark},
  watermarkContent: ${settings.watermarkContent},
  sidebarColorScheme: ${settings.sidebarColorScheme},
};`;
};

const handleCloseDrawer = () => {
  settingsStore.settingsVisible = false;
};
</script>

<style lang="scss" scoped>
.settings-drawer {
  :deep(.el-drawer__body) {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    overflow: hidden;
  }
}

.settings-content {
  flex: 1 1 auto;
  padding: 20px;
  overflow-y: auto;
}

.action-buttons {
  display: flex;

  & > .el-button {
    flex: 1;
    font-size: 14px;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
  }
}

.config-section {
  margin-bottom: 24px;

  .config-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--el-border-color-light);
    transition: all 0.3s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      padding-right: 8px;
      padding-left: 8px;
      margin: 0 -8px;
      background-color: var(--el-fill-color-light);
      border-radius: 6px;
    }
  }
}

.layout-select {
  padding: 16px 8px;

  .layout-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    justify-items: center;
  }
}

.layout-item {
  position: relative;
  width: 70px;
  height: 80px;
  overflow: hidden;
  cursor: pointer;
  background: linear-gradient(145deg, var(--el-bg-color) 0%, var(--el-bg-color-page) 100%);
  border: 2px solid var(--el-border-color);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: linear-gradient(
      145deg,
      var(--el-bg-color) 0%,
      var(--el-color-primary-light-9) 100%
    );
    border-color: var(--el-color-primary-light-3);
    transform: translateY(-4px) scale(1.05);
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }

  .layout-preview {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 8px 0 4px 0;
  }

  .layout-header {
    position: absolute;
    top: 0;
    right: 4px;
    left: 4px;
    height: 8px;
    background: linear-gradient(
      90deg,
      var(--el-color-primary) 0%,
      var(--el-color-primary-light-3) 100%
    );
    border-radius: 2px;
  }

  .layout-sidebar {
    position: absolute;
    left: 4px;
    width: 12px;
    background: linear-gradient(
      180deg,
      var(--el-color-primary-dark-2) 0%,
      var(--el-color-primary) 100%
    );
    border-radius: 2px;
  }

  .layout-main {
    position: absolute;
    background: linear-gradient(135deg, var(--el-fill-color-light) 0%, var(--el-fill-color) 100%);
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 2px;
  }

  .layout-name {
    position: absolute;
    right: 0;
    bottom: 6px;
    left: 0;
    font-size: 10px;
    font-weight: 500;
    color: var(--el-text-color-regular);
    text-align: center;
    transition: color 0.3s ease;
  }

  .layout-check {
    position: absolute;
    top: 4px;
    right: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    font-size: 10px;
    color: white;
    background: var(--el-color-success);
    border-radius: 50%;
  }

  &.left {
    .layout-sidebar {
      top: 4px;
      bottom: 4px;
    }
    .layout-main {
      top: 4px;
      right: 4px;
      bottom: 4px;
      left: 20px;
    }
  }

  &.top {
    .layout-header {
      height: 12px;
    }
    .layout-main {
      top: 16px;
      right: 4px;
      bottom: 4px;
      left: 4px;
    }
  }

  &.mix {
    .layout-header {
      height: 10px;
    }
    .layout-sidebar {
      top: 14px;
      bottom: 4px;
    }
    .layout-main {
      top: 14px;
      right: 4px;
      bottom: 4px;
      left: 20px;
    }
  }

  &.is-active {
    background: linear-gradient(
      145deg,
      var(--el-color-primary-light-9) 0%,
      var(--el-color-primary-light-8) 100%
    );
    border-color: var(--el-color-primary);
    transform: translateY(-2px) scale(1.08);

    .layout-name {
      font-weight: 600;
      color: var(--el-color-primary);
    }
  }
}
</style>
