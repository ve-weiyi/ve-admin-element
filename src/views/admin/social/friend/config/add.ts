import type { IModalConfig } from "@/components/CURD/types";
import type { NewFriendReq } from "@/api/types";
import { FriendAPI } from "@/api/friend";

const modalConfig: IModalConfig<NewFriendReq> = {
  permPrefix: "website:friend",
  dialog: {
    title: "新增友链",
    width: 600,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  formAction: function (data) {
    return FriendAPI.addFriendApi(data);
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

// 如果有异步数据会修改配置的，推荐用reactive包裹，而纯静态配置的可以直接导出
export default modalConfig;
