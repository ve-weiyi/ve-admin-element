import request from "@/utils/request";
import type {
  BatchResp,
  CreateFriendReq,
  DeleteFriendReq,
  FriendVO,
  PageResult,
  QueryFriendListReq,
  UpdateFriendReq,
} from "@/api/types";

/** 友链管理 */
export const FriendAPI = {
  /** 创建友链 */
  createFriend(data?: CreateFriendReq): Promise<ApiResponse<FriendVO>> {
    return request({
      url: `/admin-api/v1/friend/create_friend`,
      method: "POST",
      data,
    });
  },

  /** 批量删除友链 */
  deleteFriend(data?: DeleteFriendReq): Promise<ApiResponse<BatchResp>> {
    return request({
      url: `/admin-api/v1/friend/delete_friend`,
      method: "DELETE",
      data,
    });
  },

  /** 获取友链列表 */
  queryFriendList(data?: QueryFriendListReq): Promise<ApiResponse<PageResult>> {
    return request({
      url: `/admin-api/v1/friend/query_friend_list`,
      method: "POST",
      data,
    });
  },

  /** 更新友链 */
  updateFriend(data?: UpdateFriendReq): Promise<ApiResponse<FriendVO>> {
    return request({
      url: `/admin-api/v1/friend/update_friend`,
      method: "PUT",
      data,
    });
  },
};
