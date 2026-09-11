import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  permPrefix: "notification:template",
  formItems: [
    {
      type: "select",
      label: "渠道",
      prop: "channel",
      attrs: {
        placeholder: "请选择渠道",
        clearable: true,
        style: { width: "150px" },
      },
      options: [
        { label: "短信", value: "sms" },
        { label: "邮件", value: "email" },
        { label: "站内", value: "inbox" },
      ],
    },
  ],
};

export default searchConfig;
