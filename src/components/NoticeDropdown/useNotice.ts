/**
 * 通知中心逻辑
 */
import { ref, onMounted, onBeforeUnmount } from "vue";
import router from "@/router";
import { NoticeAPI } from "@/api/notice";
import type { NoticeBackVO } from "@/api/types";

const PAGE_SIZE = 5;

export function useNotice() {
  // 状态
  const list = ref<NoticeBackVO[]>([]);
  const detail = ref<NoticeBackVO | null>(null);
  const dialogVisible = ref(false);

  async function fetchList() {
    try {
      const res = await NoticeAPI.findUserNoticeListApi({
        page: 1,
        page_size: PAGE_SIZE,
      });
      list.value = (res.data?.list as NoticeBackVO[]) || [];
    } catch (error) {
      console.error("获取通知列表失败:", error);
      list.value = [];
    }
  }

  async function read(id: string) {
    try {
      const res = await NoticeAPI.getNoticeApi({ id: Number(id) });
      detail.value = res.data || null;
      dialogVisible.value = true;

      const idx = list.value.findIndex((item) => item.id === Number(id));
      if (idx >= 0) {
        list.value.splice(idx, 1);
      }
    } catch (error) {
      console.error("获取通知详情失败:", error);
      ElMessage.error("获取通知详情失败");
    }
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
