<template>
  <div>
    <div>
      <el-input v-model="filterText" class="filter" placeholder="筛选" @input="onQueryChanged">
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
      </el-input>
      <div>
        <el-checkbox v-model="isExpandAll" @change="handleCheckedTreeExpand">展开/折叠</el-checkbox>
        <el-checkbox v-model="isSelectAll" @change="handleCheckedTreeNodeAll">
          全选/全不选
        </el-checkbox>
        <el-checkbox v-model="isStrictly" @change="handleCheckedTreeConnect">父子联动</el-checkbox>
        <el-tooltip placement="bottom">
          <template #content>
            如果只需勾选菜单权限，不需要勾选子菜单或者按钮权限，请关闭父子联动
          </template>
          <el-icon class="ml-1 color-[--el-color-primary] inline-block cursor-pointer">
            <QuestionFilled />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="tree-content">
      <el-tree
        ref="treeRef"
        :data="treeData"
        :props="treeProps"
        :default-checked-keys="defaultCheckIds"
        :filter-node-method="filterNodeMethod"
        :check-strictly="!isStrictly"
        :default-expand-all="false"
        highlight-current
        show-checkbox
        node-key="id"
        @check="onCheck"
      >
        <template #default="{ node, data }">
          <slot name="default" :node="node" :data="data">
            <span>{{ data.label }}</span>
          </slot>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import type { CheckboxValueType } from "element-plus";
import { ElTree } from "element-plus";

// 父组件向子组件传输的数据
const props = defineProps({
  treeData: {
    type: Array,
    required: false,
    default: function () {
      return [];
    },
  },
  defaultCheckIds: {
    type: Array as () => number[],
    required: false,
    default: function () {
      return [];
    },
  },
});

// 子组件向父组件通讯
const emit = defineEmits(["onNodeCheck"]);

const data = reactive({
  isExpandAll: false,
  isSelectAll: false,
  isStrictly: true,
});

const isExpandAll = ref(data.isExpandAll);
const isSelectAll = ref(data.isSelectAll);
const isStrictly = ref(data.isStrictly);

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeProps = ref({
  children: "children",
  label: "label",
});

const treeData = ref<any[]>(props.treeData);
const defaultCheckIds = ref<number[]>(props.defaultCheckIds);

const handleCheckedTreeExpand = (value: CheckboxValueType) => {
  let treeList = treeData.value;
  for (let i = 0; i < treeList.length; i++) {
    treeRef.value!.store.nodesMap[treeList[i].id].expanded = isExpandAll.value;
  }
};

const handleCheckedTreeNodeAll = (value: CheckboxValueType) => {
  defaultCheckIds.value = [];
  if (value == true) {
    treeData.value.forEach((item) => {
      defaultCheckIds.value.push(item.id);
      if (item.children) {
        item.children.forEach((item) => {
          defaultCheckIds.value.push(item.id);
        });
      }
    });
  }

  treeRef.value.setCheckedKeys(defaultCheckIds.value);
  emit("onNodeCheck", treeRef.value.getCheckedKeys());
};

const handleCheckedTreeConnect = (value: CheckboxValueType) => {
  isStrictly.value = isStrictly.value ? true : false;
};

const filterNodeMethod = (value, data) => {
  if (!value) {
    return true;
  }
  return data.name.includes(value);
};

const onQueryChanged = (value: string) => {
  treeRef.value.filter(value);
};

const onCheck = () => {
  emit("onNodeCheck", treeRef.value.getCheckedKeys());
};

// watch(filterText, val => {
//   treeRef.value.filter(val);
// });

// 暴露给外层使用的切换拦截统一方法
const getCheckedKeys = () => {
  return treeRef.value.getCheckedKeys();
};
// 关联树 确认方法

defineExpose({ getCheckedKeys });

watchEffect(() => {
  treeData.value = props.treeData;
  defaultCheckIds.value = props.defaultCheckIds;
});
</script>

<style lang="scss" scoped>
.filter {
  width: 60%;
}

.custom-tree-node {
  span + span {
    margin-left: 12px;
  }
}

.tree-content {
  margin-top: 10px;
  height: calc(100vh - 148px);
  overflow: auto;
}

.fl-right {
  float: right;
}
</style>
