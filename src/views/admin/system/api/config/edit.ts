import type { IModalConfig } from "@/components/CURD/types";
import type { ApiNewReq } from "@/api/types";
import { ApiAPI } from "@/api/api";

const modalConfig: IModalConfig<ApiNewReq> = {
  pageName: "sys:user",
  component: "dialog",
  dialog: {
    title: "编辑角色",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction: function (data) {
    return ApiAPI.updateApiApi(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "标签名",
      prop: "tag_name",
      rules: [{ required: true, message: "标签名不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入标签名",
      },
    },
  ],
};

export default reactive(modalConfig);
