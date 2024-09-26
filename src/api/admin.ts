import request from "@/utils/request";
import { PingReq, PingResp } from "./types";

/** "ping" */
export function pingApi(data?: PingReq): Promise<IApiResponse<PingResp>> {
  return request({
    url: "/admin_api/v1/ping",
    method: "get",
    data: data,
  });
}
