import type { IModalConfig } from "@/components/CURD/types";
import { RoleNewReq } from "@/api/types";
import { addRoleApi } from "@/api/role.ts";

const modalConfig: IModalConfig<RoleNewReq> = {
  pageName: "sys:user",
  dialog: {
    title: "新增用户",
    width: 600,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  formAction: function (data) {
    return addRoleApi(data);
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

// 如果有异步数据会修改配置的，推荐用reactive包裹，而纯静态配置的可以直接导出
export default reactive(modalConfig);
