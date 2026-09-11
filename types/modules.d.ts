/**
 * 第三方模块类型声明
 */

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "sockjs-client/dist/sockjs.min.js" {
  import Client from "sockjs-client";
  export default Client;
}

declare module "vue-cropper" {
  import type { DefineComponent } from "vue";
  export const VueCropper: DefineComponent<any, any, any>;
}
