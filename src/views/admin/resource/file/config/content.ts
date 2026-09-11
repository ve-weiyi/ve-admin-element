import type { IContentConfig } from "@/components/CURD/types";
import type { QueryFileListReq } from "@/api/types";
import { UploadAPI } from "@/api";

const contentConfig: IContentConfig<QueryFileListReq> = {
  pageTitle: "文件管理",
  permPrefix: "resource:file",
  table: {
    border: false,
    highlightCurrentRow: true,
  },
  pagination: {
    background: true,
    layout: "prev,pager,next,jumper,total,sizes",
    pageSize: 20,
    pageSizes: [10, 20, 30, 50],
  },
  request: {
    pageName: "page",
    limitName: "limit",
  },
  parseData: (res) => {
    return {
      total: res.data.total,
      list: res.data.list || [],
    };
  },
  indexAction(query) {
    return UploadAPI.queryFileList({
      page_size: (query as any).limit,
      file_base: (query as any).file_base || "",
    } as any);
  },
  pk: "file_base",
  toolbar: [
    {
      name: "upload",
      text: "上传",
      perm: "upload",
      attrs: {
        icon: "plus",
        type: "primary",
      },
    },
    {
      name: "delete",
      text: "删除",
      perm: "delete",
      attrs: {
        icon: "delete",
        type: "danger",
      },
    },
  ],
  defaultToolbar: [
    {
      name: "return",
      text: "返回",
      perm: "return",
      attrs: {
        icon: "RefreshLeft",
      },
    },
    "refresh",
    "filter",
    "search",
  ],
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
      label: "预览",
      prop: "icon",
      width: 80,
      align: "center",
      templet: "custom",
    },
    {
      label: "文件名",
      prop: "file_name",
      minWidth: 200,
      align: "left",
      templet: "custom",
    },
    {
      label: "文件类型",
      prop: "file_type",
      width: 80,
      align: "center",
    },
    {
      label: "文件大小",
      prop: "file_size",
      width: 120,
      align: "center",
      templet: "custom",
    },
    {
      label: "更新时间",
      prop: "updated_at",
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
          name: "download",
          text: "下载",
          perm: "download",
          attrs: {
            icon: "download",
            type: "primary",
          },
          render(row) {
            return row.file_type !== "";
          },
        },
        {
          name: "delete",
          text: "删除",
          perm: "delete",
          attrs: {
            icon: "delete",
            type: "danger",
          },
        },
      ],
    },
  ],
};

export default contentConfig;
