import request from "@/utils/request";
import type {
  BatchMarkRecordsReadReq,
  BatchResp,
  DeleteNotifyRecordReq,
  MarkAllRecordsReadReq,
  MarkRecordReadReq,
  PageResult,
  QueryNotifyRecordListReq,
  QueryUserInboxRecordListReq,
  QueryUserInboxRecordListResp,
} from "@/api/types";

/** 通知管理 */
export const NotifyRecordAPI = {
  /** 批量标记投递记录为已读 */
  batchMarkRecordsRead(data?: BatchMarkRecordsReadReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/notify_record/batch_mark_records_read`,
      method: "POST",
      data,
    });
  },

  /** 批量删除投递记录 */
  deleteNotifyRecord(data?: DeleteNotifyRecordReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/notify_record/delete_notify_record`,
      method: "DELETE",
      data,
    });
  },

  /** 全部标记投递记录为已读 */
  markAllRecordsRead(data?: MarkAllRecordsReadReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/notify_record/mark_all_records_read`,
      method: "POST",
      data,
    });
  },

  /** 标记单条投递记录为已读 */
  markRecordRead(data?: MarkRecordReadReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/notify_record/mark_record_read`,
      method: "POST",
      data,
    });
  },

  /** 获取统一投递记录列表 */
  queryNotifyRecordList(data?: QueryNotifyRecordListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/notify_record/query_notify_record_list`,
      method: "POST",
      data,
    });
  },

  /** 查询用户 inbox 投递列表 */
  queryUserInboxRecordList(
    data?: QueryUserInboxRecordListReq
  ): Promise<ApiResponse<QueryUserInboxRecordListResp>> {
    return request({
      url: `/admin-api/v1/notify_record/query_user_inbox_record_list`,
      method: "POST",
      data,
    });
  },
};
