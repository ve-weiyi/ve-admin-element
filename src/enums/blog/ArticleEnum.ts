/**
 * 文章置顶枚举
 */
export const enum ArticleTopEnum {
  // 全部
  ALL = -1,
  // 不置顶
  NO = 2,
  // 置顶
  YES = 1,
}

/**
 * 文章删除枚举
 */
export const enum ArticleDeleteEnum {
  // 全部
  ALL = -1,
  // 删除
  NO = 0,
  // 未删除
  YES = 1,
}

/**
 * 文章状态枚举
 */
export const enum ArticleStatusEnum {
  // 全部
  ALL = 0,

  // 公开
  PUBLIC = 1,

  // 私密
  PRIVATE = 2,

  // 草稿
  DRAFT = 3,
}

/**
 * 文章类型枚举
 */
export const enum ArticleTypeEnum {
  // 全部
  ALL = 0,

  // 原创
  ORIGINAL = 1,

  // 转载
  REPRINT = 2,

  // 翻译
  TRANSLATE = 3,
}
