import { store } from "@/stores";
import { localDicts, type DictItem, type DictType } from "@/config/dict";
import { STORAGE_KEYS } from "@/constants";

export interface DictItemOption {
  value: string;
  label: string;
  tagType?: string;
}

export const useDictStore = defineStore("dict", () => {
  // 字典数据缓存（持久化到 localStorage，支持运行时修改）
  const dictCache = useStorage<Record<string, DictItemOption[]>>(STORAGE_KEYS.DICT_CACHE, {});

  // 字典类型元数据缓存
  const dictMetaCache = useStorage<Record<string, DictType>>(`${STORAGE_KEYS.DICT_CACHE}_meta`, {});

  // 是否已初始化
  let initialized = false;

  /** 从本地配置文件初始化字典缓存 */
  const initFromLocal = () => {
    if (initialized) return;
    initialized = true;

    for (const dict of localDicts) {
      const items: DictItemOption[] = dict.items
        .filter((item) => item.status !== 0)
        .map((item) => ({
          value: item.value,
          label: item.label,
          tagType: item.tagType || undefined,
        }));
      dictCache.value[dict.code] = items;
      dictMetaCache.value[dict.code] = { ...dict };
    }
  };

  /** 获取所有字典类型（供管理页面使用） */
  const getDictTypes = (): DictType[] => {
    initFromLocal();
    return Object.values(dictMetaCache.value);
  };

  /** 获取单个字典类型 */
  const getDictType = (code: string): DictType | undefined => {
    initFromLocal();
    return dictMetaCache.value[code];
  };

  /** 获取字典项列表 */
  const getDictItems = (dictCode: string): DictItemOption[] => {
    initFromLocal();
    return dictCache.value[dictCode] || [];
  };

  /** 加载字典数据（兼容旧接口，从本地读取） */
  const loadDictItems = async (dictCode: string) => {
    initFromLocal();
  };

  /** 添加字典类型 */
  const addDictType = (dict: DictType) => {
    initFromLocal();
    const id = dict.id || Date.now().toString();
    const code = dict.code;
    dictMetaCache.value[code] = { ...dict, id };
    dictCache.value[code] = dict.items
      .filter((item) => item.status !== 0)
      .map((item) => ({
        value: item.value,
        label: item.label,
        tagType: item.tagType || undefined,
      }));
  };

  /** 更新字典类型 */
  const updateDictType = (code: string, dict: Partial<DictType>) => {
    if (dictMetaCache.value[code]) {
      Object.assign(dictMetaCache.value[code], dict);
      if (dict.items) {
        dictCache.value[code] = dict.items
          .filter((item) => item.status !== 0)
          .map((item) => ({
            value: item.value,
            label: item.label,
            tagType: item.tagType || undefined,
          }));
      }
    }
  };

  /** 删除字典类型 */
  const removeDictType = (code: string) => {
    delete dictMetaCache.value[code];
    delete dictCache.value[code];
  };

  /** 添加字典项 */
  const addDictItem = (dictCode: string, item: DictItem) => {
    const dict = dictMetaCache.value[dictCode];
    if (!dict) return;
    if (!dict.items) dict.items = [];
    const newItem = { ...item, id: item.id || Date.now().toString() };
    dict.items.push(newItem);
    if (item.status !== 0) {
      dictCache.value[dictCode] = [
        ...(dictCache.value[dictCode] || []),
        { value: item.value, label: item.label, tagType: item.tagType || undefined },
      ];
    }
  };

  /** 更新字典项 */
  const updateDictItem = (dictCode: string, itemId: string, updates: Partial<DictItem>) => {
    const dict = dictMetaCache.value[dictCode];
    if (!dict?.items) return;
    const idx = dict.items.findIndex((i) => i.id === itemId);
    if (idx === -1) return;
    Object.assign(dict.items[idx], updates);
    // 重建缓存
    dictCache.value[dictCode] = dict.items
      .filter((i) => i.status !== 0)
      .map((i) => ({
        value: i.value,
        label: i.label,
        tagType: i.tagType || undefined,
      }));
  };

  /** 删除字典项 */
  const removeDictItem = (dictCode: string, itemId: string) => {
    const dict = dictMetaCache.value[dictCode];
    if (!dict?.items) return;
    dict.items = dict.items.filter((i) => i.id !== itemId);
    dictCache.value[dictCode] = dict.items
      .filter((i) => i.status !== 0)
      .map((i) => ({
        value: i.value,
        label: i.label,
        tagType: i.tagType || undefined,
      }));
  };

  /** 清空字典缓存 */
  const clearDictCache = () => {
    dictCache.value = {};
    dictMetaCache.value = {};
    initialized = false;
  };

  return {
    loadDictItems,
    getDictItems,
    getDictTypes,
    getDictType,
    addDictType,
    updateDictType,
    removeDictType,
    addDictItem,
    updateDictItem,
    removeDictItem,
    clearDictCache,
  };
});

export function useDictStoreHook() {
  return useDictStore(store);
}
