import type { IContentConfig } from "@/components/CURD/types";
import type { ApiQuery } from "@/api/types";
import { ApiAPI } from "@/api/api";
import { SwitchStatusEnum } from "@/enums/blog/index.ts";

const contentConfig: IContentConfig<ApiQuery> = {
  pageTitle: "接口管理",
  permPrefix: "sys:api",
  table: {
    border: true,
    highlightCurrentRow: true,
    treeProps: {
      children: "children",
      hasChildren: "hasChildren",
    },
  },
  pagination: {
    background: true,
    layout: "prev,pager,next,jumper,total,sizes",
    pageSize: 10,
    pageSizes: [10, 20, 30, 50],
  },
  parseData: (res) => {
    return {
      total: -1,
      list: res.data.list || [],
    };
  },
  deleteAction: function (ids: string) {
    const data = {
      ids: [],
    };
    ids.split(",").forEach((id) => data.ids.push(parseInt(id)));
    return ApiAPI.deletesApiApi(data);
  },
  indexAction: function (params: ApiQuery) {
    return ApiAPI.findApiListApi(params);
  },
  modifyAction(row, field, value) {
    const data = Object.assign(row);
    return ApiAPI.updateApiApi(data);
  },
  pk: "id",
  toolbar: [
    {
      name: "syncApi",
      text: "同步接口",
      perm: "sync",
      attrs: {
        icon: "refresh",
        type: "primary",
      },
    },
    {
      name: "clearApi",
      text: "清空接口",
      perm: "clear",
      attrs: {
        icon: "delete",
        type: "info",
      },
    },
    "add",
    "delete",
  ],
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
      label: "名称",
      prop: "name",
      width: 0,
      align: "center",
    },
    {
      label: "路径",
      prop: "path",
      width: 0,
      align: "center",
    },
    {
      label: "方法",
      prop: "method",
      width: 0,
      align: "center",
      templet: "custom",
    },
    {
      label: "是否记录日志",
      prop: "traceable",
      width: 120,
      align: "center",
      templet: "switch",
      activeValue: SwitchStatusEnum.ENABLED,
      inactiveValue: SwitchStatusEnum.DISABLED,
      activeText: "记录",
      inactiveText: "不记录",
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
      width: 200,
      templet: "tool",
      operat: [
        {
          name: "addSubApi",
          text: "添加",
          perm: "addSubApi",
          attrs: {
            icon: "plus",
            type: "success",
          },
        },
        "edit",
        "delete",
      ],
    },
  ],
};

export default contentConfig;
