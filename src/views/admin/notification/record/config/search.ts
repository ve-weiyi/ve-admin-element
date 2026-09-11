import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  permPrefix: "notification:delivery",
  formItems: [
    {
      type: "select",
      label: "投递渠道",
      prop: "channel",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      options: [
        { label: "站内消息", value: "inbox" },
        { label: "短信", value: "sms" },
        { label: "邮件", value: "email" },
      ],
    },
    {
      type: "select",
      label: "投递状态",
      prop: "status",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      options: [
        { label: "未读", value: "unread" },
        { label: "已读", value: "read" },
        { label: "待发送", value: "pending" },
        { label: "已发送", value: "sent" },
        { label: "发送失败", value: "failed" },
      ],
    },
    {
      type: "input",
      label: "接收者",
      prop: "recipient",
      attrs: {
        placeholder: "请输入接收者",
        clearable: true,
        style: {
          width: "200px",
        },
      },
    },
  ],
};

export default searchConfig;
