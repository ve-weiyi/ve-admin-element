import service from "@/utils/request";
import { LoginReq, LoginResp, EmptyReq, EmptyResp } from "./types";

/** "登录" */
export function loginApi(data?: LoginReq): Promise<IApiResponse<LoginResp>> {
  return service({
    url: "/admin_api/v1/login",
    method: "post",
    data: data,
  });
}

/** "登出" */
export function logoutApi(data?: EmptyReq): Promise<IApiResponse<EmptyResp>> {
  return service({
    url: "/admin_api/v1/logout",
    method: "post",
    data: data,
  });
}
