import request from "@/utils/request";
import type { PingReq, PingResp } from "./types";

export const AdminApiAPI = {

  /** ping */
  pingApi(data?: PingReq): Promise<IApiResponse<PingResp>> {
    return request({
      url: "/admin_api/v1/ping",
      method: "GET",
      data: data,
    });
  },
};
