import { ref } from "vue";

export interface RecentMenuItem {
  path: string;
  title: string;
  icon?: string;
  visitedAt: number;
}

const STORAGE_KEY = "recent_menus";
const MAX_COUNT = 8;

const recentMenus = ref<RecentMenuItem[]>([]);

function loadFromStorage(): RecentMenuItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage(menus: RecentMenuItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
}

recentMenus.value = loadFromStorage();

export function useRecentMenus() {
  function clearRecentMenus() {
    recentMenus.value = [];
    localStorage.removeItem(STORAGE_KEY);
  }

  function formatVisitTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    if (diff < 60000) return "刚刚";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;

    const date = new Date(timestamp);
    return `${date.getMonth() + 1}-${date.getDate()}`;
  }

  return {
    recentMenus,
    clearRecentMenus,
    formatVisitTime,
  };
}

export function addRecentMenu(path: string, title: string, icon?: string) {
  if (!path || !title) return;

  const excludePaths = ["/dashboard", "/redirect", "/404", "/401", "/login", "/"];
  if (excludePaths.some((p) => path === p || path.startsWith(p + "/"))) return;

  const filtered = recentMenus.value.filter((item) => item.path !== path);

  const newItem: RecentMenuItem = {
    path,
    title,
    icon,
    visitedAt: Date.now(),
  };

  recentMenus.value = [newItem, ...filtered].slice(0, MAX_COUNT);
  saveToStorage(recentMenus.value);
}
