import type { IModalConfig } from "@/components/CURD/types";
import { TagNewReq } from "@/api/types";
import { updateTagApi } from "@/api/tag.ts";

const modalConfig: IModalConfig<TagNewReq> = {
  pageName: "sys:user",
  dialog: {
    title: "新增用户",
    width: 600,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  pk: "id",
  formAction: function (data) {
    return updateTagApi(data);
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
