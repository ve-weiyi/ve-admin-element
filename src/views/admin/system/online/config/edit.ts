import type { IModalConfig } from "@/components/CURD/types";
import type { RoleVO, UpdateRoleApiPermissionsReq } from "@/api/types";
import { RoleAPI } from "@/api";

const modalConfig: IModalConfig<UpdateRoleApiPermissionsReq> = {
  permPrefix: "monitor:online",
  component: "dialog",
  dialog: {
    title: "编辑用户",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction(data) {
    return RoleAPI.updateRoleApiPermissions(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "用户id",
      prop: "user_id",
      type: "text",
      attrs: {
        disabled: true,
      },
    },
    {
      label: "昵称",
      prop: "nickname",
      rules: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入昵称",
        disabled: true,
      },
    },
    {
      label: "角色",
      prop: "role_ids",
      rules: [{ required: true, message: "用户角色不能为空", trigger: "blur" }],
      type: "select",
      attrs: {
        placeholder: "请选择",
        multiple: true,
      },
      async initFn(item) {
        const res = await RoleAPI.queryRoleList({});
        item.options = res.data.list.map((role: RoleVO) => ({
          label: role.role_label,
          value: role.id,
        }));
      },
      initialValue: [],
    },
  ],
};

export default modalConfig;
