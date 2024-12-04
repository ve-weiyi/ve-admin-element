<template>
  <div ref="chartDom" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";
import {
  markRaw,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watchEffect,
} from "vue";
import chinaJson from "@/assets/china.json";

const chartDom = ref<HTMLElement>();
const myChart = ref<echarts.EChartsType>();

const props = defineProps({
  // options: {
  //   type: Object,
  //   default: {},
  //   required: true
  // },
  values: {
    type: Array as PropType<Array<{ name: string; value: number }>>,
    required: true,
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "80%",
  },
});

function newOptions() {
  const option: EChartsOption = {
    tooltip: {
      formatter: function (e) {
        const value = e.value ? e.value : 0;
        return e.seriesName + "<br />" + e.name + "：" + value;
      },
    },
    visualMap: {
      min: 0,
      max: 1000,
      right: 26,
      bottom: 40,
      showLabel: true,
      pieces: [
        {
          gt: 100,
          label: "100人以上",
          color: "#ED5351",
        },
        {
          gte: 51,
          lte: 100,
          label: "51-100人",
          color: "#59D9A5",
        },
        {
          gte: 21,
          lte: 50,
          label: "21-50人",
          color: "#F6C021",
        },
        {
          label: "1-20人",
          gt: 0,
          lte: 20,
          color: "#6DCAEC",
        },
      ],
      show: true,
    },
    geo: {
      map: "china",
      zoom: 1.2,
      layoutCenter: ["50%", "50%"],
      itemStyle: {
        // areaColor: "#0FB8F0",
        borderColor: "rgba(0, 0, 0, 0.2)",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "用户人数",
        type: "map",
        map: "china",
        roam: true,
        zoom: 1.2, // 控制地图的放大缩小
        geoIndex: 0,
        data: props.values,
        emphasis: {
          // 高亮状态下的多边形和标签样式
          // 控制地图滑过后的颜色
          label: {
            color: "red",
            fontSize: 10,
            show: true, // 省份名称
          },
          itemStyle: {
            areaColor: "#0FB8F0",
          },
        },
      },
    ],
  };

  return option;
}

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
    echarts.registerMap("china", chinaJson as any);
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
