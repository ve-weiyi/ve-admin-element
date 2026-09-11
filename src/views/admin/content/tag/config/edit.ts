import type { IModalConfig } from "@/components/CURD/types";
import type { UpdateTagReq } from "@/api/types";
import { TagAPI } from "@/api";

const modalConfig: IModalConfig<UpdateTagReq> = {
  permPrefix: "blog:tag",
  component: "dialog",
  dialog: {
    title: "新增用户",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction(data) {
    return TagAPI.updateTag(data);
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
