import { store } from "@/stores";
import { NotifyRecordAPI } from "@/api";

export const useNotificationStore = defineStore("notification", () => {
  const unreadTotal = ref(0);

  function markAsRead(id: number) {
    const prev = unreadTotal.value;
    unreadTotal.value = Math.max(0, unreadTotal.value - 1);
    NotifyRecordAPI.markRecordRead({ id }).catch(() => {
      unreadTotal.value = prev;
    });
  }

  function markAllAsRead(userId: string) {
    return NotifyRecordAPI.markAllRecordsRead({ user_id: userId }).then(() => {
      unreadTotal.value = 0;
    });
  }

  return {
    unreadTotal,
    markAsRead,
    markAllAsRead,
  };
});
