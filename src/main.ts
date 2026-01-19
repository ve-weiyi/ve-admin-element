/**
 * 应用启动入口
 *
 * @description
 * Vue3 应用初始化，包括样式、插件、配置的加载
 */

import { createApp } from "vue";
import App from "./App.vue";

// ===== 样式导入 =====
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "@/styles/table.scss";
import "uno.css";
import "animate.css";

// ===== 核心配置 =====
import { setupDirective } from "@/directives";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";

// ===== 全局组件 =====
import * as ElementPlusIcons from "@element-plus/icons-vue";

// ===== 第三方插件 =====
import { InstallCodeMirror } from "codemirror-editor-vue3";

// ===== 路由守卫 =====
import { setupPermissionGuard } from "@/permission";

// 创建 Vue 应用实例
const app = createApp(App);

// 1️⃣ 核心配置
setupDirective(app);
setupRouter(app);
setupStore(app);

// 2️⃣ 全局组件（Element Plus 图标）
Object.entries(ElementPlusIcons).forEach(([name, comp]) => app.component(name, comp));

// 3️⃣ 第三方插件
app.use(InstallCodeMirror);

// 4️⃣ 路由守卫
setupPermissionGuard();

// 6️⃣ 挂载应用
app.mount("#app");
