import type { IContentConfig } from "@/components/CURD/types";
import type { ApiQuery } from "@/api/types";
import { ApiAPI } from "@/api/api";

const contentConfig: IContentConfig<ApiQuery> = {
  pageName: "sys:user",
  pageTitle: "接口管理",
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
    if (!params.sorts) {
      params.sorts = [`id desc`];
    }

    return ApiAPI.findApiListApi(params);
  },
  pk: "id",
  toolbar: [
    {
      name: "syncApi",
      icon: "refresh",
      text: "同步接口",
      auth: "sync",
      type: "success",
    },
    {
      name: "clearApi",
      icon: "delete",
      text: "清空接口",
      auth: "clear",
      type: "info",
    },
    {
      name: "addApi",
      icon: "plus",
      text: "新增接口",
      auth: "add",
      type: "primary",
    },
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
      label: "是否记录日志",
      prop: "traceable",
      width: 120,
      align: "center",
      templet: "switch",
      activeValue: 1,
      inactiveValue: 0,
    },
    {
      label: "是否禁用",
      prop: "is_disable",
      width: 100,
      align: "center",
      templet: "switch",
      activeValue: 1,
      inactiveValue: 0,
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
      operat: [
        {
          name: "addSubApi",
          auth: "api:addSubApi",
          icon: "plus",
          text: "添加",
          type: "success",
          render(row) {
            return row.type == 0;
          },
        },
        {
          name: "editApi",
          auth: "api:editApi",
          icon: "edit",
          text: "编辑",
          type: "primary",
        },
        "delete",
      ],
    },
  ],
};

export default contentConfig;
