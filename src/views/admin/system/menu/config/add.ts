import type { IModalConfig } from "@/components/CURD/types";
import type { NewMenuReq } from "@/api/types";
import { MenuAPI } from "@/api/menu";
import { SwitchStatusEnum } from "@/enums/blog/index";

const modalConfig: IModalConfig<NewMenuReq> = {
  permPrefix: "sys:menu",
  dialog: {
    title: "新增菜单",
    width: 600,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  formAction: function (data) {
    return MenuAPI.addMenuApi(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "菜单名称",
      prop: "title",
      rules: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入菜单名称",
      },
    },
    {
      label: "路由名称",
      prop: "name",
      rules: [{ required: true, message: "路由名称不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入路由名称",
      },
    },
    {
      label: "路由路径",
      prop: "path",
      rules: [{ required: true, message: "路由路径不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入路由路径",
      },
    },
    {
      label: "组件路径",
      prop: "component",
      type: "input",
      attrs: {
        placeholder: "请输入组件路径",
      },
    },
    {
      label: "权限标识",
      prop: "perm",
      type: "input",
      attrs: {
        placeholder: "请输入权限标识",
      },
    },
    {
      label: "排序",
      prop: "rank",
      type: "input-number",
      attrs: {
        placeholder: "请输入排序",
        min: 0,
      },
    },
    {
      label: "是否隐藏",
      prop: "is_hidden",
      type: "switch",
      attrs: {
        activeValue: SwitchStatusEnum.ENABLED,
        inactiveValue: SwitchStatusEnum.DISABLED,
      },
    },
    {
      label: "是否禁用",
      prop: "is_disable",
      type: "switch",
      attrs: {
        activeValue: SwitchStatusEnum.ENABLED,
        inactiveValue: SwitchStatusEnum.DISABLED,
      },
    },
  ],
};

export default modalConfig;
