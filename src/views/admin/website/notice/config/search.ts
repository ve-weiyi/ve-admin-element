import type { ISearchConfig } from "@/components/CURD/types";
import {
  NoticeAppEnum,
  NoticeLevelEnum,
  NoticePublishStatusEnum,
  NoticeTypeEnum,
} from "@/enums/blog";

const searchConfig: ISearchConfig = {
  permPrefix: "website:notice",
  formItems: [
    {
      type: "select",
      label: "通知类型",
      prop: "type",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      options: [
        { label: "系统公告", value: NoticeTypeEnum.SYSTEM },
        { label: "维护通知", value: NoticeTypeEnum.MAINTENANCE },
        { label: "功能更新", value: NoticeTypeEnum.UPDATE },
        { label: "重要提醒", value: NoticeTypeEnum.REMIND },
      ],
    },
    {
      type: "select",
      label: "通知等级",
      prop: "level",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      options: [
        { label: "普通", value: NoticeLevelEnum.INFO },
        { label: "提醒", value: NoticeLevelEnum.SUCCESS },
        { label: "警告", value: NoticeLevelEnum.WARNING },
        { label: "紧急", value: NoticeLevelEnum.ERROR },
      ],
    },
    {
      type: "select",
      label: "目标应用",
      prop: "app_name",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      options: [
        { label: "blog", value: NoticeAppEnum.BLOG },
        { label: "admin", value: NoticeAppEnum.ADMIN },
      ],
    },
    {
      type: "select",
      label: "发布状态",
      prop: "publish_status",
      attrs: {
        placeholder: "全部",
        clearable: true,
        style: {
          width: "150px",
        },
      },
      initialValue: null,
      options: [
        { label: "草稿", value: NoticePublishStatusEnum.DRAFT },
        { label: "已发布", value: NoticePublishStatusEnum.PUBLISHED },
        { label: "已撤回", value: NoticePublishStatusEnum.REVOKED },
      ],
    },
  ],
};

export default searchConfig;
