import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  permPrefix: "sys:visitor",
  formItems: [
    {
      type: "input",
      label: "终端ID",
      prop: "terminal_id",
      attrs: {
        placeholder: "请输入",
        clearable: true,
        style: {
          width: "200px",
        },
      },
    },
    {
      type: "input",
      label: "IP归属地",
      prop: "ip_source",
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
