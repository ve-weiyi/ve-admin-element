import type { IModalConfig } from "@/components/CURD/types";
import type { RoleVO, UpdateUserRolesReq } from "@/api/types";
import { RoleAPI } from "@/api";
import { UserAPI } from "@/api";

const modalConfig: IModalConfig<UpdateUserRolesReq> = {
  permPrefix: "sys:user",
  component: "dialog",
  dialog: {
    title: "编辑用户",
    width: 600,
    draggable: true,
  } as const,
  pk: "user_id",
  formAction(data) {
    return UserAPI.updateUserRoles(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "用户ID",
      prop: "user_id",
      type: "input",
      attrs: {
        disabled: true,
      },
    },
    {
      label: "用户名",
      prop: "username",
      type: "input",
      attrs: {
        disabled: true,
      },
    },
    {
      label: "昵称",
      prop: "nickname",
      type: "input",
      attrs: {
        disabled: true,
      },
    },
    {
      label: "邮箱",
      prop: "email",
      type: "input",
      attrs: {
        disabled: true,
      },
    },
    {
      label: "手机号",
      prop: "mobile",
      type: "input",
      attrs: {
        disabled: true,
      },
    },
    {
      label: "注册方式",
      prop: "register_type",
      type: "input",
      attrs: {
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
      options: [],
      async initFn(item) {
        const res = await RoleAPI.queryRoleList({});
        item.options = res.data.list.map((role: RoleVO) => ({
          label: role.role_label,
          value: role.id,
        }));
      },
    },
  ],
};

export default modalConfig;
