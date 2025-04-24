import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  pageName: "website:friend",
  formItems: [
    {
      type: "input",
      label: "链接名称",
      prop: "link_name",
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
