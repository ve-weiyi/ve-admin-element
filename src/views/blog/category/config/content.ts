import type { IContentConfig } from "@/components/CURD/types";
import { CategoryQuery } from "@/api/types";
import { deleteCategoryApi, findCategoryListApi } from "@/api/category";

const contentConfig: IContentConfig<any> = {
  pageName: "sys:user",
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
    console.log("res", res);
    return {
      total: res.data.total,
      list: res.data.list,
    };
  },
  indexAction: function (params: any) {
    const data: CategoryQuery = {
      page: params.pageNum,
      page_size: params.pageSize,
      sorts: [],
    };

    return findCategoryListApi(data);
  },
  pk: "id",
  toolbar: [
    "add",
    "delete",
    "import",
    "export",
    {
      name: "custom1",
      icon: "plus",
      text: "自定义1",
      auth: "import",
      type: "info",
    },
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
      width: 220,
      templet: "tool",
      operat: ["edit", "delete"],
    },
  ],
};

export default contentConfig;
