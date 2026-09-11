import request from "@/utils/request";
import type {
  BatchResp,
  CreateNotifyTemplateReq,
  DeleteNotifyTemplateReq,
  GetNotifyTemplateReq,
  NotifyTemplateVO,
  PageResult,
  QueryNotifyTemplateListReq,
  UpdateNotifyTemplateReq,
} from "@/api/types";

/** 通知管理 */
export const NotifyTemplateAPI = {
  /** 创建通知模板 */
  createNotifyTemplate(data?: CreateNotifyTemplateReq): Promise<ApiResponse<NotifyTemplateVO>> {
    return request({
      url: `/admin-api/v1/notify_template/create_notify_template`,
      method: "POST",
      data,
    });
  },

  /** 批量删除通知模板 */
  deleteNotifyTemplate(data?: DeleteNotifyTemplateReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/notify_template/delete_notify_template`,
      method: "DELETE",
      data,
    });
  },

  /** 获取通知模板详情 */
  getNotifyTemplate(params?: GetNotifyTemplateReq): Promise<ApiResponse<NotifyTemplateVO>> {
    return request({
      url: `/admin-api/v1/notify_template/get_notify_template`,
      method: "GET",
      params,
    });
  },

  /** 获取通知模板列表 */
  queryNotifyTemplateList(data?: QueryNotifyTemplateListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/notify_template/query_notify_template_list`,
      method: "POST",
      data,
    });
  },

  /** 更新通知模板 */
  updateNotifyTemplate(data?: UpdateNotifyTemplateReq): Promise<ApiResponse<NotifyTemplateVO>> {
    return request({
      url: `/admin-api/v1/notify_template/update_notify_template`,
      method: "PUT",
      data,
    });
  },
};
