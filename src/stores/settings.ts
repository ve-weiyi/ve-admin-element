import { SidebarColor, ThemeMode } from "@/enums";
import type { LayoutMode } from "@/enums";
import {
  applyTheme,
  generateThemeColors,
  resolveThemeMode,
  toggleDarkMode,
  toggleSidebarColor,
  watchSystemTheme,
} from "@/utils/theme";
import { STORAGE_KEYS } from "@/constants";
import { defaults } from "@/settings";

export const useSettingsStore = defineStore("setting", () => {
  // 界面显示
  const settingsVisible = ref(false);
  const showTagsView = useStorage(STORAGE_KEYS.SHOW_TAGS_VIEW, defaults.showTagsView);
  const showAppLogo = useStorage(STORAGE_KEYS.SHOW_APP_LOGO, defaults.showAppLogo);
  const showWatermark = useStorage(STORAGE_KEYS.SHOW_WATERMARK, defaults.showWatermark);
  const pageSwitchingAnimation = useStorage(
    STORAGE_KEYS.PAGE_SWITCHING_ANIMATION,
    defaults.pageSwitchingAnimation
  );

  // 布局
  const layout = useStorage<LayoutMode>(STORAGE_KEYS.LAYOUT, defaults.layout as LayoutMode);
  const sidebarColorScheme = useStorage(
    STORAGE_KEYS.SIDEBAR_COLOR_SCHEME,
    defaults.sidebarColorScheme
  );

  // 主题
  const theme = useStorage<ThemeMode>(STORAGE_KEYS.THEME, defaults.theme);
  const themeColor = useStorage(STORAGE_KEYS.THEME_COLOR, defaults.themeColor);

  // 旧默认值 → 新默认值 自动迁移
  const LEGACY_DEFAULTS = ["#4080FF", "#4080ff", "#2563EB", "#2563eb"];
  if (LEGACY_DEFAULTS.includes(themeColor.value)) {
    themeColor.value = defaults.themeColor;
  }
  const resolvedTheme = ref<ThemeMode>(resolveThemeMode(theme.value));

  // 特殊模式
  const grayMode = useStorage(STORAGE_KEYS.GRAY_MODE, false);
  const colorWeak = useStorage(STORAGE_KEYS.COLOR_WEAK, false);

  // 主题模式切换：AUTO 时跟随系统，手动切换时停掉系统监听
  let stopWatchingSystemTheme: (() => void) | undefined;

  watch(
    theme,
    (value: ThemeMode) => {
      stopWatchingSystemTheme?.();
      resolvedTheme.value = resolveThemeMode(value);
      if (value === ThemeMode.AUTO) {
        stopWatchingSystemTheme = watchSystemTheme((systemTheme: ThemeMode) => {
          resolvedTheme.value = systemTheme;
        });
      }
    },
    { immediate: true }
  );

  // 主题色/暗黑切换
  watch(
    [resolvedTheme, themeColor],
    ([t, c]: [ThemeMode, string]) => {
      toggleDarkMode(t === ThemeMode.DARK);
      applyTheme(generateThemeColors(c, t));
    },
    { immediate: true }
  );

  watch(sidebarColorScheme, (v: string) => toggleSidebarColor(v === SidebarColor.CLASSIC_BLUE), {
    immediate: true,
  });

  // 灰色模式监听
  watch(
    grayMode,
    (v: boolean) => {
      document.documentElement.style.filter = v ? "grayscale(100%)" : "";
    },
    { immediate: true }
  );

  // 色弱模式监听
  watch(
    colorWeak,
    (v: boolean) => {
      document.documentElement.classList.toggle("color-weak", v);
    },
    { immediate: true }
  );

  function resetSettings() {
    showTagsView.value = defaults.showTagsView;
    showAppLogo.value = defaults.showAppLogo;
    showWatermark.value = defaults.showWatermark;
    pageSwitchingAnimation.value = defaults.pageSwitchingAnimation;
    grayMode.value = false;
    colorWeak.value = false;
    sidebarColorScheme.value = defaults.sidebarColorScheme;
    layout.value = defaults.layout as LayoutMode;
    themeColor.value = defaults.themeColor;
    theme.value = defaults.theme;
  }

  return {
    settingsVisible,
    showTagsView,
    showAppLogo,
    showWatermark,
    pageSwitchingAnimation,
    grayMode,
    colorWeak,
    sidebarColorScheme,
    layout,
    themeColor,
    theme,
    resolvedTheme,
    resetSettings,
  };
});
