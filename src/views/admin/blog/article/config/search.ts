import type { ISearchConfig } from "@/components/CURD/types";
import { ArticleTypeEnum } from "@/enums/blog";

const searchConfig: ISearchConfig = {
  permPrefix: "sys:user",
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
        { label: "全部", value: ArticleTypeEnum.ALL },
        { label: "原创", value: ArticleTypeEnum.ORIGINAL },
        { label: "转载", value: ArticleTypeEnum.REPRINT },
        { label: "翻译", value: ArticleTypeEnum.TRANSLATE },
      ],
    },
  ],
};

export default searchConfig;
