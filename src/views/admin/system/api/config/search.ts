import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  pageName: "sys:user",
  formItems: [
    {
      type: "input",
      label: "名称",
      prop: "name",
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
      label: "路径",
      prop: "path",
      attrs: {
        placeholder: "请输入",
        clearable: true,
        style: {
          width: "150px",
        },
      },
    },
    {
      type: "select",
      label: "请求方法",
      prop: "method",
      attrs: {
        placeholder: "请输入",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      options: [
        {
          label: "GET",
          value: "GET",
        },
        {
          label: "POST",
          value: "POST",
        },
        {
          label: "PUT",
          value: "PUT",
        },
        {
          label: "DELETE",
          value: "DELETE",
        },
        {
          label: "NULL",
          value: "",
        },
      ],
    },
  ],
};

export default searchConfig;
