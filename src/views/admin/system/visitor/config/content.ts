import type { IContentConfig } from "@/components/CURD/types";
import type { QueryVisitorReq } from "@/api/types";
import { VisitorAPI } from "@/api/visitor";

const contentConfig: IContentConfig<QueryVisitorReq> = {
  pageTitle: "游客管理",
  permPrefix: "sys:visitor",
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
  indexAction: function (query: QueryVisitorReq) {
    return VisitorAPI.findVisitorListApi(query);
  },
  pk: "id",
  toolbar: [],
  defaultToolbar: ["refresh", "filter", "search"],
  cols: [
    {
      label: "ID",
      prop: "id",
      width: 80,
      align: "center",
    },
    {
      label: "终端ID",
      prop: "terminal_id",
      width: 180,
      align: "center",
    },
    {
      label: "操作系统",
      prop: "os",
      width: 120,
      align: "center",
    },
    {
      label: "浏览器",
      prop: "browser",
      width: 150,
      align: "center",
    },
    {
      label: "IP地址",
      prop: "ip_address",
      width: 140,
      align: "center",
    },
    {
      label: "IP归属地",
      prop: "ip_source",
      width: 0,
      minWidth: 160,
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
      label: "更新时间",
      prop: "updated_at",
      width: 170,
      align: "center",
      sortable: true,
      templet: "date",
      dateFormat: "YYYY/MM/DD HH:mm:ss",
    },
  ],
};

export default contentConfig;
