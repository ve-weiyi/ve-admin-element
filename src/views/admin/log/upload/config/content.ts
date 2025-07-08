import type { IContentConfig } from "@/components/CURD/types";
import type { UploadLogQuery } from "@/api/types";
import { UploadLogAPI } from "@/api/upload_log";

const contentConfig: IContentConfig<UploadLogQuery> = {
  pageTitle: "上传日志",
  permPrefix: "log:upload",
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
    return UploadLogAPI.findUploadLogListApi(query);
  },
  deleteAction: function (ids: string) {
    const data = {
      ids: [],
    };
    ids.split(",").forEach((id) => data.ids.push(parseInt(id)));
    return UploadLogAPI.deletesUploadLogApi(data);
  },
  pk: "id",
  toolbar: ["delete"],
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
      label: "预览",
      prop: "icon",
      width: 80,
      align: "center",
      templet: "custom",
    },
    {
      label: "文件目录",
      prop: "file_path",
      width: 140,
      align: "left",
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
      label: "创建者",
      prop: "creator",
      width: 150,
      align: "left",
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
          name: "download",
          text: "下载",
          perm: "download",
          attrs: {
            icon: "download",
            type: "primary",
          },
          render(row) {
            return row.file_type != "";
          },
        },
        "delete",
      ],
    },
  ],
};

export default contentConfig;
