import type { IContentConfig } from "@/components/CURD/types";
import type { QueryAccountReq } from "@/api/types";
import { AccountAPI } from "@/api/account";
import { useUserStore } from "@/store";
import { UserStatusEnum } from "@/enums/blog";

const contentConfig: IContentConfig<QueryAccountReq> = {
  pageTitle: "用户管理",
  permPrefix: "sys:user",
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
  modifyAction(row, field, value) {
    return AccountAPI.updateAccountStatusApi({
      user_id: row.user_id,
      status: row.status,
    });
  },
  indexAction: function (query: QueryAccountReq) {
    return AccountAPI.findAccountListApi(query);
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
      width: 180,
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
      label: "登录邮箱",
      prop: "email",
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
      label: "注册方式",
      prop: "register_type",
      width: 120,
      align: "center",
      templet: "custom",
    },
    {
      label: "状态",
      prop: "status",
      width: 100,
      align: "center",
      templet: "switch",
      activeValue: UserStatusEnum.DISABLED,
      inactiveValue: UserStatusEnum.NORMAL,
      activeText: "禁用",
      inactiveText: "正常",
    },
    {
      label: "注册IP地址",
      prop: "ip_address",
      width: 140,
      align: "center",
    },
    {
      label: "注册IP归属地",
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
      show: false,
    },
    {
      label: "操作栏",
      align: "center",
      fixed: "right",
      width: 220,
      templet: "tool",
      operat: [
        {
          name: "reset",
          text: "重置密码",
          perm: "reset",
          attrs: {
            icon: "refresh-left",
            type: "primary",
          },
          render(row) {
            return (
              !row.roles.find((item) => item === "super-admin") ||
              row.user_id == useUserStore().userInfo.user_id
            );
          },
        },
        {
          name: "edit",
          text: "编辑",
          perm: "edit",
          attrs: {
            icon: "edit",
            type: "primary",
          },
        },
        {
          name: "delete",
          text: "删除",
          perm: "delete",
          attrs: {
            icon: "delete",
            type: "danger",
          },
        },
      ],
    },
  ],
};

export default contentConfig;
