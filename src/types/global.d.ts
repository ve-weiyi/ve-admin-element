/**
 * 全局类型声明
 */
declare global {
  type ApiResponse<T = any> = import("@/api/common").ApiResponse<T>;
  type BaseQueryParams = import("@/api/common").BaseQueryParams;
  type PageMeta = import("@/api/common").PageMeta;
  type PageResult<T> = import("@/api/common").PageResult<T>;
  type OptionItem = import("@/api/common").OptionItem;
  type ExcelResult = import("@/api/common").ExcelResult;
  type TagView = import("@/types/ui").TagView;
  type AppSettings = import("@/types/ui").AppSettings;

  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
    };
  };
}

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    icon?: string;
    hidden?: boolean;
    alwaysShow?: boolean;
    keepAlive?: boolean;
    affix?: boolean;
    breadcrumb?: boolean;
    activeMenu?: string;
    params?: Record<string, any>;
    roles?: string[];
  }
}

export {};
