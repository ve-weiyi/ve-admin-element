import type { IContentConfig } from "@/components/CURD/types";
import type { QueryCategoryReq } from "@/api/types";
import { CategoryAPI } from "@/api/category";

const contentConfig: IContentConfig<QueryCategoryReq> = {
  pageTitle: "分类管理",
  permPrefix: "sys:category",
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
    return CategoryAPI.deletesCategoryApi(data);
  },
  indexAction: function (params: QueryCategoryReq) {
    if (!params.sorts) {
      params.sorts = [`id desc`];
    }

    return CategoryAPI.findCategoryListApi(params);
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
      label: "分类名称",
      prop: "category_name",
      width: 0,
      align: "center",
    },
    {
      label: "文章数量",
      prop: "article_count",
      width: 0,
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
      width: 160,
      templet: "tool",
      operat: ["edit", "delete"],
    },
  ],
};

export default contentConfig;
