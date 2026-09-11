import request from "@/utils/request";
import type {
  EmptyReq,
  GetArticleAnalyticsResp,
  GetStatsDashboardResp,
  GetUserGeoStatsReq,
  GetUserGeoStatsResp,
  GetVisitTrendReq,
  GetVisitTrendResp,
} from "@/api/types";

/** 数据统计 */
export const StatsAPI = {
  /** 获取文章分析数据 */
  getArticleAnalytics(params?: EmptyReq): Promise<ApiResponse<GetArticleAnalyticsResp>> {
    return request({
      url: `/admin-api/v1/stats/get_article_analytics`,
      method: "GET",
      params,
    });
  },

  /** 获取仪表盘统计数据 */
  getStatsDashboard(params?: EmptyReq): Promise<ApiResponse<GetStatsDashboardResp>> {
    return request({
      url: `/admin-api/v1/stats/get_stats_dashboard`,
      method: "GET",
      params,
    });
  },

  /** 获取用户地理分布 */
  getUserGeoStats(data?: GetUserGeoStatsReq): Promise<ApiResponse<GetUserGeoStatsResp>> {
    return request({
      url: `/admin-api/v1/stats/get_user_geo_stats`,
      method: "POST",
      data,
    });
  },

  /** 获取访客数据趋势 */
  getVisitTrend(data?: GetVisitTrendReq): Promise<ApiResponse<GetVisitTrendResp>> {
    return request({
      url: `/admin-api/v1/stats/get_visit_trend`,
      method: "POST",
      data,
    });
  },
};
