import type { IContentConfig } from "@/components/CURD/types";
import type { OperationLogQuery } from "@/api/types";
import { OperationLogAPI } from "@/api/operation_log";

const contentConfig: IContentConfig<OperationLogQuery> = {
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
    return OperationLogAPI.findOperationLogListApi(query);
  },
  deleteAction: function (ids: string) {
    const data = {
      ids: [],
    };
    ids.split(",").forEach((id) => data.ids.push(parseInt(id)));
    return OperationLogAPI.deletesOperationLogApi(data);
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
      label: "用户昵称",
      prop: "nickname",
      width: 100,
      align: "center",
    },
    {
      label: "头像",
      align: "center",
      prop: "avatar",
      width: 80,
      templet: "image",
    },
    {
      label: "操作模块",
      prop: "opt_module",
      width: 120,
      align: "center",
    },
    {
      label: "操作描述",
      prop: "opt_desc",
      width: 0,
      minWidth: 120,
      align: "center",
    },
    {
      label: "请求方法",
      prop: "request_method",
      width: 100,
      align: "center",
      templet: "tag",
      tagOptions: [
        { value: "GET", label: "GET", type: "success" },
        { value: "POST", label: "POST", type: "primary" },
        { value: "PUT", label: "PUT", type: "warning" },
        { value: "DELETE", label: "DELETE", type: "danger" },
        { value: "NULL", label: "NULL", type: "info" },
        { value: "", label: "NULL", type: "info" },
      ],
    },
    {
      label: "请求地址",
      prop: "request_uri",
      width: 0,
      minWidth: 200,
      align: "center",
    },
    {
      label: "响应数据",
      prop: "response_data",
      width: 300,
      align: "center",
      show: false,
    },
    {
      label: "响应状态",
      prop: "response_status",
      width: 100,
      align: "center",
    },
    {
      label: "响应耗时",
      prop: "cost",
      width: 0,
      minWidth: 120,
      align: "center",
    },
    {
      label: "IP地址",
      prop: "ip_address",
      width: 140,
      align: "center",
      show: false,
    },
    {
      label: "IP来源",
      prop: "ip_source",
      width: 0,
      minWidth: 160,
      align: "center",
      show: false,
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
