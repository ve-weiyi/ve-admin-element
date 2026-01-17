import type { IContentConfig } from "@/components/CURD/types";
import type { QueryApiReq } from "@/api/types";
import { ApiAPI } from "@/api/api";
import { ApiStatusEnum, ApiTraceableEnum } from "@/enums/blog";

const contentConfig: IContentConfig<QueryApiReq> = {
  pageTitle: "接口管理",
  permPrefix: "sys:api",
  table: {
    border: true,
    highlightCurrentRow: true,
    treeProps: {
      children: "children",
      hasChildren: "hasChildren",
    },
    defaultExpandAll: false, // 默认全部展开
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
  indexAction: function (params: QueryApiReq) {
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
    {
      name: "add",
      text: "新增模块",
      perm: "add",
      attrs: {
        icon: "plus",
        type: "warning",
      },
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
      show: false,
    },
    {
      label: "接口名称",
      prop: "name",
      minWidth: 140,
      align: "left",
    },
    {
      label: "接口路径",
      prop: "path",
      minWidth: 150,
      align: "center",
    },
    {
      label: "请求方法",
      prop: "method",
      width: 100,
      align: "center",
      templet: "custom",
    },
    {
      label: "是否记录日志",
      prop: "traceable",
      width: 120,
      align: "center",
      templet: "switch",
      activeValue: ApiTraceableEnum.YES,
      inactiveValue: ApiTraceableEnum.NO,
      activeText: "记录",
      inactiveText: "不记录",
    },
    {
      label: "状态",
      prop: "status",
      width: 100,
      align: "center",
      templet: "custom",
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
          name: "addSubApi",
          text: "新增接口",
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
