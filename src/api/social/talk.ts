import request from "@/utils/request";
import type {
  BatchResp,
  CreateTalkReq,
  DeleteTalkReq,
  GetTalkReq,
  PageResult,
  QueryTalkListReq,
  TalkVO,
  UpdateTalkReq,
} from "@/api/types";

/** 说说管理 */
export const TalkAPI = {
  /** 创建说说 */
  createTalk(data?: CreateTalkReq): Promise<ApiResponse<TalkVO>> {
    return request({
      url: `/admin-api/v1/talk/create_talk`,
      method: "POST",
      data,
    });
  },

  /** 删除说说 */
  deleteTalk(data?: DeleteTalkReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/talk/delete_talk`,
      method: "DELETE",
      data,
    });
  },

  /** 获取说说详情 */
  getTalk(params?: GetTalkReq): Promise<ApiResponse<TalkVO>> {
    return request({
      url: `/admin-api/v1/talk/get_talk`,
      method: "GET",
      params,
    });
  },

  /** 获取说说列表 */
  queryTalkList(data?: QueryTalkListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/talk/query_talk_list`,
      method: "POST",
      data,
    });
  },

  /** 更新说说 */
  updateTalk(data?: UpdateTalkReq): Promise<ApiResponse<TalkVO>> {
    return request({
      url: `/admin-api/v1/talk/update_talk`,
      method: "PUT",
      data,
    });
  },
};
