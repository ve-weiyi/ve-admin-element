import type { IModalConfig } from "@/components/CURD/types";
import type { ApiNewReq } from "@/api/types";
import { ApiAPI } from "@/api/api";
import { HTTP_METHODS_WITH_EMPTY } from "@/utils/constants.ts";
import { SwitchStatusEnum } from "@/enums/blog/index.ts";

const modalConfig: IModalConfig<ApiNewReq> = {
  permPrefix: "sys:api",
  component: "dialog",
  dialog: {
    title: "编辑接口",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction: function (data) {
    return ApiAPI.updateApiApi(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "父菜单ID",
      prop: "parent_id",
      type: "input-number",
      initialValue: 0,
      attrs: {
        placeholder: "父级ID",
        disabled: true,
        controls: false,
        style: {
          textAlign: "left",
        },
      },
    },
    {
      label: "父级菜单",
      prop: "parent_name",
      type: "input",
      attrs: {
        placeholder: "",
        disabled: true,
      },
    },
    {
      label: "接口名称",
      prop: "name",
      rules: [{ required: true, message: "接口名称不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入接口名称",
      },
    },
    {
      label: "接口路径",
      prop: "path",
      rules: [
        { required: true, message: "接口路径不能为空", trigger: "blur" },
        { pattern: /^\//, message: "接口路径必须以 / 开头", trigger: "blur" },
      ],
      type: "input",
      attrs: {
        placeholder: "请输入接口路径",
      },
    },
    {
      label: "请求方法",
      prop: "method",
      rules: [{ required: false, message: "请选择请求方法", trigger: "change" }],
      type: "select",
      attrs: {
        placeholder: "请选择请求方法",
      },
      options: HTTP_METHODS_WITH_EMPTY,
    },
    {
      label: "是否记录日志",
      prop: "traceable",
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
