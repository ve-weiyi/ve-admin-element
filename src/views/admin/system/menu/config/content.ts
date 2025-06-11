import type { IContentConfig } from "@/components/CURD/types";
import type { MenuQuery } from "@/api/types";
import { MenuAPI } from "@/api/menu";

const contentConfig: IContentConfig<MenuQuery> = {
  pageName: "sys:menu",
  pageTitle: "菜单管理",
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
    return MenuAPI.deletesMenuApi(data);
  },
  indexAction: function (params: MenuQuery) {
    if (!params.sorts) {
      params.sorts = [`id desc`];
    }

    return MenuAPI.findMenuListApi(params);
  },
  pk: "id",
  toolbar: [
    {
      name: "syncMenu",
      icon: "refresh",
      text: "同步菜单",
      auth: "sync",
      type: "success",
    },
    {
      name: "clearMenu",
      icon: "delete",
      text: "清空菜单",
      auth: "clear",
      type: "info",
    },
    {
      name: "addMenu",
      icon: "plus",
      text: "新增菜单",
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
      show: false,
    },
    // {
    //   label: "图标",
    //   prop: "icon",
    //   width: 80,
    //   align: "center",
    //   templet: "custom",
    // },
    {
      label: "菜单名称",
      prop: "title",
      width: 120,
      align: "left",
      templet: "custom",
    },
    {
      label: "类型",
      prop: "type",
      width: 100,
      align: "center",
      templet: "custom",
    },
    {
      label: "路由名称",
      prop: "name",
      width: 120,
      align: "center",
    },
    {
      label: "路由路径",
      prop: "path",
      width: 120,
      align: "center",
    },
    {
      label: "组件路径",
      prop: "component",
      width: 200,
      align: "center",
    },
    {
      label: "权限标识",
      prop: "perm",
      width: 100,
      align: "center",
    },
    {
      label: "排序",
      prop: "rank",
      width: 80,
      align: "center",
    },
    {
      label: "是否隐藏",
      prop: "is_hidden",
      width: 100,
      align: "center",
      templet: "custom",
    },
    {
      label: "是否禁用",
      prop: "is_disable",
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
      label: "操作栏",
      align: "center",
      fixed: "right",
      width: 220,
      templet: "tool",
      operat: [
        {
          name: "addSubMenu",
          auth: "menu:addSubMenu",
          icon: "plus",
          text: "添加",
          type: "success",
        },
        {
          name: "editMenu",
          auth: "menu:editMenu",
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
