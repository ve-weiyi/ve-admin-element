import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  pageName: "sys:user",
  formItems: [
    {
      type: "input",
      label: "文件路径",
      prop: "file_path",
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
