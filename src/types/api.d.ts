/** 所有 api 接口的响应数据都应该准守该格式 */
interface IApiResponse<T = any> {
  flag: number;
  code: number;
  data: T;
  msg: string;
  trace_id: string;
}
