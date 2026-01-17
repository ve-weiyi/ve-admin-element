/**
 * 通知中心逻辑
 */
import { ref, onMounted, onBeforeUnmount } from "vue";
import router from "@/router";

const PAGE_SIZE = 5;

export function useNotice() {
  // 状态
  const list = ref<any[]>([]);
  const detail = ref<any | null>(null);
  const dialogVisible = ref(false);

  async function fetchList(params?: Partial<any>) {
    list.value = [];
  }

  async function read(id: string) {
    dialogVisible.value = true;
    const idx = list.value.findIndex((item: any) => item.id === id);
    if (idx >= 0) list.value.splice(idx, 1);
  }

  async function readAll() {
    list.value = [];
  }

  function goMore() {
    router.push({ name: "MyNotice" });
  }

  onMounted(() => {
    fetchList();
  });

  onBeforeUnmount(() => {
    return;
  });

  return {
    list,
    detail,
    dialogVisible,
    fetchList,
    read,
    readAll,
    goMore,
  };
}
