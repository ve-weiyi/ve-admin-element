import type { IModalConfig } from "@/components/CURD/types";
import type { NewTagReq } from "@/api/types";
import { TagAPI } from "@/api/tag";

const modalConfig: IModalConfig<NewTagReq> = {
  permPrefix: "blog:tag",
  component: "dialog",
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
    return TagAPI.updateTagApi(data);
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

export default modalConfig;
