/**
 * 通知中心逻辑
 */
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { NoticePageVo, NoticeDetailVo, NoticePageQuery } from "@/types/api";
import NoticeAPI from "@/api/system/notice";
import router from "@/router";

const PAGE_SIZE = 5;

export function useNotice() {
  // 状态
  const list = ref<NoticePageVo[]>([]);
  const detail = ref<NoticeDetailVo | null>(null);
  const dialogVisible = ref(false);

  // ============================================
  // 数据获取
  // ============================================

  async function fetchList(params?: Partial<NoticePageQuery>) {
    const query: NoticePageQuery = {
      pageNum: 1,
      pageSize: PAGE_SIZE,
      isRead: 0,
      ...params,
    } as NoticePageQuery;
    const page = await NoticeAPI.getMyNoticePage(query);
    list.value = page.data || [];
  }

  async function read(id: string) {
    detail.value = await NoticeAPI.getDetail(id);
    dialogVisible.value = true;

    // 从列表中移除已读项
    const idx = list.value.findIndex((item: NoticePageVo) => item.id === id);
    if (idx >= 0) list.value.splice(idx, 1);
  }

  async function readAll() {
    await NoticeAPI.readAll();
    list.value = [];
  }

  function goMore() {
    router.push({ name: "MyNotice" });
  }

  // ============================================
  // 生命周期
  // ============================================

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
