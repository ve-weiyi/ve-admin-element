import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  pageName: "sys:user",
  formItems: [
    {
      type: "input",
      label: "文章标题",
      prop: "article_title",
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
      label: "文章分类",
      prop: "category_name",
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
      label: "文章标签",
      prop: "tag_name",
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
      label: "文章类型",
      prop: "article_type",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "100px",
        },
      },
      initialValue: 0,
      options: [
        { label: "原创", value: 1 },
        { label: "转载", value: 2 },
        { label: "翻译", value: 3 },
      ],
    },
  ],
};

export default searchConfig;
