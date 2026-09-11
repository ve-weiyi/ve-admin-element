import { useDictStoreHook } from "@/stores/dict";
import { useSse } from "./useSse";
import { SseTopics } from "./sseTopics";

/** 字典变更消息体 */
export interface DictChangeMessage {
  /** 字典编码 */
  dictCode: string;
}

/** 字典变更回调函数类型 */
export type DictChangeCallback = (message: DictChangeMessage) => void;

let globalInstance: ReturnType<typeof createDictSyncComposable> | null = null;

function createDictSyncComposable() {
  const dictStore = useDictStoreHook();
  const sse = useSse();

  const callbacks: DictChangeCallback[] = [];
  let unsubscribe: (() => void) | null = null;

  /** 处理字典变更消息：清除指定字典缓存，并通知所有已注册回调 */
  const handleDictChange = (data: DictChangeMessage) => {
    const { dictCode } = data;
    if (!dictCode) {
      console.warn("[DictSync] 收到无效的字典变更消息：缺少 dictCode");
      return;
    }

    dictStore.removeDictItem(dictCode);
    callbacks.forEach((cb) => {
      try {
        cb(data);
      } catch (err) {
        console.error("[DictSync] 回调执行失败:", err);
      }
    });
  };

  /** 订阅 SSE 字典变更事件 */
  const initialize = () => {
    unsubscribe = sse.on(SseTopics.DICT, handleDictChange);
  };

  /** 取消 SSE 订阅并清空所有回调 */
  const cleanup = () => {
    unsubscribe?.();
    unsubscribe = null;
    callbacks.length = 0;
  };

  /** 注册字典变更回调，返回取消注册函数 */
  const onDictChange = (cb: DictChangeCallback) => {
    callbacks.push(cb);
    return () => {
      const idx = callbacks.indexOf(cb);
      if (idx !== -1) callbacks.splice(idx, 1);
    };
  };

  return {
    isConnected: sse.isConnected,
    connectionState: sse.connectionState,
    initialize,
    cleanup,
    onDictChange,
  };
}

/**
 * 字典同步组合式函数（单例模式）
 *
 * 监听 SSE 字典变更事件，收到变更时自动清除对应字典缓存，
 * 并通知所有已注册的回调函数。
 *
 * @returns 字典同步实例，包含连接状态、初始化、清理和回调注册方法
 */
export function useDictSync() {
  if (!globalInstance) {
    globalInstance = createDictSyncComposable();
  }
  return globalInstance;
}
