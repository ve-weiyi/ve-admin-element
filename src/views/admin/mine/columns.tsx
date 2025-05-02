import type { Column } from "element-plus";
import { UserLoginHistory, UserThirdPartyInfo } from "@/api/types.ts";
import { formatDateTime } from "@/utils/date.ts";
import { VNode } from "vue";

export const loginHistoryColumns = ref<Column<UserLoginHistory>[]>([
  {
    key: "login_type",
    dataKey: "login_type",
    title: "登录方式",
    align: "center",
    width: 80,
  },
  {
    key: "os",
    dataKey: "os",
    title: "操作系统",
    align: "center",
    width: 100,
  },
  {
    key: "browser",
    dataKey: "browser",
    title: "浏览器",
    align: "center",
    width: 100,
  },
  {
    key: "ip_address",
    dataKey: "ip_address",
    title: "登录IP",
    align: "center",
    width: 120,
  },
  {
    key: "ip_source",
    dataKey: "ip_source",
    title: "登录地点",
    align: "center",
    width: 120,
  },
  {
    key: "login_at",
    dataKey: "login_at",
    title: "登录时间",
    align: "center",
    width: 160,
    cellRenderer: (row): VNode => {
      return h("span", formatDateTime(row.rowData.login_at));
    },
  },
  {
    key: "logout_at",
    dataKey: "logout_at",
    title: "登出时间",
    align: "center",
    width: 160,
    cellRenderer: (row): VNode => {
      return h("span", formatDateTime(row.rowData.logout_at));
    },
  },
]);
