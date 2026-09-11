import type { Column } from "element-plus";
import type { LoginLogVO } from "@/api/types";
import { useDateFormat } from "@vueuse/core";
import { h, type VNode } from "vue";

export const loginHistoryColumns: Column<LoginLogVO>[] = [
  {
    key: "terminal_id",
    dataKey: "terminal_id",
    title: "设备ID",
    align: "center",
    width: 140,
  },
  {
    key: "login_type",
    dataKey: "login_type",
    title: "登录方式",
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
      return h("span", useDateFormat(row.rowData.login_at, "YYYY-MM-DD HH:mm:ss").value);
    },
  },
  {
    key: "logout_at",
    dataKey: "logout_at",
    title: "登出时间",
    align: "center",
    width: 160,
    cellRenderer: (row): VNode => {
      return h(
        "span",
        row.rowData.logout_at
          ? useDateFormat(row.rowData.logout_at, "YYYY-MM-DD HH:mm:ss").value
          : "-"
      );
    },
  },
];
