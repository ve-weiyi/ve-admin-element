import type { IModalConfig } from "@/components/CURD/types.ts";
import type { FriendNewReq } from "@/api/types.ts";
import { FriendAPI } from "@/api/friend.ts";

const modalConfig: IModalConfig<FriendNewReq> = {
  permPrefix: "website:friend",
  component: "drawer",
  drawer: {
    title: "修改友链",
  },
  pk: "id",
  formAction: function (data) {
    return FriendAPI.updateFriendApi(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "链接名称",
      prop: "link_name",
      rules: [{ required: true, message: "链接名称不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入链接名称",
      },
    },
    {
      label: "链接地址",
      prop: "link_address",
      rules: [{ required: true, message: "链接地址不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入链接地址",
      },
    },
    {
      label: "链接头像",
      prop: "link_avatar",
      rules: [{ required: true, message: "链接头像不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入链接头像",
      },
    },
    {
      label: "链接描述",
      prop: "link_intro",
      rules: [{ required: true, message: "链接描述不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入链接描述",
      },
    },
  ],
};

export default modalConfig;
