/**
 * 全局类型声明
 *
 * @deprecated 请使用 @/types 下的具名导出
 */
declare global {
  type ApiResponse<T = any> = import("@/types/api").ApiResponse<T>;
  type BaseQueryParams = import("@/types/api").BaseQueryParams;
  type PageMeta = import("@/types/api").PageMeta;
  type PageResult<T> = import("@/types/api").PageResult<T>;
  type OptionItem = import("@/types/api").OptionItem;
  type ExcelResult = import("@/types/api").ExcelResult;
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
