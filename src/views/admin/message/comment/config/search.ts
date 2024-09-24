import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  pageName: "sys:user",
  formItems: [
    {
      type: "input",
      label: "用户昵称",
      prop: "nickname",
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
      label: "评论来源",
      prop: "type",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      options: [
        { label: "文章", value: 1 },
        { label: "友链", value: 2 },
        { label: "说说", value: 3 },
      ],
    },
    {
      type: "select",
      label: "评论状态",
      prop: "status",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      options: [
        { label: "通过", value: 1 },
        { label: "审核中", value: 0 },
      ],
    },
  ],
};

export default searchConfig;
