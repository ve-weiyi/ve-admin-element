export interface AboutMe {
  content: string;
}

export interface AdminHomeInfo {
  views_count: number; // 访问量
  message_count: number; // 留言量
  user_count: number; // 用户量
  article_count: number; // 文章量
  category_list: CategoryDTO[]; // 分类列表
  tag_list: TagDTO[]; // 标签列表
  article_view_rank_list: ArticleViewRankDTO[]; // 文章浏览量排行
  article_statistics_list: ArticleStatisticsDTO[]; // 每日文章生产量
  unique_view_list: UniqueViewDTO[]; // 每日用户访问量
}

export interface AlbumBackDTO {
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

export interface AlbumQuery extends PageQuery {}

export interface ApiBackDTO {
  id?: number; // 主键id
  name: string; // api名称
  path: string; // api路径
  method: string; // api请求方法
  parent_id: number; // 分组id
  traceable: number; // 是否追溯操作记录 0需要，1是
  status: number; // 状态 1开，2关
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
  children: ApiBackDTO[];
}

export interface ApiNewReq {
  id?: number; // 主键id
  name: string; // api名称
  path: string; // api路径
  method: string; // api请求方法
  parent_id: number; // 分组id
  traceable: number; // 是否追溯操作记录 0需要，1是
  status: number; // 状态 1开，2关
}

export interface ApiQuery extends PageQuery {
  name?: string; // api名称
  method?: string; // api请求方法
}

export interface ArticleBackDTO {
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

export interface ArticleStatisticsDTO {
  date: string; // 日期
  count: number; // 数量
}

export interface ArticleTopReq {
  id?: number; // 文章ID
  is_top: number; // 是否置顶
}

export interface ArticleViewRankDTO {
  id?: number; // 文章ID
  article_title: string; // 文章标题
  count: number; // 数量
}

export interface BannerBackDTO {
  id?: number; // 页面id
  banner_name: string; // 页面名
  banner_label: string; // 页面标签
  banner_cover: string; // 页面封面
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface BannerNewReq {
  id?: number; // 页面id
  banner_name: string; // 页面名
  banner_label: string; // 页面标签
  banner_cover: string; // 页面封面
}

export interface BannerQuery extends PageQuery {
  banner_name?: string; // 页面名
}

export interface BatchResp {
  success_count: number;
}

export interface BlogHomeInfo {
  article_count: number; // 文章数量
  category_count: number; // 分类数量
  tag_count: number; // 标签数量
  views_count: string; // 访问量
  website_config: WebsiteConfig; // 网站配置
  page_list: PageDTO[]; // 页面列表
}

export interface CategoryBackDTO {
  id?: number;
  category_name: string; // 分类名
  article_count: number;
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface CategoryDTO {
  id?: number;
  category_name: string; // 分类名
}

export interface CategoryNewReq {
  id?: number;
  category_name: string; // 分类名
}

export interface CategoryQuery extends PageQuery {
  category_name?: string; // 分类名
}

export interface CommentBackDTO {
  id: number; // 评论ID
  type: number; // 评论类型 1.文章 2.友链 3.说说
  topic_title: string; // 评论主题
  avatar: string; // 用户头像
  nickname: string; // 用户昵称
  to_nickname: string; // 被回复人昵称
  comment_content: string; // 评论内容
  is_review: number; // 是否审核 0.未审核 1.已审核
  created_at: number; // 创建时间
}

export interface CommentQuery extends PageQuery {
  avatar?: string; // 用户头像
  is_review?: number;
  type?: number; // 评论类型 1.文章 2.友链 3.说说
}

export interface CommentReviewReq {
  id?: number;
  is_review?: number;
}

export interface EmptyReq {}

export interface EmptyResp {}

export interface FriendBackDTO {
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

export interface IdReq {
  id: number;
}

export interface IdsReq {
  ids: number[];
}

export interface LoginReq {
  username: string;
  password: string;
  verify_code: string; // 验证码
}

export interface LoginResp {
  token?: Token;
}

export interface MenuBackDTO {
  id?: number; // 主键
  parent_id: number; // 父id
  title: string; // 菜单标题
  type: number; // 菜单类型（0代表菜单、1代表iframe、2代表外链、3代表按钮）
  path: string; // 路由地址
  name: string; // 路由名字
  component: string; // Layout组件
  redirect: string; // 路由重定向
  meta: Meta; // meta配置
  children: MenuBackDTO[];
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface MenuQuery extends PageQuery {
  name?: string; // 路由名字
}

export interface Meta {
  title: string;
  icon: string;
  hidden: boolean;
  always_show: boolean;
  params: any;
}

export interface OperationLogBackDTO {
  id?: number; // 主键id
  user_id: number; // 用户id
  nickname: string; // 用户昵称
  ip_address: string; // 操作ip
  ip_source: string; // 操作地址
  opt_module: string; // 操作模块
  opt_desc: string; // 操作描述
  service_url: string; // 请求地址
  service_method: string; // 请求方式
  service_header: string; // 请求头参数
  service_data: string; // 请求参数
  response_data: string; // 返回数据
  response_status: number; // 响应状态码
  cost: string; // 耗时（ms）
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface OperationLogQuery extends PageQuery {}

export interface PageDTO {
  id?: number; // 页面ID
  page_name: string; // 页面名称
  page_label: string; // 页面标签
  page_cover: string; // 页面封面
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

export interface PhotoBackDTO {
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

export interface RemarkBackDTO {
  id?: number; // 主键id
  nickname: string; // 昵称
  avatar: string; // 头像
  message_content: string; // 留言内容
  ip_address: string; // 用户ip
  ip_source: string; // 用户地址
  time: number; // 弹幕速度
  is_review: number; // 是否审核
  created_at: number; // 发布时间
  updated_at: number; // 更新时间
}

export interface RemarkNewReq {
  id?: number; // 主键id
  is_review: number; // 是否审核
}

export interface RemarkQuery extends PageQuery {
  nickname?: string; // 昵称
  is_review?: number; // 是否审核
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

export interface RoleBackDTO {
  id?: number; // 主键id
  parent_id: number; // 父角色id
  role_domain: string; // 角色域
  role_name: string; // 角色名
  role_comment: string; // 角色备注
  is_disable: number; // 是否禁用  0否 1是
  is_default: number; // 是否默认角色 0否 1是
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface RoleNewReq {
  id?: number; // 主键id
  parent_id: number; // 父角色id
  role_domain: string; // 角色域
  role_name: string; // 角色名
  role_comment: string; // 角色备注
  is_disable: number; // 是否禁用  0否 1是
  is_default: number; // 是否默认角色 0否 1是
}

export interface RoleQuery extends PageQuery {
  role_name?: string; // 角色名
  is_disable?: number; // 是否禁用  0否 1是
}

export interface RoleResourcesResp {
  role_id: number;
  api_ids: number[];
  menu_ids: number[];
}

export interface Server {
  os: any;
  cpu: any;
  ram: any;
  disk: any;
}

export interface SyncMenuReq {
  menus: MenuBackDTO[];
}

export interface TagBackDTO {
  id?: number; // 标签ID
  tag_name: string; // 标签名
  article_count: number; // 文章数量
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface TagDTO {
  id?: number; // 标签ID
  tag_name: string; // 标签名
}

export interface TagNewReq {
  id?: number;
  tag_name: string; // 标签名
}

export interface TagQuery extends PageQuery {
  tag_name?: string; // 标签名
}

export interface TalkBackDTO {
  id?: number; // 说说ID
  user_id: number; // 用户ID
  nickname: string; // 用户昵称
  avatar: string; // 用户头像
  content: string; // 说说内容
  img_list: string[]; // 图片URL列表
  is_top: number; // 是否置顶
  status: number; // 状态 1.公开 2.私密
  like_count: number; // 点赞量
  comment_count: number; // 评论量
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
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
  user_id: number; // 用户id
  token_type: string; // token类型,Bearer
  access_token: string; // 访问token,过期时间较短。2h
  expires_in: number; // 访问token过期时间
  refresh_token: string; // 刷新token,过期时间较长。30d
  refresh_expires_in: number; // 刷新token过期时间
  scope: string; // 作用域
}

export interface UniqueViewDTO {
  date: string; // 日期
  count: number; // 数量
}

export interface UpdateRoleApisReq {
  role_id: number;
  api_ids: number[];
}

export interface UpdateRoleMenusReq {
  role_id: number;
  menu_ids: number[];
}

export interface UpdateUserRolesReq {
  user_id: number;
  role_ids: number[];
}

export interface UpdateUserStatusReq {
  user_id: number;
  status: number; // 状态: -1删除 0正常 1禁用
}

export interface UploadFileReq {
  label?: string;
  file?: any; // 文件
  file_size?: number; // 文件大小
  file_md5?: string; // 文件md5值
}

export interface UploadFileResp {
  id?: number; // id
  user_id: number; // 用户id
  label: string; // 标签
  file_name: string; // 文件名称
  file_size: number; // 文件大小
  file_md5: string; // 文件md5值
  file_url: string; // 上传路径
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
}

export interface UserApi {
  id?: number; // 主键id
  name: string; // api名称
  path: string; // api路径
  method: string; // api请求方法
  parent_id: number; // 分组id
  traceable: number; // 是否追溯操作记录 0需要，1是
  status: number; // 状态 1开，2关
  created_at: number; // 创建时间
  updated_at: number; // 更新时间
  children: UserApi[];
}

export interface UserApisResp {
  list: UserApi[];
}

export interface UserArea {
  name: string;
  value: number;
}

export interface UserInfoExt {
  intro: string; // 简介
  website: string; // 网站
}

export interface UserInfoReq extends UserInfoExt {
  nickname: string; // 昵称
  avatar: string; // 头像
}

export interface UserInfoResp extends UserInfoExt {
  user_id: number; // 用户id
  username: string;
  nickname: string;
  avatar: string;
  email: string; // 用户邮箱
  phone: string; // 用户手机号
  status: number;
  login_type: string;
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
  agent: string; // 代理
  ip_address: string; // ip host
  ip_source: string; // ip 源
  login_time: string; // 创建时间
}

export interface UserMenu {
  id?: number; // 主键
  parent_id: number; // 父id
  title: string; // 菜单标题
  type: number; // 菜单类型（0代表菜单、1代表iframe、2代表外链、3代表按钮）
  path: string; // 路由地址
  name: string; // 路由名字
  component: string; // Layout组件
  redirect: string; // 路由重定向
  meta: UserMenuMeta; // meta配置
  children: UserMenu[];
}

export interface UserMenuMeta {
  title: string;
  icon: string;
  hidden: boolean;
  always_show: boolean;
  params: any;
}

export interface UserMenusResp {
  list: UserMenu[];
}

export interface UserQuery extends PageQuery {
  nickname?: string;
}

export interface UserRole {
  id?: number; // 主键id
  role_domain: string; // 角色域
  role_name: string; // 角色名
  role_comment: string; // 角色备注
}

export interface UserRoleLabel {
  role_id: number;
  role_name: string;
  role_comment: string;
}

export interface UserRolesResp {
  list: UserRole[];
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
