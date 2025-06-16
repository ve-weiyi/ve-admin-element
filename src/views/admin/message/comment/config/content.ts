import type { IContentConfig } from "@/components/CURD/types";
import type { CommentQuery } from "@/api/types";
import { CommentAPI } from "@/api/comment";

const contentConfig: IContentConfig<CommentQuery> = {
  pageName: "sys:user",
  pageTitle: "评论管理",
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
  indexAction: function (query: CommentQuery) {
    return CommentAPI.findCommentBackListApi(query);
  },
  deleteAction: function (ids: string) {
    const data = {
      ids: [],
    };
    ids.split(",").forEach((id) => data.ids.push(parseInt(id)));
    return CommentAPI.deletesCommentApi(data);
  },
  pk: "id",
  toolbar: [
    {
      name: "review",
      icon: "CircleCheck",
      text: "批量通过",
      auth: "review",
      type: "success",
    },
    "delete",
  ],
  defaultToolbar: ["refresh", "filter", "search"],
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
      label: "评论人",
      prop: "user",
      width: 150,
      align: "center",
      templet: "custom",
    },
    {
      label: "回复人",
      prop: "reply_user",
      width: 150,
      align: "center",
      templet: "custom",
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
      minWidth: 200,
      width: 0,
      align: "center",
    },
    {
      label: "状态",
      prop: "is_review",
      width: 100,
      align: "center",
      templet: "custom",
    },
    {
      label: "类型",
      prop: "type",
      align: "center",
      width: 80,
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
      width: 160,
      templet: "tool",
      operat: [
        {
          name: "review",
          auth: "password:reset",
          icon: "check",
          text: "通过",
          type: "success",
          render(row) {
            return row.is_review != 1;
          },
        },
        "delete",
      ],
    },
  ],
};

export default contentConfig;
