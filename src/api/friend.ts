import request from "@/utils/request";
import type {
  BatchResp,
  FriendBackVO,
  IdsReq,
  NewFriendReq,
  PageResp,
  QueryFriendReq,
} from "./types";

export const FriendAPI = {
  /** 创建友链 */
  addFriendApi(data?: NewFriendReq): Promise<IApiResponse<FriendBackVO>> {
    return request({
      url: "/admin-api/v1/friend/add_friend",
      method: "POST",
      data: data,
    });
  },

  /** 删除友链 */
  deletesFriendApi(data?: IdsReq): Promise<IApiResponse<BatchResp>> {
    return request({
      url: "/admin-api/v1/friend/deletes_friend",
      method: "DELETE",
      data: data,
    });
  },

  /** 分页获取友链列表 */
  findFriendListApi(data?: QueryFriendReq): Promise<IApiResponse<PageResp>> {
    return request({
      url: "/admin-api/v1/friend/find_friend_list",
      method: "POST",
      data: data,
    });
  },

  /** 更新友链 */
  updateFriendApi(data?: NewFriendReq): Promise<IApiResponse<FriendBackVO>> {
    return request({
      url: "/admin-api/v1/friend/update_friend",
      method: "PUT",
      data: data,
    });
  },
};
