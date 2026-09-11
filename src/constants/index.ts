export const APP_PREFIX = "vea";

export const ROLE_ROOT = "ROOT";

export const STORAGE_KEYS = {
  // 认证
  ACCESS_TOKEN: `${APP_PREFIX}:auth:access_token`,
  REFRESH_TOKEN: `${APP_PREFIX}:auth:refresh_token`,
  REMEMBER_ME: `${APP_PREFIX}:auth:remember_me`,

  // 系统
  DICT_CACHE: `${APP_PREFIX}:system:dict_cache`,

  // UI 设置
  SHOW_TAGS_VIEW: `${APP_PREFIX}:ui:show_tags_view`,
  TAGS_VIEW_STYLE: `${APP_PREFIX}:ui:tags_view_style`,
  SHOW_APP_LOGO: `${APP_PREFIX}:ui:show_app_logo`,
  SHOW_WATERMARK: `${APP_PREFIX}:ui:show_watermark`,
  PAGE_SWITCHING_ANIMATION: `${APP_PREFIX}:ui:page_switching_animation`,
  LAYOUT: `${APP_PREFIX}:ui:layout`,
  SIDEBAR_COLOR_SCHEME: `${APP_PREFIX}:ui:sidebar_color_scheme`,
  THEME: `${APP_PREFIX}:ui:theme`,
  THEME_PALETTE: `${APP_PREFIX}:ui:theme_palette`,
  THEME_COLORS: `${APP_PREFIX}:ui:theme_colors`,
  GRAY_MODE: `${APP_PREFIX}:ui:gray_mode`,
  COLOR_WEAK: `${APP_PREFIX}:ui:color_weak`,

  // 应用状态
  DEVICE: `${APP_PREFIX}:app:device`,
  SIZE: `${APP_PREFIX}:app:size`,
  LANGUAGE: `${APP_PREFIX}:app:language`,
  SIDEBAR_STATUS: `${APP_PREFIX}:app:sidebar_status`,
  ACTIVE_TOP_MENU_PATH: `${APP_PREFIX}:app:active_top_menu_path`,
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
