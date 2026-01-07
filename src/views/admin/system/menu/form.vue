<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
import type { MenuBackVO, NewMenuReq } from "@/api/types";
import { MenuAPI } from "@/api/menu";
import { MenuTypeEnum, SwitchStatusEnum } from "@/enums/blog";
import { CirclePlusFilled, DeleteFilled, QuestionFilled } from "@element-plus/icons-vue";

interface OptionType {
  value: number;
  label: string;
  children?: OptionType[];
}

const menuForm = defineModel<NewMenuReq>({
  default: () => {},
});

const menuFormRef = ref<FormInstance>();
const menuFormRules = reactive<FormRules>({
  title: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
  name: [{ required: true, message: "路由名称不能为空", trigger: "blur" }],
  path: [
    { required: true, message: "路由地址不能为空", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (menuForm.value.type === MenuTypeEnum.CATALOG && value && !value.startsWith("/")) {
          callback(new Error("目录路径必须以 / 开头"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  component: [
    {
      validator: (rule, value, callback) => {
        if (menuForm.value.type === MenuTypeEnum.MENU && !value) {
          callback(new Error("组件路径不能为空"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  rank: [{ required: true, message: "排序不能为空", trigger: "blur" }],
});

const menuOptions = ref<OptionType[]>([]);

function pushMenuOptions(list: MenuBackVO[]): OptionType[] {
  let ops = [];
  list.forEach((item) => {
    const op: OptionType = {
      value: item.id,
      label: item.title,
    };
    if (item.children?.length > 0) {
      op.children = pushMenuOptions(item.children);
    }
    ops.push(op);
  });
  return ops;
}

const getMenuOptions = () => {
  MenuAPI.findMenuListApi().then((res) => {
    menuOptions.value = pushMenuOptions(res.data.list);
  });
};

// 菜单类型切换
function handleMenuTypeChange() {
  // 类型切换时清空相关字段
  if (menuForm.value.type === MenuTypeEnum.CATALOG) {
    menuForm.value.component = "";
  }
}

onMounted(() => {
  nextTick(() => {
    getMenuOptions();
  });
});
</script>

<template>
  <div>
    <el-form ref="menuFormRef" :model="menuForm" :rules="menuFormRules" label-width="100px">
      <el-form-item label="父级菜单" prop="parent_id">
        <el-tree-select
          v-model="menuForm.parent_id"
          placeholder="选择上级菜单"
          :data="menuOptions"
          filterable
          check-strictly
          :render-after-expand="false"
        />
      </el-form-item>

      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="menuForm.name" placeholder="请输入菜单名称" />
      </el-form-item>

      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="menuForm.type" @change="handleMenuTypeChange">
          <el-radio :value="MenuTypeEnum.CATALOG">目录</el-radio>
          <el-radio :value="MenuTypeEnum.MENU">菜单</el-radio>
          <el-radio :value="MenuTypeEnum.BUTTON">按钮</el-radio>
          <el-radio :value="MenuTypeEnum.EXTLINK">外链</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="menuForm.type == MenuTypeEnum.EXTLINK" label="外链地址" prop="path">
        <el-input v-model="menuForm.path" placeholder="请输入外链完整路径" />
      </el-form-item>

      <el-form-item v-if="menuForm.type == MenuTypeEnum.MENU" prop="name">
        <template #label>
          <div>
            路由名称
            <el-tooltip placement="bottom" effect="light">
              <template #content>
                如果需要开启缓存，需保证页面 defineOptions 中的 name 与此处一致，建议使用驼峰。
              </template>
              <el-icon style="vertical-align: -0.15em" size="16">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <el-input v-model="menuForm.name" placeholder="User" />
      </el-form-item>

      <el-form-item
        v-if="menuForm.type == MenuTypeEnum.CATALOG || menuForm.type == MenuTypeEnum.MENU"
        prop="path"
      >
        <template #label>
          <div>
            路由路径
            <el-tooltip placement="bottom" effect="light">
              <template #content>
                定义应用中不同页面对应的 URL 路径，目录需以 / 开头，菜单项不用。例如：系统管理目录
                /system，系统管理下的用户管理菜单 user。
              </template>
              <el-icon style="vertical-align: -0.15em" size="16">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
        <el-input
          v-if="menuForm.type == MenuTypeEnum.CATALOG"
          v-model="menuForm.path"
          placeholder="system"
        />
        <el-input v-else v-model="menuForm.path" placeholder="user" />
      </el-form-item>

      <el-form-item v-if="menuForm.type == MenuTypeEnum.MENU" prop="component">
        <template #label>
          <div>
            组件路径
            <el-tooltip placement="bottom" effect="light">
              <template #content>
                组件页面完整路径，相对于 src/views/，如 system/user/index，缺省后缀 .vue
              </template>
              <el-icon style="vertical-align: -0.15em" size="16">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>

        <el-input v-model="menuForm.component" placeholder="system/user/index" style="width: 95%">
          <template v-if="menuForm.type == MenuTypeEnum.MENU" #prepend>src/views/</template>
          <template v-if="menuForm.type == MenuTypeEnum.MENU" #append>.vue</template>
        </el-input>
      </el-form-item>

      <el-form-item v-if="menuForm.type == MenuTypeEnum.MENU">
        <template #label>
          <div>
            路由参数
            <el-tooltip placement="bottom" effect="light">
              <template #content>组件页面使用 `useRoute().query.参数名` 获取路由参数值。</template>
              <el-icon style="vertical-align: -0.15em" size="16">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>

        <div v-if="!menuForm.params || menuForm.params.length === 0">
          <el-button type="success" plain @click="menuForm.params = [{ key: '', value: '' }]">
            添加路由参数
          </el-button>
        </div>

        <div v-else>
          <div v-for="(item, index) in menuForm.params" :key="index">
            <el-input v-model="item.key" placeholder="参数名" style="width: 100px" />

            <span class="mx-1">=</span>

            <el-input v-model="item.value" placeholder="参数值" style="width: 100px" />

            <el-icon
              class="ml-2 cursor-pointer color-[var(--el-color-success)]"
              style="vertical-align: -0.15em"
              v-if="menuForm.params.indexOf(item) === menuForm.params.length - 1"
              @click="menuForm.params.push({ key: '', value: '' })"
            >
              <CirclePlusFilled />
            </el-icon>
            <el-icon
              class="ml-2 cursor-pointer color-[var(--el-color-danger)]"
              style="vertical-align: -0.15em"
              @click="menuForm.params.splice(menuForm.params.indexOf(item), 1)"
            >
              <DeleteFilled />
            </el-icon>
          </div>
        </div>
      </el-form-item>

      <el-form-item v-if="menuForm.type !== MenuTypeEnum.BUTTON" prop="visible" label="显示状态">
        <el-radio-group v-model="menuForm.is_hidden">
          <el-radio :value="SwitchStatusEnum.DISABLED">显示</el-radio>
          <el-radio :value="SwitchStatusEnum.ENABLED">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-if="menuForm.type === MenuTypeEnum.CATALOG || menuForm.type === MenuTypeEnum.MENU"
      >
        <template #label>
          <div>
            始终显示
            <el-tooltip placement="bottom" effect="light">
              <template #content>
                选择“是”，即使目录或菜单下只有一个子节点，也会显示父节点。
                <br />
                选择“否”，如果目录或菜单下只有一个子节点，则只显示该子节点，隐藏父节点。
                <br />
                如果是叶子节点，请选择“否”。
              </template>
              <el-icon style="vertical-align: -0.15em" size="16">
                <QuestionFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </template>

        <el-radio-group v-model="menuForm.always_show">
          <el-radio :value="1">是</el-radio>
          <el-radio :value="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="menuForm.type === MenuTypeEnum.MENU" label="页面缓存">
        <el-radio-group v-model="menuForm.keep_alive">
          <el-radio :value="1">开启</el-radio>
          <el-radio :value="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="排序" prop="rank">
        <el-input-number
          v-model="menuForm.rank"
          style="width: 100px"
          controls-position="right"
          :min="0"
        />
      </el-form-item>

      <!-- 权限标识 -->
      <el-form-item v-if="menuForm.type == MenuTypeEnum.BUTTON" label="权限标识" prop="perm">
        <el-input v-model="menuForm.perm" placeholder="sys:user:add" />
      </el-form-item>

      <el-form-item v-if="menuForm.type !== MenuTypeEnum.BUTTON" label="图标" prop="icon">
        <!-- 图标选择器 -->
        <icon-select v-model="menuForm.icon" />
      </el-form-item>

      <el-form-item v-if="menuForm.type == MenuTypeEnum.CATALOG" label="跳转路由">
        <el-input v-model="menuForm.redirect" placeholder="跳转路由" />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
