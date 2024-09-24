import type { IContentConfig } from "@/components/CURD/types";
import { CommentQuery } from "@/api/types";
import { deleteCommentApi, findCommentBackListApi } from "@/api/comment";

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
    const data: CommentQuery = {
      page: params.pageNum,
      page_size: params.pageSize,
      sorts: [],
    };

    return findCommentBackListApi(data);
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
      label: "头像",
      align: "center",
      prop: "avatar",
      width: 80,
      templet: "image",
    },
    {
      label: "评论人",
      prop: "nickname",
      width: 120,
      align: "center",
    },
    {
      label: "回复人",
      prop: "to_nickname",
      width: 120,
      align: "center",
    },
    {
      label: "文章标题",
      prop: "topic_title",
      width: 160,
      align: "center",
    },
    {
      label: "评论内容",
      prop: "comment_content",
      width: 0,
      align: "center",
    },
    {
      label: "状态",
      prop: "is_review",
      width: 100,
      align: "center",
      templet: "switch",
      activeValue: 1,
      inactiveValue: 0,
      activeText: "通过",
      inactiveText: "审核中",
    },
    {
      label: "类型",
      prop: "type",
      align: "center",
      width: 80,
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
