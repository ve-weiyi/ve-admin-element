import type { IContentConfig } from "@/components/CURD/types";
import { FriendQuery } from "@/api/types";
import { batchDeleteFriendApi, findFriendListApi } from "@/api/friend.ts";

const contentConfig: IContentConfig<FriendQuery> = {
  pageName: "sys:user",
  pageTitle: "友链管理",
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
    return batchDeleteFriendApi(data);
  },
  indexAction: function (params: FriendQuery) {
    if (!params.sorts) {
      params.sorts = [`id desc`];
    }

    return findFriendListApi(params);
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
      label: "链接头像",
      prop: "link_avatar",
      width: 100,
      align: "center",
      templet: "image",
    },
    {
      label: "链接名称",
      prop: "link_name",
      width: 120,
      align: "center",
    },
    {
      label: "链接地址",
      prop: "link_address",
      width: 150,
      align: "center",
      templet: "url",
    },
    {
      label: "链接介绍",
      prop: "link_intro",
      minWidth: 200,
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
