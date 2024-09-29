import type { IContentConfig } from "@/components/CURD/types";
import { AccountQuery } from "@/api/types";
import { findAccountOnlineListApi } from "@/api/account.ts";

const contentConfig: IContentConfig<AccountQuery> = {
  pageName: "sys:user",
  pageTitle: "用户管理",
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
    return findAccountOnlineListApi(query);
  },
  pk: "user_id",
  toolbar: [],
  defaultToolbar: ["refresh", "filter", "search"],
  cols: [
    {
      type: "selection",
      label: "批量操作",
      width: 50,
      align: "center",
    },
    {
      label: "用户id",
      prop: "user_id",
      width: 90,
      align: "center",
      sortable: true,
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
      width: 120,
      align: "center",
    },
    {
      label: "角色列表",
      prop: "roles",
      minWidth: 140,
      width: 0,
      align: "center",
      templet: "custom",
    },
    {
      label: "登录类型",
      prop: "login_type",
      width: 120,
      align: "center",
    },
    {
      label: "状态",
      prop: "status",
      width: 100,
      align: "center",
      templet: "switch",
      activeValue: 1,
      inactiveValue: 0,
      activeText: "禁用",
      inactiveText: "启用",
    },
    {
      label: "IP地址",
      prop: "ip_address",
      width: 120,
      align: "center",
      show: false,
    },
    {
      label: "IP来源",
      prop: "ip_source",
      width: 120,
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
      width: 220,
      templet: "tool",
      operat: [
        {
          name: "reset_pwd",
          auth: "password:reset",
          icon: "refresh-left",
          text: "重置密码",
          type: "primary",
          render(row) {
            return row.is_review != 1;
          },
        },
        "edit",
        "delete",
      ],
    },
  ],
};

export default contentConfig;
