/**
 * 开关状态枚举
 */
export enum SwitchStatusEnum {
  DISABLED = 0,
  ENABLED = 1,
}

export enum CommentStatusEnum {
  /** 正常状态 */
  NORMAL = 0,
  /** 已编辑 */
  EDITED = 1,
  /** 已删除（软删除） */
  DELETED = 2,
}

export enum CommentTypeEnum {
  ALL = 0,
  ARTICLE = 1,
  FRIEND = 2,
  TALK = 3,
}
