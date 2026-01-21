import type { IModalConfig } from "@/components/CURD/types";
import type { NewCategoryReq } from "@/api/types";
import { CategoryAPI } from "@/api/category";

const modalConfig: IModalConfig<NewCategoryReq> = {
  permPrefix: "blog:category",
  component: "dialog",
  dialog: {
    title: "修改分类",
    width: 600,
    draggable: true,
  },
  pk: "id",
  formAction: function (data) {
    return CategoryAPI.updateCategoryApi(data);
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

export default modalConfig;
