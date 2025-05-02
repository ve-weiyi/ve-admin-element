import type { IContentConfig } from "@/components/CURD/types";
import type { AccountQuery } from "@/api/types";
import { AccountAPI } from "@/api/account";

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
    return AccountAPI.findAccountOnlineListApi(query);
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
      width: 120,
      align: "center",
      show: false,
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
    }
  ],
};

export default contentConfig;
