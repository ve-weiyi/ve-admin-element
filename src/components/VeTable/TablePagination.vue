<template>
  <el-pagination
    class="pagination-container"
    :current-page="pageData.currentPage"
    :page-size="pageData.pageSize"
    :total="pageData.total"
    :background="background"
    :layout="layout"
    :page-sizes="pageSizes"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { PropType } from "vue";

const emit = defineEmits(["pagination"]);

const props = defineProps({
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 20, 50];
    },
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
  background: {
    type: Boolean,
    default: true,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
});

/** 表格分页参数 */
export interface Pagination {
  total?: number;
  currentPage?: number;
  pageSizes?: number[];
  pageSize?: number;
  layout?: string;
}

const pageData = defineModel({
  type: Object as PropType<Pagination>,
  default: {
    currentPage: 1,
    pageSize: 10,
    total: 10,
  },
  required: true,
});

function handleSizeChange(val: number) {
  console.log("handleSizeChange val", val);

  pageData.value = {
    currentPage: pageData.value.currentPage,
    pageSize: val,
    total: pageData.value.total,
  };
  emit("pagination", pageData.value);
  if (props.autoScroll) {
    scrollTo(0, 800);
  }
}

function handleCurrentChange(val: number) {
  console.log("handleCurrentChange val", val);
  pageData.value = {
    currentPage: val,
    pageSize: pageData.value.pageSize,
    total: pageData.value.total,
  };
  emit("pagination", pageData.value);
}
</script>

<style lang="scss" scoped>
.pagination-container {
  float: right;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}
</style>
