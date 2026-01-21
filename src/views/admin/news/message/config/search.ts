import type { ISearchConfig } from "@/components/CURD/types";
import { MessageStatusEnum } from "@/enums/blog";

const searchConfig: ISearchConfig = {
  permPrefix: "news:message",
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
      label: "状态",
      prop: "status",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      initialValue: 0,
      options: [
        { label: "正常", value: MessageStatusEnum.NORMAL },
        { label: "已编辑", value: MessageStatusEnum.EDITED },
        { label: "已删除", value: MessageStatusEnum.DELETED },
      ],
    },
  ],
};

export default searchConfig;
