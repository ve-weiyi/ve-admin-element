import type { IContentConfig } from "@/components/CURD/types";
import type { EmptyReq } from "@/api/types";
import { UserAPI } from "@/api";

const contentConfig: IContentConfig<EmptyReq> = {
  pageTitle: "在线用户",
  permPrefix: "monitor:online",
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  pagination: {
    background: true,
    layout: "prev,pager,next,jumper,total,sizes",
    pageSize: 10,
    pageSizes: [10, 20, 30, 50],
  },
  parseData: (res) => {
    const list = (res.data.list || []).map((item: any) => ({
      ...item,
      user_id: item.user_info?.user_id || item.guest_info?.device_id || "",
    }));
    return { total: list.length, list };
  },
  indexAction(query: EmptyReq) {
    return UserAPI.getOnlineUsers(query);
  },
  pk: "user_id",
  toolbar: [],
  defaultToolbar: ["refresh", "filter", "search"],
  cols: [
    {
      label: "类型",
      prop: "user_id",
      width: 80,
      align: "center",
      templet: "custom",
    },
    {
      label: "头像",
      align: "center",
      prop: "user_info.avatar",
      width: 80,
      templet: "image",
    },
    {
      label: "用户名",
      prop: "user_info.username",
      width: 160,
      align: "center",
    },
    {
      label: "昵称",
      prop: "user_info.nickname",
      width: 120,
      align: "center",
    },
    {
      label: "操作系统",
      prop: "guest_info.os",
      width: 120,
      align: "center",
    },
    {
      label: "浏览器",
      prop: "guest_info.browser",
      width: 140,
      align: "center",
    },
    {
      label: "IP地址",
      prop: "guest_info.ip_address",
      width: 140,
      align: "center",
    },
    {
      label: "IP来源",
      prop: "guest_info.ip_source",
      width: 160,
      align: "center",
    },
    {
      label: "最近活跃",
      prop: "last_active_at",
      width: 170,
      align: "center",
      sortable: true,
      templet: "date",
      dateFormat: "YYYY/MM/DD HH:mm:ss",
    },
  ],
};

export default contentConfig;
