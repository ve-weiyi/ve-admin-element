import type { IModalConfig } from "@/components/CURD/types";
import type { CreateCategoryReq } from "@/api/types";
import { CategoryAPI } from "@/api";

const modalConfig: IModalConfig<CreateCategoryReq> = {
  permPrefix: "blog:category",
  component: "dialog",
  dialog: {
    title: "新增用户",
    width: 600,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  formAction(data) {
    return CategoryAPI.createCategory(data);
  },
  beforeSubmit(data) {
    console.log("提交之前处理", data);
  },
  formItems: [
    {
      label: "分类名",
      prop: "category_name",
      rules: [{ required: true, message: "分类名不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入分类名",
      },
    },
  ],
};

// 如果有异步数据会修改配置的，推荐用reactive包裹，而纯静态配置的可以直接导出
export default modalConfig;
