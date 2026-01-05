import type { IContentConfig } from "@/components/CURD/types";
import type { RoleQuery } from "@/api/types";
import { RoleAPI } from "@/api/role";
import { SwitchStatusEnum } from "@/enums/blog";

const contentConfig: IContentConfig<RoleQuery> = {
  pageTitle: "角色管理",
  permPrefix: "sys:role",
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
    return RoleAPI.deletesRoleApi(data);
  },
  indexAction: function (params: RoleQuery) {
    return RoleAPI.findRoleListApi(params);
  },
  modifyAction(row, field, value) {
    const data = Object.assign(row);
    return RoleAPI.updateRoleApi(data);
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
      prop: "role_key",
      width: 120,
      align: "center",
    },
    {
      label: "角色标签",
      prop: "role_label",
      width: 120,
      align: "center",
    },
    {
      label: "角色备注",
      prop: "role_comment",
      width: 0,
      minWidth: 200,
      align: "center",
    },
    {
      label: "是否默认角色",
      prop: "is_default",
      width: 120,
      align: "center",
      templet: "switch",
      activeValue: 1,
      inactiveValue: 0,
      activeText: "默认",
      inactiveText: "非默认",
    },
    {
      label: "是否禁用",
      prop: "is_disable",
      width: 100,
      align: "center",
      templet: "switch",
      activeValue: SwitchStatusEnum.ENABLED,
      inactiveValue: SwitchStatusEnum.DISABLED,
      activeText: "禁用",
      inactiveText: "启用",
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
          name: "perm",
          text: "分配权限",
          perm: "perm",
          attrs: {
            icon: "plus",
            type: "success",
          },
        },
      ],
    },
  ],
};

export default contentConfig;
