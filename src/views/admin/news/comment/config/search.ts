import type { ISearchConfig } from "@/components/CURD/types";
import { CommentStatusEnum, CommentTypeEnum } from "@/enums/blog";

const searchConfig: ISearchConfig = {
  permPrefix: "news:comment",
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
      initialValue: 0,
      options: [
        { label: "全部", value: CommentTypeEnum.ALL },
        { label: "文章", value: CommentTypeEnum.ARTICLE },
        { label: "友链", value: CommentTypeEnum.FRIEND },
        { label: "说说", value: CommentTypeEnum.TALK },
      ],
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
        { label: "正常", value: CommentStatusEnum.NORMAL },
        { label: "已编辑", value: CommentStatusEnum.EDITED },
        { label: "已删除", value: CommentStatusEnum.DELETED },
      ],
    },
  ],
};

export default searchConfig;
