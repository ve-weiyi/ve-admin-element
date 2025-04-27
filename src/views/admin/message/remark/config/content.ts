import type { IContentConfig } from "@/components/CURD/types";
import type { RemarkQuery } from "@/api/types";
import { RemarkAPI } from "@/api/remark";

const contentConfig: IContentConfig<RemarkQuery> = {
  pageName: "sys:user",
  pageTitle: "留言管理",
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
  indexAction: function (query: RemarkQuery) {
    return RemarkAPI.findRemarkListApi(query);
  },
  deleteAction: function (ids: string) {
    const data = {
      ids: [],
    };
    ids.split(",").forEach((id) => data.ids.push(parseInt(id)));
    return RemarkAPI.batchDeleteRemarkApi(data);
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
      label: "留言人",
      prop: "user",
      width: 200,
      align: "center",
      templet: "custom",
    },
    {
      label: "留言内容",
      prop: "message_content",
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
      label: "IP地址",
      prop: "ip_address",
      width: 140,
      align: "center",
      show: false,
    },
    {
      label: "IP来源",
      prop: "ip_address",
      width: 0,
      minWidth: 160,
      align: "center",
      show: false,
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
