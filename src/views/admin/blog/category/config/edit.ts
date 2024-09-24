import type { IModalConfig } from "@/components/CURD/types";
import { DeviceEnum } from "@/enums/DeviceEnum";
import { useAppStore } from "@/store";
import type { CategoryNewReq } from "@/api/types";
import { updateCategoryApi } from "@/api/category";

const modalConfig: IModalConfig<CategoryNewReq> = {
  pageName: "sys:user",
  component: "drawer",
  drawer: {
    title: "修改分类",
    size: useAppStore().device === DeviceEnum.MOBILE ? "80%" : 500,
  },
  pk: "id",
  formAction: function (data) {
    return updateCategoryApi(data);
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

export default reactive(modalConfig);
