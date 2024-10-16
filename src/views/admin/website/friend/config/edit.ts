import type { IModalConfig } from "@/components/CURD/types";
import { DeviceEnum } from "@/enums/DeviceEnum";
import { useAppStore } from "@/store";
import { FriendNewReq } from "@/api/types";
import { updateFriendApi } from "@/api/friend";

const modalConfig: IModalConfig<FriendNewReq> = {
  pageName: "website:friend",
  component: "drawer",
  drawer: {
    title: "修改友链",
    size: useAppStore().device === DeviceEnum.MOBILE ? "80%" : 500,
  },
  pk: "id",
  formAction: function (data) {
    return updateFriendApi(data);
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
      prop: "link_url",
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
      prop: "link_desc",
      rules: [{ required: true, message: "链接描述不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入链接描述",
      },
    },
  ],
};

export default reactive(modalConfig);
