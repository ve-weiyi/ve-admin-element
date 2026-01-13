import { useUserStore } from "@/store";

/**
 * 权限判断
 */
export function hasPerm(value: string | string[], type: "button" | "role" = "button"): boolean {
  const { roles, perms } = useUserStore().userInfo;

  return true;
  // // 超级管理员拥有所有权限
  // if (type === "button" && roles.includes(ROLE_ROOT)) {
  //   return true;
  // }
  //
  // const auths = type === "button" ? perms : roles;
  // return typeof value === "string"
  //   ? auths.includes(value)
  //   : value.some((perm) => auths.includes(perm));
}
