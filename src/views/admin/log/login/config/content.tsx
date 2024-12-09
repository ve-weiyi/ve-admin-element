import type { IContentConfig } from "@/components/CURD/types";
import { AccountQuery } from "@/api/types";
import { findAccountLoginHistoryListApi } from "@/api/account.ts";

const contentConfig: IContentConfig<AccountQuery> = {
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
  indexAction: function (query: AccountQuery) {
    return findAccountLoginHistoryListApi(query);
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
      show: true,
    },
    {
      label: "头像",
      align: "center",
      prop: "avatar",
      width: 80,
      templet: "image",
    },
    {
      label: "用户名",
      prop: "username",
      width: 160,
      align: "center",
    },
    {
      label: "昵称",
      prop: "nickname",
      width: 0,
      minWidth: 160,
      align: "center",
    },
    {
      label: "登录类型",
      prop: "login_type",
      width: 120,
      align: "center",
      templet: "custom",
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
      label: "登录时间",
      prop: "login_at",
      width: 140,
      align: "center",
      templet: "date",
      dateFormat: "YYYY/MM/DD HH:mm:ss",
    },
    {
      label: "登出时间",
      prop: "logout_out",
      width: 140,
      align: "center",
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
