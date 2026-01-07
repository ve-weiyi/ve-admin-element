import request from "@/utils/request";
import type { BatchResp, IdReq, NewTalkReq, PageResp, QueryTalkReq, TalkBackVO } from "./types";

export const TalkAPI = {
  /** 创建说说 */
  addTalkApi(data?: NewTalkReq): Promise<IApiResponse<TalkBackVO>> {
    return request({
      url: "/admin-api/v1/talk/add_talk",
      method: "POST",
      data: data,
    });
  },

  /** 删除说说 */
  deleteTalkApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/talk/delete_talk",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取说说列表 */
  findTalkListApi(data?: QueryTalkReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/talk/find_talk_list",
      method: "POST",
      data: data,
    });
  },

  /** 查询说说 */
  getTalkApi(data?: IdReq): Promise<IApiResponse<TalkBackVO>> {
    return request({
      url: "/admin-api/v1/talk/get_talk",
      method: "POST",
      data: data,
    });
  },

  /** 更新说说 */
  updateTalkApi(data?: NewTalkReq): Promise<IApiResponse<TalkBackVO>> {
    return request({
      url: "/admin-api/v1/talk/update_talk",
      method: "PUT",
      data: data,
    });
  },
};
