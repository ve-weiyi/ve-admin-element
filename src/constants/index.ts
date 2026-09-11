export const APP_PREFIX = "vea";

export const ROLE_ROOT = "ROOT";

/** 默认头像，用于用户未设置头像时的兜底 */
export const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23e5e7eb'/%3E%3Ccircle cx='20' cy='15' r='7' fill='%239ca3af'/%3E%3Cpath d='M6 40c0-7.7 6.3-14 14-14s14 6.3 14 14z' fill='%239ca3af'/%3E%3C/svg%3E";

export const STORAGE_KEYS = {
  // 认证
  ACCESS_TOKEN: `${APP_PREFIX}:auth:access_token`,
  REFRESH_TOKEN: `${APP_PREFIX}:auth:refresh_token`,
  REMEMBER_ME: `${APP_PREFIX}:auth:remember_me`,
  UID: `${APP_PREFIX}:auth:uid`,
  DEVICE_ID: `${APP_PREFIX}:auth:device_id`,

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
