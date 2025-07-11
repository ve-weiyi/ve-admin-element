import request from "@/utils/request";

export const WebsocketAPI = {
  /** WebSocket消息 */
  websocketApi(data?: any): Promise<IApiResponse<any>> {
    return request({
      url: "/admin-api/v1/websocket",
      method: "GET",
      data: data,
    });
  },
};
