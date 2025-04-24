import type { IModalConfig } from "@/components/CURD/types";
import type { UpdateAccountRolesReq } from "@/api/types";
import { RoleAPI } from "@/api/role";
import { AccountAPI } from "@/api/account";

const roleOptions = [];
RoleAPI.findRoleListApi({}).then((res) => {
  res.data.list.forEach((item) => {
    roleOptions.push({ label: item.role_label, value: item.id });
  });
});

const modalConfig: IModalConfig<UpdateAccountRolesReq> = {
  pageName: "sys:user",
  component: "dialog",
  dialog: {
    title: "编辑用户",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction: function (data) {
    return AccountAPI.updateAccountRolesApi(data);
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
