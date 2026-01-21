import type { IModalConfig } from "@/components/CURD/types";
import type { UpdateNoticeReq } from "@/api/types";
import { NoticeAPI } from "@/api/notice";
import { NoticeAppEnum, NoticeLevelEnum, NoticeTypeEnum } from "@/enums/blog";

const modalConfig: IModalConfig<UpdateNoticeReq> = {
  permPrefix: "website:notice",
  component: "dialog",
  dialog: {
    title: "编辑通知",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction: function (data) {
    return NoticeAPI.updateNoticeApi(data);
  },
  formItems: [
    {
      label: "通知标题",
      prop: "title",
      rules: [{ required: true, message: "通知标题不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        type: "textarea",
        rows: 2,
        placeholder: "请输入通知标题",
      },
    },
    {
      label: "通知内容",
      prop: "content",
      rules: [{ required: true, message: "通知内容不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        type: "textarea",
        rows: 6,
        placeholder: "请输入通知内容",
      },
    },
    {
      label: "通知类型",
      prop: "type",
      rules: [{ required: true, message: "请选择通知类型", trigger: "change" }],
      type: "select",
      attrs: {
        placeholder: "请选择通知类型",
      },
      options: [
        { label: "系统公告", value: NoticeTypeEnum.SYSTEM },
        { label: "维护通知", value: NoticeTypeEnum.MAINTENANCE },
        { label: "功能更新", value: NoticeTypeEnum.UPDATE },
        { label: "重要提醒", value: NoticeTypeEnum.REMIND },
      ],
    },
    {
      label: "通知等级",
      prop: "level",
      rules: [{ required: true, message: "请选择通知等级", trigger: "change" }],
      type: "select",
      attrs: {
        placeholder: "请选择通知等级",
      },
      options: [
        { label: "普通", value: NoticeLevelEnum.INFO },
        { label: "提醒", value: NoticeLevelEnum.SUCCESS },
        { label: "警告", value: NoticeLevelEnum.WARNING },
        { label: "紧急", value: NoticeLevelEnum.ERROR },
      ],
    },
    {
      label: "目标应用",
      prop: "app_name",
      type: "select",
      attrs: {
        placeholder: "请选择目标应用",
      },
      options: [
        { label: "blog", value: NoticeAppEnum.BLOG },
        { label: "admin", value: NoticeAppEnum.ADMIN },
      ],
    },
  ],
};

export default modalConfig;
