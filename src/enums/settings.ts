/**
 * 设置相关枚举
 */

import type { OptionItem } from "@/api/common";

/** 主题模式 */
export const enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
  AUTO = "auto",
}

/** 侧边栏配色方案 */
export const enum SidebarColor {
  CLASSIC_BLUE = "classic-blue",
  MINIMAL_WHITE = "minimal-white",
}

/** 页签栏风格 */
export const enum TagsViewStyle {
  LINE = "line",
  CARD = "card",
}

/** 菜单布局 */
export const enum LayoutMode {
  LEFT = "left",
  TOP = "top",
  MIX = "mix",
  DOUBLE = "double",
}

/** 侧边栏状态 */
export const enum SidebarStatus {
  OPENED = "opened",
  CLOSED = "closed",
}

/** 组件尺寸 */
export const enum ComponentSize {
  DEFAULT = "default",
  LARGE = "large",
  SMALL = "small",
}

/** 语言 */
export const enum LanguageEnum {
  ZH_CN = "zh-cn",
  EN = "en",
}

/** 设备类型 */
export const enum DeviceEnum {
  DESKTOP = "desktop",
  MOBILE = "mobile",
}

/** 页面切换动画 */
export const enum PageSwitchingAnimationEnum {
  NONE = "none",
  FADE = "fade",
  FADE_SLIDE = "fade-slide",
  FADE_SCALE = "fade-scale",
}

export const PageSwitchingAnimationOptions: Record<string, OptionItem> = {
  none: { value: "none", label: "无动画" },
  fade: { value: "fade", label: "淡入淡出" },
  "fade-slide": { value: "fade-slide", label: "平滑切换" },
  "fade-scale": { value: "fade-scale", label: "缩放切换" },
};
