import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  permPrefix: "sys:user",
  formItems: [
    {
      type: "input",
      label: "文件目录",
      prop: "file_path",
      attrs: {
        placeholder: "请输入",
        clearable: true,
        style: {
          width: "150px",
        },
      },
    },
    {
      type: "input",
      label: "文件名称",
      prop: "file_name",
      attrs: {
        placeholder: "请输入",
        clearable: true,
        style: {
          width: "150px",
        },
      },
    },
    {
      type: "input",
      label: "文件类型",
      prop: "file_type",
      attrs: {
        placeholder: "请输入",
        clearable: true,
        style: {
          width: "150px",
        },
      },
    },
  ],
};

export default searchConfig;
