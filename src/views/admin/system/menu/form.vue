<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, toRefs } from "vue";
import { FormInstance, FormRules } from "element-plus";
import IconSelect from "@/components/IconSelect/index.vue";
import { MenuNewReq } from "@/api/types.ts";
import { findMenuListApi } from "@/api/menu.ts";

const menuForm = defineModel<MenuNewReq>({
  default: () => ({
    children: [],
    component: "",
    id: 0,
    meta: {},
    name: "",
    parent_id: 0,
    path: "",
    redirect: "",
    type: 0,
  }),
});

const enum MenuTypeEnum {
  CATEGORY = 0,
  MENU = 1,
  BUTTON = 2,
}

const menuFormRef = ref<FormInstance>();
const menuFormRules = reactive<FormRules>({
  name: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
  component: [{ required: true, message: "组件不能为空", trigger: "blur" }],
  rank: [{ required: true, message: "顺序不能为空", trigger: "blur" }],
  path: [{ required: true, message: "路由地址不能为空", trigger: "blur" }],
});

const data = reactive({
  showSearch: true,
  loading: false,
  title: "",
  addOrUpdate: false,
  isDisable: [
    {
      value: 0,
      label: "正常",
    },
    {
      value: 1,
      label: "禁用",
    },
  ],
  isHidden: [
    {
      value: 0,
      label: "显示",
    },
    {
      value: 1,
      label: "隐藏",
    },
  ],
  showChooseIcon: false,
  refreshTable: true,
  isExpandAll: false,
});
const { isDisable, isHidden, showChooseIcon } = toRefs(data);

const menuOptions = ref<MenuNewReq[]>([]);
const getMenuOptions = () => {
  findMenuListApi().then((res) => {
    menuOptions.value = res.data.list;
  });
};

onMounted(() => {
  console.log("menuForm", menuForm.value);
  nextTick(() => {
    getMenuOptions();
  });
});
</script>

<template>
  <div>
    <el-form
      ref="menuFormRef"
      :model="menuForm"
      :rules="menuFormRules"
      label-width="100px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <el-tree-select
              v-model="menuForm.parent_id"
              :data="menuOptions"
              node-key="id"
              placeholder="选择上级菜单"
              filterable
              check-strictly
              :render-after-expand="false"
            >
              <template #default="{ node, data }">
                {{ data.meta.title }}
              </template>
            </el-tree-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型">
            <el-radio-group v-model="menuForm.type">
              <el-radio :value="MenuTypeEnum.CATEGORY">目录</el-radio>
              <el-radio :value="MenuTypeEnum.MENU">菜单</el-radio>
              <el-radio :value="MenuTypeEnum.BUTTON">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24" v-if="menuForm.type != MenuTypeEnum.MENU">
          <el-form-item label="菜单图标">
            <el-popover placement="bottom-start" :width="540" trigger="click">
              <template #reference>
                <el-input
                  v-model="menuForm.meta.icon"
                  placeholder="点击选择图标"
                  readonly
                  @click="showChooseIcon = true"
                >
                  <template #prefix>
                    <svg-icon
                      v-if="menuForm.meta.icon"
                      :icon-class="menuForm.meta.icon"
                    />
                    <el-icon v-else style="width: 16px; height: 32px">
                      <search />
                    </el-icon>
                  </template>
                </el-input>
              </template>
              <icon-select v-model="menuForm.meta.icon" />
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称">
            <el-input v-model="menuForm.name" placeholder="请输入菜单名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序">
            <el-input-number
              v-model="menuForm.meta.rank"
              controls-position="right"
              :min="1"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="menuForm.type != MenuTypeEnum.MENU">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip content="访问的路由地址，如：user" placement="top">
                  <el-icon><question-filled /></el-icon>
                </el-tooltip>
                路由地址
              </span>
            </template>
            <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="menuForm.type == MenuTypeEnum.BUTTON">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip
                  content="访问的组件路径，如：/user/index，默认在views目录下"
                  placement="top"
                >
                  <el-icon><question-filled /></el-icon>
                </el-tooltip>
                组件路径
              </span>
            </template>
            <el-input
              v-model="menuForm.component"
              placeholder="请输入组件路径"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="menuForm.type != MenuTypeEnum.CATEGORY">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip
                  content="控制器中定义的权限字符，如：system:user:list"
                  placement="top"
                >
                  <el-icon><question-filled /></el-icon>
                </el-tooltip>
                权限字符
              </span>
            </template>
            <el-input
              v-model="menuForm.meta.perms"
              placeholder="请输入权限标识"
              maxlength="100"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="menuForm.type != MenuTypeEnum.MENU">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip
                  content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
                  placement="top"
                >
                  <el-icon><question-filled /></el-icon>
                </el-tooltip>
                显示状态
              </span>
            </template>
            <el-radio-group v-model="menuForm.meta.is_hidden">
              <el-radio
                v-for="dict in isHidden"
                :key="dict.value"
                :value="dict.value"
              >
                {{ dict.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="menuForm.type != MenuTypeEnum.MENU">
          <el-form-item>
            <template #label>
              <span>
                <el-tooltip
                  content="选择停用则路由将不会出现在侧边栏，也不能被访问"
                  placement="top"
                >
                  <el-icon><question-filled /></el-icon>
                </el-tooltip>
                菜单状态
              </span>
            </template>
            <el-radio-group v-model="menuForm.meta.is_disable">
              <el-radio
                v-for="dict in isDisable"
                :key="dict.value"
                :value="dict.value"
              >
                {{ dict.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
