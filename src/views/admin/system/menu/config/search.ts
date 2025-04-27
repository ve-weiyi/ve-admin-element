import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  pageName: "sys:user",
  formItems: [
    {
      type: "input",
      label: "菜单标题",
      prop: "title",
      attrs: {
        placeholder: "请输入",
        clearable: true,
        style: {
          width: "200px",
        },
      },
    },
  ],
};

export default searchConfig;
