import type { IContentConfig } from "@/components/CURD/types";
import type { VisitLogQuery } from "@/api/types";
import { VisitLogAPI } from "@/api/visit_log";

const contentConfig: IContentConfig<VisitLogQuery> = {
  pageName: "sys:user",
  pageTitle: "留言管理",
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
    return {
      total: res.data.total,
      list: res.data.list || [],
    };
  },
  indexAction: function (query) {
    return VisitLogAPI.findVisitLogListApi(query);
  },
  deleteAction: function (ids: string) {
    const data = {
      ids: [],
    };
    ids.split(",").forEach((id) => data.ids.push(parseInt(id)));
    return VisitLogAPI.deletesVisitLogApi(data);
  },
  pk: "id",
  toolbar: ["delete"],
  defaultToolbar: ["refresh", "filter", "search"],
  cols: [
    {
      type: "selection",
      label: "批量操作",
      width: 50,
      align: "center",
    },
    {
      label: "id",
      prop: "id",
      width: 70,
      align: "center",
      sortable: true,
    },
    {
      label: "用户id",
      prop: "user_id",
      width: 120,
      align: "center",
      show: false,
    },
    {
      label: "用户",
      prop: "user",
      width: 150,
      align: "center",
      templet: "custom",
    },
    {
      label: "访客标识",
      prop: "terminal_id",
      width: 150,
      align: "center",
    },
    {
      label: "页面",
      prop: "page_name",
      width: 0,
      minWidth: 120,
      align: "center",
    },
    {
      label: "操作系统",
      prop: "os",
      width: 0,
      minWidth: 160,
      align: "center",
    },
    {
      label: "浏览器",
      prop: "browser",
      width: 0,
      minWidth: 140,
      align: "center",
    },
    {
      label: "IP地址",
      prop: "ip_address",
      width: 140,
      align: "center",
    },
    {
      label: "IP来源",
      prop: "ip_source",
      width: 0,
      minWidth: 160,
      align: "center",
    },
    {
      label: "操作系统",
      prop: "os",
      width: 0,
      minWidth: 160,
      align: "center",
    },
    {
      label: "浏览器",
      prop: "browser",
      width: 0,
      minWidth: 140,
      align: "center",
    },
    {
      label: "创建时间",
      prop: "created_at",
      width: 170,
      align: "center",
      sortable: true,
      templet: "date",
      dateFormat: "YYYY/MM/DD HH:mm:ss",
    },
    {
      label: "操作栏",
      align: "center",
      fixed: "right",
      width: 160,
      templet: "tool",
      operat: ["delete"],
    },
  ],
};

export default contentConfig;
