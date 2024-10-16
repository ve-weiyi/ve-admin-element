import type { IModalConfig } from "@/components/CURD/types";
import { FileFolderNewReq } from "@/api/types";
import { addFileFolderApi } from "@/api/file";

const modalConfig: IModalConfig<FileFolderNewReq> = {
  pageName: "resource:file",
  dialog: {
    title: "新增用户",
    width: 600,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  formAction: function (data) {
    return addFileFolderApi(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "文件夹路径",
      prop: "file_path",
      rules: [
        { required: true, message: "文件夹地址不能为空", trigger: "blur" },
      ],
      type: "input",
      attrs: {
        placeholder: "请输入文件夹地址",
      },
    },
    {
      label: "文件夹名称",
      prop: "folder_name",
      rules: [
        { required: true, message: "文件夹名称不能为空", trigger: "blur" },
      ],
      type: "input",
      attrs: {
        placeholder: "请输入文件夹名称",
        fontWeight: "bold",
      },
    },
    {
      label: "文件夹描述",
      prop: "folder_desc",
      rules: [
        { required: true, message: "文件夹描述不能为空", trigger: "blur" },
      ],
      type: "input",
      attrs: {
        placeholder: "请输入文件夹描述",
        fontWeight: "bold",
      },
    },
  ],
};

// 如果有异步数据会修改配置的，推荐用reactive包裹，而纯静态配置的可以直接导出
export default reactive(modalConfig);
