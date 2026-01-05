import type { ISearchConfig } from "@/components/CURD/types";
import { HTTP_METHODS_WITH_EMPTY } from "@/utils/constants.ts";

const searchConfig: ISearchConfig = {
  permPrefix: "sys:api",
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
        placeholder: "请选择",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      options: HTTP_METHODS_WITH_EMPTY,
    },
  ],
};

export default searchConfig;
