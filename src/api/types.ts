// 仅保留被三个 API 文件引用的类型定义
export interface BatchResp {
  success_count: number;
}

export interface AddNoticeReq {
  title: string; // 通知标题
  content: string; // 通知内容
  type: string; // 通知类型
  level: string; // 通知等级
  app_name?: string; // 目标应用名称
}

export interface DeleteUserBindThirdPartyReq {
  platform: string; // 平台
}

export interface DeletesUploadFileReq {
  file_paths?: string[]; // 文件路径
}

export interface EmailLoginReq {
  email: string; // 邮箱
  password: string; // 密码
  captcha_key?: string; // 验证码key
  captcha_code?: string; // 验证码
}

export interface EmptyReq {}

export interface EmptyResp {}

export interface FileInfoVO {
  file_path: string; // 文件路径
  file_name: string; // 文件名称
  file_type: string; // 文件类型
  file_size: number; // 文件大小
  file_url: string; // 上传路径
  updated_at: number; // 更新时间
}

export interface GetCaptchaCodeReq {
  width?: number; // 宽度
  height?: number; // 高度
}

export interface GetCaptchaCodeResp {
  captcha_key: string; // 验证码key
  captcha_base64: string; // 验证码base64
  captcha_code: string; // 验证码
}

export interface GetClientInfoReq {}

export interface GetClientInfoResp {
  id: number; // 访客唯一ID
  terminal_id: string; // 终端ID
  os: string; // 操作系统
  browser: string; // 浏览器
  ip_address: string; // IP地址
  ip_source: string; // IP归属地
}

export interface GetOauthAuthorizeUrlReq {
  platform: string; // 平台
  state?: string; // 状态
}

export interface GetOauthAuthorizeUrlResp {
  authorize_url: string; // 授权地址
}

export interface IdReq {
  id: number;
}

export interface IdsReq {
  ids: number[];
}

export interface ListUploadFileReq {
  file_path?: string; // 文件路径
  limit?: number; // 限制
}

export interface LoginReq {
  username: string;
  password: string;
  captcha_key?: string; // 验证码key
  captcha_code?: string; // 验证码
}

export interface LoginResp {
  user_id: string; // 用户id
  scope: string; // 作用域
  token?: Token;
}

export interface MultiUploadFileReq {
  files?: any[]; // 文件列表
  file_path?: string; // 文件路径
}

export interface NoticeBackVO {
  id?: number; // 主键ID
  title: string; // 通知标题
  content: string; // 通知内容
  type: string; // 通知类型
  level: string; // 通知等级
  app_name: string; // 目标应用名称
  publisher_id: string; // 发布人ID
  publish_status: number; // 发布状态
  publish_time: number; // 发布时间
  revoke_time: number; // 撤回时间
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface PageQuery {
  page?: number; // 当前页码
  page_size?: number; // 每页数量
  sorts?: string[]; // 排序
}

export interface PageResp {
  page: number;
  page_size: number;
  total: number;
  list: any;
}

export interface PhoneLoginReq {
  phone: string; // 手机号
  verify_code: string; // 验证码
}

export interface QueryNoticeReq extends PageQuery {
  type?: string; // 通知类型
  level?: string; // 通知等级
  publish_status?: number; // 发布状态
  app_name?: string; // 目标应用名称
}

export interface QueryUserLoginHistoryReq extends PageQuery {}

export interface QueryUserNoticeReq extends PageQuery {}

export interface RefreshTokenReq {
  user_id: string; // 用户id
  grant_type: string; // 授权类型
  refresh_token: string; // 刷新令牌
}

export interface RegisterReq {
  username: string;
  password: string;
  confirm_password: string; // 确认密码
  email: string; // 邮箱
  verify_code: string; // 验证码
}

export interface ResetPasswordReq {
  password: string;
  confirm_password: string; // 确认密码
  email: string;
  verify_code: string; // 验证码
}

export interface SendEmailVerifyCodeReq {
  email: string; // 邮箱
  type: string; // 类型 register,reset_password,bind_email,bind_phone
}

export interface SendPhoneVerifyCodeReq {
  phone: string; // 手机号
  type: string; // 类型 register,reset_password,bind_email,bind_phone
}

export interface ThirdLoginReq {
  platform: string; // 平台
  code?: string; // 授权码
}

export interface Token {
  token_type: string; // Token 类型（如 "Bearer"）
  access_token: string; // 访问令牌：用于接口访问，有效期短
  expires_in: number; // AccessToken 有效期（秒），如 3600（1小时）
  refresh_token: string; // 刷新令牌：仅用于刷新 AccessToken，有效期长
  refresh_expires_in: number; // RefreshToken 有效期（秒），如 604800（7天）
  refresh_expires_at: number; // RefreshToken 过期时间戳（秒）
}

export interface UpdateNoticeReq {
  id: number; // 主键ID
  title: string; // 通知标题
  content: string; // 通知内容
  type: string; // 通知类型
  level: string; // 通知等级
  app_name?: string; // 目标应用名称
}

export interface UpdateNoticeStatusReq {
  id: number; // 主键ID
  publish_status: number; // 发布状态
}


export interface UpdateUserAvatarReq {
  avatar: string; // 头像
}

export interface UpdateUserBindEmailReq {
  email: string; // 邮箱
  verify_code: string; // 验证码
}

export interface UpdateUserBindPhoneReq {
  phone: string; // 手机号
  verify_code: string; // 验证码
}

export interface UpdateUserBindThirdPartyReq {
  platform: string; // 平台
  code: string; // 授权码
  state?: string; // 状态
}

export interface UpdateUserInfoReq extends UserInfoExt {
  nickname: string; // 昵称
}

export interface UpdateUserPasswordReq {
  old_password: string; // 旧密码
  new_password: string; // 新密码
  confirm_password: string; // 确认密码
}

export interface UploadFileReq {
  file?: any; // 文件
  file_path?: string; // 文件路径
}

export interface UserApisResp {
  list: UserApi[];
}

export interface UserApi {
  id?: number; // 主键id
  parent_id: number; // 父id
  name: string; // api名称
  path: string; // api路径
  method: string; // api请求方法
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
  children: UserApi[];
}

export interface UserInfoExt {
  gender?: number; // 性别 0未知 1男 2女
  intro?: string; // 简介
  website?: string; // 网站
}

export interface UserInfoResp extends UserInfoExt {
  user_id: string; // 用户id
  username: string; // 用户名
  nickname: string; // 用户昵称
  avatar: string; // 用户头像
  email: string; // 用户邮箱
  phone: string; // 用户手机号
  created_at: number; // 创建时间
  register_type: string; // 注册方式
  third_party: UserThirdPartyInfo[];
  roles: string[];
  perms: string[];
}

export interface UserThirdPartyInfo {
  platform: string; // 平台
  open_id: string; // 平台用户id
  nickname: string; // 昵称
  avatar: string; // 头像
  created_at: number; // 创建时间
}

export interface UserMenusResp {
  list: UserMenu[];
}

export interface UserMenu {
  id?: number; // 主键
  parent_id: number; // 父id
  path: string; // 路由地址
  name: string; // 路由名字
  component: string; // Layout组件
  redirect: string; // 路由重定向
  meta: UserMenuMeta; // meta配置
  children?: UserMenu[];
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface UserMenuMeta {
  title?: string;
  icon?: string;
  hidden?: boolean;
  always_show?: boolean;
  affix?: boolean;
  keep_alive?: boolean;
  breadcrumb?: boolean;
}

export interface UserRolesResp {
  list: UserRole[];
}

export interface UserRole {
  id?: number; // 主键id
  parent_id: number; // 父id
  role_key: string; // 角色名
  role_label: string; // 角色标签
  role_comment: string; // 角色备注
}
