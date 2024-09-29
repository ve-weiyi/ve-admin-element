import type { IContentConfig } from "@/components/CURD/types";
import { ArticleQuery } from "@/api/types";
import { findArticleListApi, topArticleApi } from "@/api/article";

const contentConfig: IContentConfig<ArticleQuery> = {
  pageName: "sys:user",
  pageTitle: "文章管理",
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
  modifyAction: function (row) {
    const data = {
      id: row.id as number,
      is_top: row.value as number,
    };
    return topArticleApi(data);
  },
  indexAction: function (query: ArticleQuery) {
    return findArticleListApi(query);
  },
  pk: "id",
  toolbar: [
    {
      name: "write",
      icon: "plus",
      text: "新增文章",
      auth: "write",
      type: "primary",
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
      label: "文章封面",
      prop: "article_cover",
      width: 100,
      align: "center",
      templet: "image",
      imageWidth: 80,
    },
    {
      label: "文章标题",
      prop: "article_title",
      minWidth: 200,
      width: 0,
      align: "center",
    },
    {
      label: "文章类型",
      prop: "article_type",
      width: 100,
      align: "center",
      templet: "tag",
      tagOptions: [
        {
          value: 1,
          label: "原创",
          type: "success",
        },
        {
          value: 2,
          label: "转载",
          type: "info",
        },
        {
          value: 3,
          label: "翻译",
          type: "warning",
        },
      ],
    },
    {
      label: "分类",
      prop: "category_name",
      width: 100,
      align: "center",
    },
    {
      label: "标签",
      prop: "tag_name_list",
      width: 120,
      align: "center",
    },
    {
      label: "是否置顶",
      prop: "is_top",
      width: 100,
      align: "center",
      templet: "switch",
      activeValue: 1,
      inactiveValue: 0,
    },
    {
      label: "浏览量",
      prop: "views_count",
      width: 80,
      align: "center",
    },
    {
      label: "点赞量",
      prop: "like_count",
      width: 80,
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
      operat: [
        {
          name: "editArticle",
          auth: "article:editArticle",
          icon: "edit",
          text: "编辑",
          type: "primary",
          render(row) {
            return row.is_delete != 1;
          },
        },
        {
          name: "recycleArticle",
          auth: "article:recycleArticle",
          icon: "refresh",
          text: "回收",
          type: "danger",
          render(row) {
            return row.is_delete != 1;
          },
        },
        {
          name: "restoreArticle",
          auth: "article:restoreArticle",
          icon: "refreshLeft",
          text: "恢复",
          type: "success",
          render(row) {
            return row.is_delete == 1;
          },
        },
        {
          name: "removeArticle",
          auth: "article:removeArticle",
          icon: "delete",
          text: "删除",
          type: "info",
          render(row) {
            return row.is_delete == 1;
          },
        },
      ],
    },
  ],
};

export default contentConfig;
