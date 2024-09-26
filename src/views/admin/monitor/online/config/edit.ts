import type { IModalConfig } from "@/components/CURD/types";
import { UpdateUserRolesReq } from "@/api/types";
import { findRoleListApi } from "@/api/role.ts";
import { updateUserRolesApi } from "@/api/account.ts";

const roleOptions = [];
findRoleListApi({}).then((res) => {
  res.data.list.forEach((item) => {
    roleOptions.push({ label: item.role_comment, value: item.id });
  });
});

const modalConfig: IModalConfig<UpdateUserRolesReq> = {
  pageName: "sys:user",
  component: "dialog",
  dialog: {
    title: "编辑用户",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction: function (data) {
    return updateUserRolesApi(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "用户id",
      prop: "user_id",
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
      options: roleOptions,
      initialValue: [],
    },
  ],
};

export default reactive(modalConfig);
