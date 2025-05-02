export interface AboutMe {
  content: string;
}

export interface AccountQuery extends PageQuery {
  username?: string;
  nickname?: string;
}

export interface AdminHomeInfo {
  user_count: number; // 用户量
  article_count: number; // 文章量
  remark_count: number; // 留言量
  category_list: CategoryVO[]; // 分类列表
  tag_list: TagVO[]; // 标签列表
  article_view_ranks: ArticleViewVO[]; // 文章浏览量排行
  article_statistics: ArticleStatisticsVO[]; // 文章提交统计
}

export interface AlbumBackVO {
  id?: number; // 主键
  album_name: string; // 相册名
  album_desc: string; // 相册描述
  album_cover: string; // 相册封面
  is_delete: number; // 是否删除
  status: number; // 状态值 1公开 2私密
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
  photo_count: number; // 照片数量
}

export interface AlbumNewReq {
  id?: number; // 主键
  album_name: string; // 相册名
  album_desc: string; // 相册描述
  album_cover: string; // 相册封面
  is_delete: number; // 是否删除
  status: number; // 状态值 1公开 2私密
}

export interface AlbumQuery extends PageQuery {
  album_name?: string; // 相册名
}

export interface ApiBackVO {
  id?: number; // 主键id
  parent_id: number; // 分组id
  name: string; // api名称
  path: string; // api路径
  method: string; // api请求方法
  traceable: number; // 是否追溯操作记录 0需要，1是
  is_disable?: number; // 是否禁用 0否 1是
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
  children: ApiBackVO[];
}

export interface ApiNewReq {
  id?: number; // 主键id
  parent_id: number; // 分组id
  name: string; // api名称
  path: string; // api路径
  method: string; // api请求方法
  traceable: number; // 是否追溯操作记录 0需要，1是
  is_disable?: number; // 是否禁用 0否 1是
}

export interface ApiQuery extends PageQuery {
  name?: string; // api名称
  path?: string; // api路径
  method?: string; // api请求方法
}

export interface ArticleBackVO {
  id?: number; // 文章ID
  article_cover: string; // 文章缩略图
  article_title: string; // 标题
  article_content: string; // 内容
  article_type: number; // 文章类型 1原创 2转载 3翻译
  original_url: string; // 原文链接
  is_top: number; // 是否置顶
  is_delete: number; // 是否删除
  status: number; // 状态值 1 公开 2 私密 3 草稿 4 已删除
  created_at: number; // 发表时间
  updated_at: number; // 更新时间
  category_name: string; // 文章分类名
  tag_name_list: string[]; // 文章标签列表
  like_count: number; // 点赞量
  views_count: number; // 浏览量
}

export interface ArticleNewReq {
  id?: number; // id
  article_cover: string; // 文章缩略图
  article_title: string; // 标题
  article_content: string; // 内容
  article_type: number; // 文章类型 1原创 2转载 3翻译
  original_url: string; // 原文链接
  status: number; // 状态值 1 公开 2 私密 3 草稿 4 已删除
  category_name?: string; // 文章分类名
  tag_name_list?: string[]; // 文章标签列表
}

export interface ArticleQuery extends PageQuery {
  article_title?: string; // 标题
  article_type?: number; // 文章类型 1原创 2转载 3翻译
  is_top?: number; // 是否置顶
  is_delete?: number; // 是否删除
  status?: number; // 状态值 1 公开 2 私密 3 草稿 4 已删除
  category_name?: string; // 文章分类名
  tag_name?: string;
}

export interface ArticleRecycleReq {
  id?: number; // 文章ID
  is_delete: number; // 是否删除
}

export interface ArticleStatisticsVO {
  date: string; // 日期
  count: number; // 数量
}

export interface ArticleTopReq {
  id?: number; // 文章ID
  is_top: number; // 是否置顶
}

export interface ArticleViewVO {
  id?: number; // 文章ID
  article_title: string; // 文章标题
  view_count: number; // 浏览量
}

export interface BatchResp {
  success_count: number;
}

export interface BindUserEmailReq {
  email: string; // 邮箱
  verify_code: string; // 验证码
}

export interface CategoryBackVO {
  id?: number;
  category_name: string; // 分类名
  article_count: number;
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface CategoryNewReq {
  id?: number;
  category_name: string; // 分类名
}

export interface CategoryQuery extends PageQuery {
  category_name?: string; // 分类名
}

export interface CategoryVO {
  id?: number;
  category_name: string; // 分类名
  article_count: number; // 文章数量
}

export interface CommentBackVO {
  id: number; // 评论ID
  type: number; // 评论类型 1.文章 2.友链 3.说说
  topic_title: string; // 评论主题
  user_id: string; // 用户ID
  reply_user_id: string; // 回复用户ID
  comment_content: string; // 评论内容
  is_review: number; // 是否审核 0.未审核 1.已审核
  created_at: number; // 创建时间
  user?: UserInfo; // 用户信息
  reply_user?: UserInfo; // 回复用户信息
}

export interface CommentQuery extends PageQuery {
  avatar?: string; // 用户头像
  is_review?: number;
  type?: number; // 评论类型 1.文章 2.友链 3.说说
}

export interface CommentReviewReq {
  ids?: number[];
  is_review?: number;
}

export interface EmptyReq {}

export interface EmptyResp {}

export interface FileBackVO {
  id?: number; // 文件目录ID
  user_id: string; // 用户id
  file_path: string; // 文件路径
  file_name: string; // 文件名称
  file_type: string; // 文件类型
  file_size: number; // 文件大小
  file_md5: string; // 文件md5值
  file_url: string; // 上传路径
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
  creator?: UserInfo; // 创建人
}

export interface FileFolderNewReq {
  file_path: string; // 文件路径
  file_name: string; // 文件名称
}

export interface FileQuery extends PageQuery {
  file_path?: string; // 文件路径
  file_type?: string; // 文件类型
}

export interface FriendBackVO {
  id?: number; // id
  link_name: string; // 链接名
  link_avatar: string; // 链接头像
  link_address: string; // 链接地址
  link_intro: string; // 链接介绍
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface FriendNewReq {
  id?: number; // id
  link_name: string; // 链接名
  link_avatar: string; // 链接头像
  link_address: string; // 链接地址
  link_intro: string; // 链接介绍
}

export interface FriendQuery extends PageQuery {
  link_name?: string; // 链接名
}

export interface GetUserAreaStatsReq {
  user_type?: number; // 用户类型: 0注册用户 1游客
}

export interface GetUserAreaStatsResp {
  user_areas: UserAreaVO[]; // 用户分布地区
  tourist_areas: UserAreaVO[]; // 游客分布地区
}

export interface GetVisitStatsResp {
  today_uv_count: number; // 今日访客数(UV)
  total_uv_count: number; // 总访客数
  uv_growth_rate: number; // 访客数同比增长率（相对于昨天同一时间段的增长率）
  today_pv_count: number; // 今日浏览量(PV)
  total_pv_count: number; // 总浏览量
  pv_growth_rate: number; // 同比增长率（相对于昨天同一时间段的增长率）
}

export interface GetVisitTrendReq {
  start_date: string; // 开始日期
  end_date?: string; // 结束日期
}

export interface GetVisitTrendResp {
  visit_trend: VisitTrendVO[]; // 访客数和浏览量趋势
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

export interface ListUploadFileResp {
  urls: string[]; // 文件路径
}

export interface LoginLogBackVO {
  id?: number;
  user_id: string; // 用户id
  login_type: string; // 登录类型
  app_name: string; // 应用名称
  os: string; // 操作系统
  browser: string; // 浏览器
  ip_address: string; // ip host
  ip_source: string; // ip 源
  login_at: number; // 登录时间
  logout_at: number; // 登出时间
  user?: UserInfo; // 用户信息
}

export interface LoginLogQuery extends PageQuery {
  user_id?: string; // 用户id
}

export interface LoginReq {
  username: string;
  password: string;
  captcha_key?: string; // 验证码key
  captcha_code?: string; // 验证码
}

export interface LoginResp {
  token?: Token;
}

export interface MenuBackVO extends MenuMeta {
  id?: number; // 主键
  parent_id?: number; // 父id
  path?: string; // 路由地址
  name?: string; // 路由名字
  component?: string; // Layout组件
  redirect?: string; // 路由重定向
  children?: MenuBackVO[];
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface MenuMeta {
  type?: string; // 菜单类型（0代表目录、1代表菜单、2代表按钮、3代表外链）
  title?: string; // 菜单标题
  icon?: string; // 菜单图标
  rank?: number; // 排序
  perm?: string; // 权限标识
  params?: MenuMetaParams[]; // 参数
  keep_alive?: number; // 是否缓存
  always_show?: number; // 是否一直显示菜单
  is_hidden?: number; // 是否隐藏
  is_disable?: number; // 是否禁用
}

export interface MenuMetaParams {
  key?: string;
  value?: string;
}

export interface MenuNewReq extends MenuMeta {
  id?: number; // 主键
  parent_id?: number; // 父id
  path?: string; // 路由地址
  name?: string; // 路由名字
  component?: string; // Layout组件
  redirect?: string; // 路由重定向
  children?: MenuNewReq[];
}

export interface MenuQuery extends PageQuery {
  name?: string; // 路由名字
  title?: string; // 菜单标题
}

export interface MultiUploadFileReq {
  files?: any[]; // 文件列表
  file_path?: string; // 文件路径
}

export interface OauthLoginReq {
  platform: string; // 平台
  code?: string; // 授权码
  state?: string; // 状态
}

export interface OauthLoginUrlResp {
  url: string; // 授权地址
}

export interface OperationLogBackVO {
  id?: number; // 主键id
  user_id: string; // 用户id
  ip_address: string; // 操作ip
  ip_source: string; // 操作地址
  opt_module: string; // 操作模块
  opt_desc: string; // 操作描述
  request_uri: string; // 请求地址
  request_method: string; // 请求方式
  request_data: string; // 请求参数
  response_data: string; // 返回数据
  response_status: number; // 响应状态码
  cost: string; // 耗时（ms）
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
  user?: UserInfo; // 用户信息
}

export interface OperationLogQuery extends PageQuery {}

export interface PageBackVO {
  id?: number; // 页面id
  page_name: string; // 页面名
  page_label: string; // 页面标签
  page_cover: string; // 页面封面
  is_carousel: number; // 是否轮播
  carousel_covers: string[]; // 轮播封面
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface PageNewReq {
  id?: number; // 页面id
  page_name: string; // 页面名
  page_label: string; // 页面标签
  page_cover: string; // 页面封面
  is_carousel?: number; // 是否轮播
  carousel_covers?: string[]; // 轮播封面
}

export interface PageQuery {
  page?: number; // 当前页码
  page_size?: number; // 每页数量
  sorts?: string[]; // 排序
}

export interface PageQueryReq extends PageQuery {
  page_name?: string; // 页面名
}

export interface PageResp {
  page: number;
  page_size: number;
  total: number;
  list: any;
}

export interface PhotoBackVO {
  id?: number; // 主键
  album_id: number; // 相册id
  photo_name: string; // 照片名
  photo_desc: string; // 照片描述
  photo_src: string; // 照片地址
  is_delete: number; // 是否删除
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface PhotoNewReq {
  id?: number; // 主键
  album_id: number; // 相册id
  photo_name: string; // 照片名
  photo_desc: string; // 照片描述
  photo_src: string; // 照片地址
  is_delete: number; // 是否删除
}

export interface PhotoQuery extends PageQuery {
  album_id?: number; // 相册id
}

export interface PingReq {}

export interface PingResp {
  env: string;
  name: string;
  version: string;
  runtime: string;
  description: string;
  rpc_status: string[];
}

export interface RegisterReq {
  username: string;
  password: string;
  verify_code: string; // 验证码
}

export interface RemarkBackVO {
  id?: number; // 主键id
  user_id: string; // 用户ID
  message_content: string; // 留言内容
  ip_address: string; // 用户ip
  ip_source: string; // 用户地址
  time: number; // 弹幕速度
  is_review: number; // 是否审核
  created_at: number; // 发布时间
  updated_at: number; // 更新时间
  user?: UserInfo; // 用户信息
}

export interface RemarkQuery extends PageQuery {
  nickname?: string; // 昵称
  is_review?: number; // 是否审核
}

export interface RemarkReviewReq {
  ids?: number[];
  is_review: number; // 是否审核
}

export interface ResetPasswordReq {
  username: string;
  password: string;
  verify_code: string; // 验证码
}

export interface Response {
  code: number;
  message: string;
  data: any;
  trace_id: string;
}

export interface RestHeader {
  header_country?: string;
  header_language?: string;
  header_timezone?: string;
  header_app_name?: string;
  header_x_user_id?: string;
  header_x_auth_token?: string;
  header_terminal_id?: string;
}

export interface RoleBackVO {
  id?: number; // 主键id
  parent_id: number; // 父角色id
  role_key: string; // 角色名
  role_label: string; // 角色标签
  role_comment: string; // 角色备注
  is_disable: number; // 是否禁用  0否 1是
  is_default: number; // 是否默认角色 0否 1是
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface RoleNewReq {
  id?: number; // 主键id
  parent_id?: number; // 父角色id
  role_key: string; // 角色名
  role_label: string; // 角色标签
  role_comment: string; // 角色备注
  is_disable: number; // 是否禁用  0否 1是
  is_default: number; // 是否默认角色 0否 1是
}

export interface RoleQuery extends PageQuery {
  role_key?: string; // 角色名
  role_label?: string; // 角色标签
  is_disable?: number; // 是否禁用  0否 1是
}

export interface RoleResourcesResp {
  role_id: number;
  api_ids: number[];
  menu_ids: number[];
}

export interface SendEmailVerifyCodeReq {
  email: string; // 邮箱
  type: string; // 类型 register,reset_password,bind_email,bind_phone
}

export interface SendPhoneVerifyCodeReq {
  phone: string; // 手机号
  type: string; // 类型 register,reset_password,bind_email,bind_phone
}

export interface Server {
  os: any;
  cpu: any;
  ram: any;
  disk: any;
}

export interface SyncApiReq {
  api_file_path: string; // api文件路径
}

export interface SyncMenuReq {
  menus: MenuNewReq[];
}

export interface TagBackVO {
  id?: number; // 标签ID
  tag_name: string; // 标签名
  article_count: number; // 文章数量
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface TagNewReq {
  id?: number;
  tag_name: string; // 标签名
}

export interface TagQuery extends PageQuery {
  tag_name?: string; // 标签名
}

export interface TagVO {
  id?: number; // 标签ID
  tag_name: string; // 标签名
  article_count: number; // 文章数量
}

export interface TalkBackVO {
  id?: number; // 说说ID
  user_id: string; // 用户ID
  content: string; // 说说内容
  img_list: string[]; // 图片URL列表
  is_top: number; // 是否置顶
  status: number; // 状态 1.公开 2.私密
  like_count: number; // 点赞量
  comment_count: number; // 评论量
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
  user?: UserInfo; // 用户信息
}

export interface TalkNewReq {
  id?: number; // 说说ID
  content: string; // 说说内容
  img_list: string[]; // 图片URL列表
  is_top: number; // 是否置顶
  status: number; // 状态 1.公开 2.私密
}

export interface TalkQuery extends PageQuery {
  status?: number; // 状态 1.公开 2.私密
}

export interface Token {
  user_id: string; // 用户id
  token_type: string; // token类型,Bearer
  access_token: string; // 访问token,过期时间较短。2h
  expires_in: number; // 访问token过期时间
  refresh_token: string; // 刷新token,过期时间较长。30d
  refresh_expires_in: number; // 刷新token过期时间
  scope: string; // 作用域
}

export interface UpdateAccountPasswordReq {
  user_id: string;
  password: string;
}

export interface UpdateAccountRolesReq {
  user_id: string;
  role_ids: number[];
}

export interface UpdateAccountStatusReq {
  user_id: string;
  status: number; // 状态: -1删除 0正常 1禁用
}

export interface UpdateRoleApisReq {
  role_id: number;
  api_ids: number[];
}

export interface UpdateRoleMenusReq {
  role_id: number;
  menu_ids: number[];
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

export interface UserApisResp {
  list: UserApi[];
}

export interface UserAreaVO {
  name: string;
  value: number;
}

export interface UserInfo {
  user_id: string;
  username: string;
  avatar: string;
  nickname: string;
}

export interface UserInfoExt {
  gender: number; // 性别 0未知 1男 2女
  intro: string; // 简介
  website: string; // 网站
}

export interface UserInfoResp extends UserInfoExt {
  user_id: string; // 用户id
  username: string; // 用户名
  nickname: string; // 用户昵称
  avatar: string; // 用户头像
  email: string; // 用户邮箱
  phone: string; // 用户手机号
  status: number; // 状态
  login_type: string; // 登录方式
  ip_address: string; // ip host
  ip_source: string; // ip 源
  created_at: number;
  updated_at: number;
  roles: UserRoleLabel[];
  perms: UserApi[];
}

export interface UserLoginHistory {
  id?: number;
  login_type: string; // 登录类型
  os: string; // 操作系统
  browser: string; // 浏览器
  ip_address: string; // ip host
  ip_source: string; // ip 源
  login_at: number; // 登录时间
  logout_at: number; // 登出时间
}

export interface UserLoginHistoryQuery extends PageQuery {}

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

export interface UserMenusResp {
  list: UserMenu[];
}

export interface UserRole {
  id?: number; // 主键id
  parent_id: number; // 父id
  role_key: string; // 角色名
  role_label: string; // 角色标签
  role_comment: string; // 角色备注
}

export interface UserRoleLabel {
  role_id: number;
  role_key: string;
  role_label: string;
}

export interface UserRolesResp {
  list: UserRole[];
}

export interface VisitLogBackVO {
  id?: number; // 主键id
  user_id: string; // 用户id
  terminal_id: string; // 终端id
  page_name: string; // 页面
  ip_address: string; // 操作ip
  ip_source: string; // 操作地址
  os: string; // 操作系统
  browser: string; // 浏览器
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
  user?: UserInfo; // 用户信息
}

export interface VisitLogQuery extends PageQuery {
  user_id?: string; // 用户id
  terminal_id?: string; // 终端id
  page_name?: string; // 页面
}

export interface VisitTrendVO {
  date: string; // 日期
  uv_count: number; // 访客数
  pv_count: number; // 浏览量
}

export interface WebsiteConfig {
  admin_url: string; // 后台地址
  alipay_qr_code: string; // 支付宝二维码
  gitee: string; // Gitee
  github: string; // Github
  is_chat_room: number; // 是否开启聊天室
  is_comment_review: number; // 是否开启评论审核
  is_email_notice: number; // 是否开启邮件通知
  is_message_review: number; // 是否开启留言审核
  is_music_player: number; // 是否开启音乐播放器
  is_reward: number; // 是否开启打赏
  qq: string; // QQ
  social_login_list: string[]; // 社交登录列表
  social_url_list: string[]; // 社交地址列表
  tourist_avatar: string; // 游客头像
  user_avatar: string; // 用户头像
  website_author: string; // 网站作者
  website_avatar: string; // 网站头像
  website_create_time: string; // 网站创建时间
  website_intro: string; // 网站介绍
  website_name: string; // 网站名称
  website_notice: string; // 网站公告
  website_record_no: string; // 网站备案号
  websocket_url: string; // websocket地址
  weixin_qr_code: string; // 微信二维码
}
