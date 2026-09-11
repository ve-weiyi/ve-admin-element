import type { IModalConfig } from "@/components/CURD/types";
import type { UpdateRoleReq } from "@/api/types";
import { RoleAPI } from "@/api";
import { RoleDefaultEnum, RoleStatusEnum } from "@/enums/blog";

const modalConfig: IModalConfig<UpdateRoleReq> = {
  permPrefix: "sys:role",
  component: "dialog",
  dialog: {
    title: "编辑角色",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction(data) {
    return RoleAPI.updateRole(data);
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
        type: "textarea",
        placeholder: "角色备注",
        rows: 3,
      },
    },
    {
      label: "是否默认角色",
      prop: "is_default",
      type: "switch",
      attrs: {
        activeValue: RoleDefaultEnum.YES,
        inactiveValue: RoleDefaultEnum.NO,
      },
      tips: "用户创建时分配的角色",
    },
    {
      label: "状态",
      prop: "status",
      type: "switch",
      attrs: {
        activeValue: RoleStatusEnum.DISABLED,
        inactiveValue: RoleStatusEnum.NORMAL,
      },
    },
  ],
};

export default modalConfig;
