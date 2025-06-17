import type { IModalConfig } from "@/components/CURD/types";
import type { ApiNewReq } from "@/api/types";
import { ApiAPI } from "@/api/api";

const modalConfig: IModalConfig<ApiNewReq> = {
  pageName: "sys:api",
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
      label: "父级菜单",
      prop: "parent_id",
      type: "input-number",
      initialValue: 0,
      attrs: {
        placeholder: "父级ID",
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
      rules: [{ required: true, message: "接口路径不能为空", trigger: "blur" }],
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
      options: [
        { label: "GET", value: "GET" },
        { label: "POST", value: "POST" },
        { label: "PUT", value: "PUT" },
        { label: "DELETE", value: "DELETE" },
      ],
    },
    {
      label: "是否记录日志",
      prop: "traceable",
      type: "switch",
      attrs: {
        activeValue: 1,
        inactiveValue: 0,
      },
    },
    {
      label: "是否禁用",
      prop: "is_disable",
      type: "switch",
      attrs: {
        activeValue: 1,
        inactiveValue: 0,
      },
    },
  ],
};

export default reactive(modalConfig);
