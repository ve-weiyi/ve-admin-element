import type { IContentConfig } from "@/components/CURD/types";

interface ButtonInfo {
  name: string;
  text: string;
  perm: string;
  type: "toolbar" | "operat";
  configPath: string;
  vuePath: string;
}

/**
 * 从配置文件收集按钮权限
 */
export function collectButtonsFromConfigs() {
  const modules = import.meta.glob("/src/views/admin/**/config/content.ts", { eager: true });
  const result: Record<string, ButtonInfo[]> = {};

  for (const [path, module] of Object.entries(modules)) {
    const config = (module as any).default as IContentConfig;
    if (!config.permPrefix) continue;

    const vuePath = findVueFile(path);
    const buttons: ButtonInfo[] = [];

    // 收集 toolbar 按钮
    if (config.toolbar) {
      config.toolbar.forEach((item) => {
        const name = typeof item === "string" ? item : item.name;
        const text = typeof item === "string" ? item : item.text || item.name;
        if (name) {
          buttons.push({
            perm: `${config.permPrefix}:${name}`,
            name,
            text,
            type: "toolbar",
            configPath: path,
            vuePath,
          });
        }
      });
    }

    // 收集 operat 按钮
    const operatCol = config.cols.find((col) => col.templet === "tool");
    if (operatCol?.operat) {
      operatCol.operat.forEach((item) => {
        const name = typeof item === "string" ? item : item.name;
        const text = typeof item === "string" ? item : item.text || item.name;
        if (name) {
          buttons.push({
            perm: `${config.permPrefix}:${name}`,
            name,
            text,
            type: "operat",
            configPath: path,
            vuePath,
          });
        }
      });
    }

    if (buttons.length > 0) {
      result[vuePath] = buttons;
    }
  }

  console.log("收集到的按钮:", result);
  return result;
}

function findVueFile(configPath: string): string {
  const vueModules = import.meta.glob("/src/views/admin/**/*.vue", { eager: true });
  const dirPath = configPath.replace(/\/config\/content\.ts$/, "");

  for (const vuePath of Object.keys(vueModules)) {
    if (vuePath.startsWith(dirPath) && !vuePath.includes("/config/")) {
      // 使用与parseComponentPath相同的规则
      const match = vuePath.match(/[/@]?(src\/views\/[^'"]+\.vue)/);
      return match ? match[1] : "unknown";
    }
  }

  return "unknown";
}
