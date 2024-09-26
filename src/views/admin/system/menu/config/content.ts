import type { IContentConfig } from "@/components/CURD/types";
import { MenuQuery } from "@/api/types";
import { batchDeleteMenuApi, findMenuListApi } from "@/api/menu";

const contentConfig: IContentConfig<MenuQuery> = {
  pageName: "sys:user",
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
    console.log("res", res);
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
    return batchDeleteMenuApi(data);
  },
  indexAction: function (params: MenuQuery) {
    if (!params.sorts) {
      params.sorts = [`id desc`];
    }

    return findMenuListApi(params);
  },
  pk: "id",
  toolbar: [
    {
      name: "addMenu",
      icon: "plus",
      text: "新增菜单",
      auth: "add",
      type: "primary",
    },
    {
      name: "syncMenu",
      icon: "refresh",
      text: "同步菜单",
      auth: "plus",
      type: "success",
    },
    {
      name: "write",
      icon: "plus",
      text: "展开/折叠",
      auth: "write",
      type: "info",
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
      label: "菜单名称",
      prop: "meta.title",
      width: 120,
      align: "center",
    },
    {
      label: "图标",
      prop: "icon",
      width: 80,
      align: "center",
      templet: "custom",
    },
    {
      label: "排序",
      prop: "meta.rank",
      width: 80,
      align: "center",
    },
    {
      label: "类型",
      prop: "type",
      width: 100,
      align: "center",
      templet: "tag",
      tagOptions: [
        {
          value: 0,
          label: "菜单",
          type: "success",
        },
        {
          value: 1,
          label: "iframe",
          type: "warning",
        },
        {
          value: 2,
          label: "外链",
          type: "danger",
        },
        {
          value: 3,
          label: "按钮",
          type: "info",
        },
      ],
    },
    {
      label: "是否禁用",
      prop: "is_disable",
      width: 100,
      align: "center",
      templet: "custom",
    },
    {
      label: "是否隐藏",
      prop: "is_hidden",
      width: 100,
      align: "center",
      templet: "custom",
    },
    {
      label: "权限标识",
      prop: "meta.perms",
      width: 100,
      align: "center",
    },
    {
      label: "组件路径",
      prop: "component",
      width: 250,
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
          render(row) {
            return row.type == 0;
          },
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
