import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  permPrefix: "sys:user",
  formItems: [
    {
      type: "input",
      label: "页面",
      prop: "keywords",
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
