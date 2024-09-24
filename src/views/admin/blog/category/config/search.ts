import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  pageName: "sys:user",
  formItems: [
    {
      type: "input",
      label: "分类名称",
      prop: "category_name",
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
