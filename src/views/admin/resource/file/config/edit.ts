import type { IModalConfig } from "@/components/CURD/types";
import { DeviceEnum } from "@/enums/DeviceEnum";
import { useAppStore } from "@/store";
import { FriendNewReq } from "@/api/types";
import { updateFriendApi } from "@/api/friend";

const modalConfig: IModalConfig<FriendNewReq> = {
  pageName: "resource:file",
  component: "drawer",
  drawer: {
    title: "修改标签",
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
      label: "文件夹路径",
      prop: "file_path",
      rules: [
        { required: true, message: "文件夹地址不能为空", trigger: "blur" },
      ],
      type: "input",
      attrs: {
        placeholder: "请输入文件夹地址",
      },
    },
    {
      label: "文件夹名称",
      prop: "folder_name",
      rules: [
        { required: true, message: "文件夹名称不能为空", trigger: "blur" },
      ],
      type: "input",
      attrs: {
        placeholder: "请输入文件夹名称",
      },
    },
    {
      label: "文件夹描述",
      prop: "folder_desc",
      rules: [
        { required: true, message: "文件夹描述不能为空", trigger: "blur" },
      ],
      type: "input",
      attrs: {
        placeholder: "请输入文件夹描述",
      },
    },
  ],
};

export default reactive(modalConfig);
