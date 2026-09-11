import type { IModalConfig } from "@/components/CURD/types";
import type { UpdateNotifyTemplateReq } from "@/api/types";
import { NotifyTemplateAPI } from "@/api";
import { SwitchEnum } from "@/enums/blog";

const modalConfig: IModalConfig<UpdateNotifyTemplateReq> = {
  permPrefix: "notification:template",
  component: "dialog",
  dialog: {
    title: "编辑通知模板",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction(data) {
    return NotifyTemplateAPI.updateNotifyTemplate(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "模板编码",
      prop: "code",
      rules: [{ required: true, message: "模板编码不能为空", trigger: "blur" }],
      type: "input",
      attrs: { placeholder: "请输入模板编码" },
    },
    {
      label: "渠道",
      prop: "channel",
      rules: [{ required: true, message: "请选择渠道", trigger: "change" }],
      type: "select",
      attrs: { placeholder: "请选择渠道" },
      options: [
        { label: "短信", value: "sms" },
        { label: "邮件", value: "email" },
        { label: "站内", value: "inbox" },
      ],
    },
    {
      label: "场景",
      prop: "scene",
      rules: [{ required: true, message: "场景不能为空", trigger: "blur" }],
      type: "input",
      attrs: { placeholder: "如: login, register, notify" },
    },
    {
      label: "标题",
      prop: "title",
      rules: [{ required: true, message: "标题不能为空", trigger: "blur" }],
      type: "input",
      attrs: { placeholder: "请输入模板标题" },
    },
    {
      label: "模板内容",
      prop: "content",
      rules: [{ required: true, message: "模板内容不能为空", trigger: "blur" }],
      type: "input",
      attrs: { type: "textarea", rows: 4, placeholder: "请输入模板内容" },
    },
    {
      label: "是否启用",
      prop: "enabled",
      type: "switch",
      attrs: { activeValue: SwitchEnum.ON, inactiveValue: SwitchEnum.OFF },
    },
  ],
};

export default modalConfig;
