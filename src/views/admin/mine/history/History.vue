<template>
  <el-card v-loading="loading">
    <!-- Element 虚拟表格-->
    <el-auto-resizer>
      <template #default="{ _, width }">
        <el-table-v2
          :columns="columns"
          :data="tableData"
          :width="width"
          :height="600"
          :fixed="true"
        >
          <template #empty>
            <div class="flex items-center justify-center h-100%">
              <el-empty />
            </div>
          </template>
        </el-table-v2>
      </template>
    </el-auto-resizer>
  </el-card>
</template>

<script lang="tsx" setup>
import { getUserLoginHistoryListApi } from "@/api/user.ts";
import { Column } from "element-plus";

import "@/styles/table.scss";

const LoginMethod = {
  email: "邮箱",
  phone: "手机",
  wechat: "微信",
  qq: "QQ",
  github: "Github",
  gitee: "Gitee",
  weibo: "微博",
};

const loading = ref<boolean>(false);
const columns = ref<Column<any>[]>([
  {
    key: "login_type",
    title: "登录方式",
    dataKey: "login_type",
    align: "center",
    width: 80,
    cellRenderer: (scope: any): any => {
      const { rowData } = scope;
      return <div>{LoginMethod[rowData.login_type]}</div>;
    },
  },
  {
    key: "deviceType",
    title: "设备名称",
    dataKey: "deviceType",
    align: "center",
    width: 150,
  },
  {
    key: "deviceOs",
    title: "系统",
    dataKey: "deviceOs",
    align: "center",
    width: 100,
  },
  {
    key: "ip_source",
    title: "登录地点",
    dataKey: "ip_source",
    align: "center",
    width: 200,
  },
  {
    key: "login_time",
    title: "最后登录时间",
    dataKey: "login_time",
    align: "center",
    width: 200,
  },
]);
const tableData = ref<any[]>([]);

const getHistory = async () => {
  loading.value = true;
  getUserLoginHistoryListApi({})
    .then((response) => {
      tableData.value = response.data.list || [];
    })
    .catch((e) => {})
    .finally(() => {
      loading.value = false;
    });
};
onMounted(async () => {
  await getHistory();
});
</script>

<style lang="scss" scoped></style>
