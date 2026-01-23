/**
 * 通知发布状态枚举
 */
export enum NoticePublishStatusEnum {
  DRAFT = 1, // 草稿
  PUBLISHED = 2, // 已发布
  REVOKED = 3, // 已撤回
}

/**
 * 通知类型枚举
 */
export enum NoticeTypeEnum {
  SYSTEM = "system", // 系统公告
  MAINTENANCE = "maintenance", // 维护通知
  UPDATE = "update", // 功能更新
  REMIND = "remind", // 重要提醒
}

/**
 * 通知等级枚举
 */
export enum NoticeLevelEnum {
  INFO = "info", // 普通
  SUCCESS = "success", // 提醒
  WARNING = "warning", // 警告
  ERROR = "error", // 紧急
}

/**
 * 通知应用枚举
 */
export enum NoticeAppEnum {
  BLOG = "blog-web", // 博客
  ADMIN = "admin-web", // 管理
}
