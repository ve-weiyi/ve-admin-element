import { defineMock } from "./base";

const baseTime = 1700000000000;

/** 站内信列表 */
const mockInbox = [
  {
    id: 1,
    message_id: 1,
    channel: "inbox",
    recipient: "00000000-0000-0000-0000-000000000001",
    template_code: "system_notice",
    content: "欢迎使用博客管理系统",
    status: "unread",
    biz_id: "",
    error_msg: "",
    read_at: 0,
    sent_at: baseTime,
    created_at: baseTime,
    title: "欢迎使用博客管理系统",
    category: "system",
  },
  {
    id: 2,
    message_id: 2,
    channel: "inbox",
    recipient: "00000000-0000-0000-0000-000000000001",
    template_code: "system_update",
    content: "系统已完成例行维护",
    status: "unread",
    biz_id: "",
    error_msg: "",
    read_at: 0,
    sent_at: baseTime + 3600000,
    created_at: baseTime + 3600000,
    title: "系统维护完成",
    category: "maintenance",
  },
  {
    id: 3,
    message_id: 3,
    channel: "inbox",
    recipient: "00000000-0000-0000-0000-000000000001",
    template_code: "system_notice",
    content: "新增功能：相册管理",
    status: "read",
    biz_id: "",
    error_msg: "",
    read_at: baseTime + 7200000,
    sent_at: baseTime + 7200000,
    created_at: baseTime + 7200000,
    title: "版本更新：相册管理",
    category: "update",
  },
];

/** 通知内容 */
const mockMessages = [
  {
    id: 1,
    title: "系统维护通知",
    content: "系统将于今晚例行维护",
    category: "maintenance",
    level: "info",
    target_type: "all",
    target_ids: "",
    status: "published",
    published_at: baseTime,
    published_by: "admin",
    created_at: baseTime,
    updated_at: baseTime,
  },
  {
    id: 2,
    title: "新功能上线",
    content: "相册管理功能已上线",
    category: "update",
    level: "info",
    target_type: "all",
    target_ids: "",
    status: "draft",
    published_at: 0,
    published_by: "",
    created_at: baseTime,
    updated_at: baseTime,
  },
];

/** 通知模板 */
const mockTemplates = [
  {
    id: 1,
    code: "system_notice",
    channel: "inbox",
    scene: "system",
    title: "系统通知",
    content: "您有一条新的系统通知",
    enabled: 1,
    created_at: baseTime,
    updated_at: baseTime,
  },
  {
    id: 2,
    code: "comment_reply",
    channel: "email",
    scene: "comment",
    title: "评论回复提醒",
    content: "您的评论收到了回复",
    enabled: 0,
    created_at: baseTime,
    updated_at: baseTime,
  },
];

export default defineMock([
  {
    url: "notify_record/query_user_inbox_record_list",
    method: ["POST"],
    body: {
      code: 200,
      data: {
        page: 1,
        page_size: 5,
        total: mockInbox.length,
        unread_total: mockInbox.filter((item) => item.status === "unread").length,
        list: mockInbox,
      },
      msg: "ok",
    },
  },

  {
    url: "notify_record/mark_record_read",
    method: ["POST"],
    body: { code: 200, data: { success_count: 1 }, msg: "ok" },
  },

  {
    url: "notify_record/batch_mark_records_read",
    method: ["POST"],
    body: { code: 200, data: { success_count: 1 }, msg: "ok" },
  },

  {
    url: "notify_record/mark_all_records_read",
    method: ["POST"],
    body: { code: 200, data: { success_count: 1 }, msg: "ok" },
  },

  {
    url: "notify_record/query_notify_record_list",
    method: ["POST"],
    body: { code: 200, data: { list: mockInbox, total: mockInbox.length }, msg: "ok" },
  },

  {
    url: "notify_record/delete_notify_record",
    method: ["DELETE"],
    body: { code: 200, data: { success_count: 1 }, msg: "ok" },
  },

  // ==================== 通知内容 ====================
  {
    url: "notify_message/query_notify_message_list",
    method: ["POST"],
    body: { code: 200, data: { list: mockMessages, total: mockMessages.length }, msg: "ok" },
  },
  {
    url: "notify_message/get_notify_message",
    method: ["GET"],
    body: { code: 200, data: mockMessages[0], msg: "ok" },
  },
  {
    url: "notify_message/create_notify_message",
    method: ["POST"],
    body: { code: 200, data: mockMessages[0], msg: "ok" },
  },
  {
    url: "notify_message/update_notify_message",
    method: ["PUT"],
    body: { code: 200, data: mockMessages[0], msg: "ok" },
  },
  {
    url: "notify_message/delete_notify_message",
    method: ["DELETE"],
    body: { code: 200, data: { success_count: 1 }, msg: "ok" },
  },
  {
    url: "notify_message/publish_notify_message",
    method: ["POST"],
    body: { code: 200, data: { success_count: 1 }, msg: "ok" },
  },
  {
    url: "notify_message/revoke_notify_message",
    method: ["POST"],
    body: { code: 200, data: { success_count: 1 }, msg: "ok" },
  },

  // ==================== 通知模板 ====================
  {
    url: "notify_template/query_notify_template_list",
    method: ["POST"],
    body: { code: 200, data: { list: mockTemplates, total: mockTemplates.length }, msg: "ok" },
  },
  {
    url: "notify_template/get_notify_template",
    method: ["GET"],
    body: { code: 200, data: mockTemplates[0], msg: "ok" },
  },
  {
    url: "notify_template/create_notify_template",
    method: ["POST"],
    body: { code: 200, data: mockTemplates[0], msg: "ok" },
  },
  {
    url: "notify_template/update_notify_template",
    method: ["PUT"],
    body: { code: 200, data: mockTemplates[0], msg: "ok" },
  },
  {
    url: "notify_template/delete_notify_template",
    method: ["DELETE"],
    body: { code: 200, data: { success_count: 1 }, msg: "ok" },
  },
]);
