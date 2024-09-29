import request from "@/utils/request";
import { BatchResp, IdReq, PageResp, TalkBackDTO, TalkNewReq, TalkQuery } from "./types";

/** "分页获取说说列表" */
export function findTalkListApi(data?: TalkQuery): Promise<IApiResponse<PageResp>> {
  return request({
    url: "/admin_api/v1/talk/find_talk_list",
    method: "post",
    data: data,
  });
}

/** "创建说说" */
export function addTalkApi(data?: TalkNewReq): Promise<IApiResponse<TalkBackDTO>> {
  return request({
    url: "/admin_api/v1/talk/add_talk",
    method: "post",
    data: data,
  });
}

/** "删除说说" */
export function deleteTalkApi(data?: IdReq): Promise<IApiResponse<BatchResp>> {
  return request({
    url: "/admin_api/v1/talk/delete_talk",
    method: "delete",
    data: data,
  });
}

/** "查询说说" */
export function getTalkApi(data?: IdReq): Promise<IApiResponse<TalkBackDTO>> {
  return request({
    url: "/admin_api/v1/talk/get_talk",
    method: "post",
    data: data,
  });
}

/** "更新说说" */
export function updateTalkApi(data?: TalkNewReq): Promise<IApiResponse<TalkBackDTO>> {
  return request({
    url: "/admin_api/v1/talk/update_talk",
    method: "put",
    data: data,
  });
}
