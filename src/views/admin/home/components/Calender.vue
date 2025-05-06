<template>
  <div ref="chartDom" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";
import * as echarts from "echarts";
import { markRaw, nextTick, onBeforeUnmount, onMounted, ref, watchEffect } from "vue";
import type { PropType } from "vue";

const chartDom = ref<HTMLElement>();
const myChart = ref<echarts.EChartsType>();

const props = defineProps({
  // options: {
  //   type: Object,
  //   default: {},
  //   required: true
  // },
  values: {
    type: Array as () => { date?: string; count?: number }[],
    default: () => [
      { date: "2024-01-18", count: 100 },
      { date: "2024-01-19", count: 100 },
    ],
  },
  rangeColor: {
    type: Array as PropType<string[]>,
  },
  endDate: {
    type: Date,
    default: new Date(),
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "250px",
  },
});

function newOptions() {
  const colorRange = ["#ebedf0", "#40c463", "#0be148", "#30a14e", "#216e39"];
  const rangeMin = 0;
  let rangeMax = 5;

  // const date = new Date(); // 获取当前日期时间

  const year = props.endDate.getFullYear(); // 获取年份
  const month = props.endDate.getMonth() + 1; // 获取月份（从0开始，所以需要+1）
  const day = props.endDate.getDate(); // 获取日期

  const startDate = `${year - 1}-${month}-${day}`;
  const endDate = `${year}-${month}-${day}`;

  const data: [string, number][] = [];
  const start = +echarts.time.parse(startDate);
  const end = +echarts.time.parse(endDate);
  const dayTime = 3600 * 24 * 1000;
  for (let time = start; time <= end; time += dayTime) {
    const key = echarts.time.format(time, "{yyyy}-{MM}-{dd}", false);
    const count = props.values.find((item) => item.date === key)?.count || 0;
    // Math.floor(Math.random() * rangeMax)]
    if (count > rangeMax) {
      rangeMax = count;
    }
    data.push([key, count]);
  }

  const option = {
    title: {
      top: 30,
      left: "center",
      text: `${year - 1}-${year}年每日文章提交次数`,
    },
    tooltip: {
      trigger: "item", // 设置触发方式为项触发
      formatter: function (data: any) {
        // 定义提示框的内容
        return `${data.value[0]},${data.value[1]}次提交`;
      },
    },
    visualMap: {
      min: rangeMin,
      max: rangeMax,
      splitNumber: 5,
      pieces: [
        { gte: 0, lt: 1 },
        { gte: 1, lt: 2 },
        { gte: 2, lt: 3 },
        { gte: 3, lt: 4 },
        { gte: 4, lt: 5 },
      ],
      calculable: true, // 开启值域漫游，根据数据动态调整间隔
      type: "piecewise",
      orient: "horizontal",
      left: "center",
      top: 65,
      // 颜色范围
      inRange: {
        color: colorRange,
      },
      formatter: function (value, value2) {
        // 自定义单位显示
        return `${value} 次/日`;
      },
    },
    calendar: {
      top: 100,
      left: 30,
      right: 30,
      cellSize: ["auto", 13],
      range: [startDate, endDate],
      // 月份样式
      splitLine: {
        show: false,
      },
      itemStyle: {
        // 设置热力图边框样式
        borderColor: "#fff", // 边框颜色
        borderWidth: 3, // 边框宽度
        borderType: "solid", // 边框线型
      },
      // 月份边框
      yearLabel: {
        show: true,
      },
      monthLabel: {
        show: true,
        position: "end",
        nameMap: "ZH",
      },
      dayLabel: {
        show: true,
        nameMap: "ZH",
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: data,
    },
  };

  return option;
}

// watch(
//   () => props.values,
//   newValues => {
//     console.log("newValues", newValues);
//     myChart.value?.setOption(newOptions());
//   },
//   {
//     deep: true
//   }
// );

// watchEffect 会自动追踪依赖并在其变化时执行回调函数。
watchEffect(() => {
  if (!myChart.value) {
    return;
  }
  console.log("option.value", newOptions());
  myChart.value?.setOption(newOptions());
});

onMounted(() => {
  nextTick(() => {
    myChart.value = markRaw(echarts.init(chartDom.value!));
    myChart.value.setOption(newOptions(), true);
    useResizeObserver(chartDom.value, () => {
      myChart.value?.resize();
    });
  });
});
onBeforeUnmount(() => {
  if (!myChart.value) {
    return;
  }
  myChart.value.dispose();
  myChart.value = null;
});
</script>

<style scoped></style>
