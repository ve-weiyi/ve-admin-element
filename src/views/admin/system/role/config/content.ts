import type { IContentConfig } from "@/components/CURD/types";
import { RoleQuery } from "@/api/types";
import { batchDeleteRoleApi, findRoleListApi } from "@/api/role";

const contentConfig: IContentConfig<RoleQuery> = {
  pageName: "sys:user",
  pageTitle: "角色管理",
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
  deleteAction: function (ids: string) {
    const data = {
      ids: [],
    };
    ids.split(",").forEach((id) => data.ids.push(parseInt(id)));
    return batchDeleteRoleApi(data);
  },
  indexAction: function (params: RoleQuery) {
    if (!params.sorts) {
      params.sorts = [`id desc`];
    }

    return findRoleListApi(params);
  },
  pk: "id",
  toolbar: ["add", "delete"],
  defaultToolbar: ["refresh", "filter", "imports", "exports", "search"],
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
      label: "角色名称",
      prop: "role_name",
      width: 0,
      align: "center",
    },
    {
      label: "角色标签",
      prop: "role_label",
      width: 0,
      align: "center",
    },
    {
      label: "角色备注",
      prop: "role_comment",
      width: 0,
      align: "center",
    },
    {
      label: "是否禁用",
      prop: "is_disable",
      width: 100,
      align: "center",
      templet: "switch",
      activeValue: 1,
      inactiveValue: 0,
      activeText: "禁用",
      inactiveText: "启用",
    },
    {
      label: "是否默认",
      prop: "is_default",
      width: 100,
      align: "center",
      templet: "switch",
      activeValue: 1,
      inactiveValue: 0,
      activeText: "默认",
      inactiveText: "非默认",
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
        "edit",
        "delete",
        {
          name: "editRoleMenu",
          auth: "menu:editRoleMenu",
          icon: "plus",
          text: "分配权限",
          type: "success",
        },
      ],
    },
  ],
};

export default contentConfig;
