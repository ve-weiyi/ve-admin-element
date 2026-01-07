import type { IModalConfig } from "@/components/CURD/types";
import type { NewRoleReq } from "@/api/types";
import { RoleAPI } from "@/api/role";

const modalConfig: IModalConfig<NewRoleReq> = {
  permPrefix: "sys:user",
  component: "dialog",
  dialog: {
    title: "编辑角色",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction: function (data) {
    return RoleAPI.updateRoleApi(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "角色标识",
      prop: "role_key",
      rules: [{ required: true, message: "角色标识不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "角色标识",
      },
    },
    {
      label: "角色标签",
      prop: "role_label",
      rules: [{ required: true, message: "角色标签不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "角色标签",
      },
    },
    {
      label: "角色备注",
      prop: "role_comment",
      rules: [{ required: true, message: "角色备注不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "角色备注",
      },
    },
    {
      label: "是否默认角色",
      prop: "is_default",
      type: "switch",
      attrs: {
        "active-value": 1,
        "inactive-value": 0,
      },
    },
    {
      label: "是否禁用",
      prop: "is_disable",
      type: "switch",
      attrs: {
        "active-value": 1,
        "inactive-value": 0,
      },
    },
  ],
};

export default modalConfig;
