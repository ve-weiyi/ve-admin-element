import type { IContentConfig } from "@/components/CURD/types";
import { FileFolderQuery } from "@/api/types";
import { deletesFileFolderApi, findFileFolderListApi } from "@/api/file.ts";

const contentConfig: IContentConfig<FileFolderQuery> = {
  pageName: "resource:file",
  pageTitle: "文件管理",
  table: {
    border: false,
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
  indexAction: function (query) {
    return findFileFolderListApi(query);
  },
  deleteAction: function (ids: string) {
    const data = {
      ids: [],
    };
    ids.split(",").forEach((id) => data.ids.push(parseInt(id)));
    return deletesFileFolderApi(data);
  },
  pk: "id",
  toolbar: [
    {
      name: "addFolder",
      icon: "plus",
      text: "新增文件夹",
      auth: "addFolder",
      type: "primary",
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
      show: false,
    },
    {
      label: "",
      prop: "icon",
      width: 80,
      align: "center",
      templet: "custom",
    },
    {
      label: "文件夹路径",
      prop: "file_path",
      width: 120,
      align: "center",
    },
    {
      label: "文件夹名称",
      prop: "folder_name",
      width: 120,
      align: "center",
    },
    {
      label: "文件夹描述",
      prop: "folder_desc",
      width: 0,
      minWidth: 200,
      align: "center",
    },
    {
      label: "创建者",
      prop: "user_id",
      width: 120,
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
