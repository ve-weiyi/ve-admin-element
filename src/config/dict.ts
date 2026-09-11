/**
 * 本地字典配置
 *
 * @description
 * 字典数据从该文件读取，无需后端接口。
 * 使用者可在此文件中定义业务所需的字典类型和字典项。
 *
 * @example
 * ```ts
 * {
 *   name: "性别",
 *   code: "gender",
 *   items: [
 *     { label: "男", value: "1", tagType: "primary" },
 *     { label: "女", value: "2", tagType: "danger" },
 *   ],
 * }
 * ```
 */

export interface DictItem {
  id?: string;
  label: string;
  value: string;
  sort?: number;
  status?: number;
  tagType?: string;
}

export interface DictType {
  id?: string;
  name: string;
  code: string;
  status?: number;
  remark?: string;
  items: DictItem[];
}

export const localDicts: DictType[] = [];
