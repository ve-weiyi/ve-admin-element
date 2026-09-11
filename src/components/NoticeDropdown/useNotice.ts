import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { ElMessage } from "element-plus";
import router from "@/router";
import { NotifyRecordAPI } from "@/api";
import type { NotifyRecordVO } from "@/api/types";
import { useUserStore } from "@/stores/user";
import { useNotificationStore } from "@/stores/notification";

const PAGE_SIZE = 5;

export function useNotice() {
  const list = ref<NotifyRecordVO[]>([]);
  const detail = ref<NotifyRecordVO | null>(null);
  const dialogVisible = ref(false);
  const notificationStore = useNotificationStore();
  const { unreadTotal } = storeToRefs(notificationStore);

  function getUserId(): string {
    return useUserStore().userInfo.user_id;
  }

  function fetchList() {
    const userId = getUserId();
    if (!userId) return;

    NotifyRecordAPI.queryUserInboxRecordList({
      page: 1,
      page_size: PAGE_SIZE,
      user_id: userId,
    }).then((res) => {
      list.value = (res.data.list || []) as NotifyRecordVO[];
      notificationStore.unreadTotal = res.data.unread_total || 0;
    });
  }

  function read(id?: number) {
    if (id == null) {
      return;
    }
    const found = list.value.find((item) => item.id === id);
    if (found) {
      detail.value = found;
      dialogVisible.value = true;
      if (found.status === "unread" && found.id != null) {
        found.status = "read";
        notificationStore.markAsRead(found.id);
      }
    }
  }

  function goMore() {
    router.push({ name: "MyNotice" });
  }

  function readAll() {
    const userId = getUserId();
    if (!userId) return;
    notificationStore.markAllAsRead(userId).then(() => {
      ElMessage.success("已全部标记为已读");
      fetchList();
    });
  }

  onMounted(() => {
    fetchList();
  });

  return {
    list,
    unreadTotal,
    detail,
    dialogVisible,
    read,
    readAll,
    goMore,
  };
}
