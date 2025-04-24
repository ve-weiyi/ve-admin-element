<template>
  <div class="dashboard-container">
    <github-corner class="github-corner" />

    <el-card shadow="never">
      <el-row justify="space-between">
        <el-col :span="18" :xs="24">
          <div class="flex h-full items-center">
            <img
              class="w-20 h-20 mr-5 rounded-full"
              :src="userStore.userInfo.avatar + '?imageView2/1/w/80/h/80'"
            />
            <div>
              <p>{{ greetings }}</p>
              <p class="text-sm text-gray">今日天气晴朗，气温在15℃至25℃之间，东南风。</p>
            </div>
          </div>
        </el-col>

        <el-col :span="6" :xs="24">
          <div class="flex h-full items-center justify-around">
            <el-statistic v-for="item in statisticData" :key="item.key" :value="item.value">
              <template #title>
                <div class="flex items-center">
                  <svg-icon :icon-class="item.iconClass" size="20px" />
                  <span class="text-[16px] ml-1">{{ item.title }}</span>
                </div>
              </template>
              <template v-if="item.suffix" #suffix>/100</template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-view">
            <svg-icon icon-class="uv" size="4em" class-tagName="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">访问量</div>
            <span class="card-panel-num">{{ viewCount }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="document" size="3rem" class-tagName="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">文章量</div>
            <span class="card-panel-num">{{ articleCount }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="user" size="4em" lass-tagName="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">用户量</div>
            <span class="card-panel-num">{{ userCount }}</span>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" size="4em" class-tagName="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">留言量</div>
            <span class="card-panel-num">{{ remarkCount }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="data-card">
      <div class="title">一周访问量✨</div>
      <Echarts :options="userViewOptions" height="350px" />
    </el-row>

    <el-row :gutter="32" style="margin-top: 32px">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div class="title">文章浏览量排行🚀</div>
          <Echarts :options="articleRankOptions" height="350px" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div class="title">文章分类统计🍉</div>
          <Echarts :options="categoryOptions" height="350px" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div class="title">文章标签统计🌈</div>
          <TagCloud v-if="tagLoad" :tag-list="tagList" />
        </div>
      </el-col>
    </el-row>

    <el-row class="data-card" style="margin-top: 32px">
      <div class="title">文章贡献统计🎉</div>
      <Calender style="width: 100%" :values="articleStatisticsList" />
    </el-row>

    <!-- 用户地域分布 -->
    <el-card style="margin-top: 32px">
      <div class="title">用户地域分布</div>
      <div v-loading="loading" style="height: 450px">
        <div class="chart-wrapper">
          <el-radio-group v-model="type">
            <el-radio :value="1">用户</el-radio>
            <el-radio :value="2">游客</el-radio>
          </el-radio-group>
        </div>
        <ChinaMap v-loading="loading" :values="areaData" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import GithubCorner from "@/components/GithubCorner/index.vue";
import TagCloud from "@/components/TagCloud/index.vue";
import Echarts from "@/components/Echarts/index.vue";
import Calender from "./components/Calender.vue";
import ChinaMap from "./components/ChinaMap.vue";

import { onMounted, reactive, ref } from "vue";
import { WebsiteAPI } from "@/api/website";
import { AccountAPI } from "@/api/account";
import type { AccountArea, ArticleStatisticsDTO } from "@/api/types";
import { useUserStore } from "@/store";

const loading = ref(true);

const viewCount = ref(0);
const remarkCount = ref(0);
const userCount = ref(0);
const articleCount = ref(0);

const articleStatisticsList = ref<ArticleStatisticsDTO[]>([]);
const areaData = ref<AccountArea[]>([]);

let userViewOptions = reactive({
  xAxis: {
    data: [] as string[],
    boundaryGap: false,
    axisTick: {
      show: false,
    },
  },
  grid: {
    left: 8,
    right: 35,
    bottom: 0,
    top: 30,
    containLabel: true,
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
    padding: [5, 10],
  },
  yAxis: {
    axisTick: {
      show: false,
    },
  },
  legend: {
    data: ["访问量(PV)", "独立访客(UV)"],
  },
  series: [
    {
      name: "访问量(PV)",
      itemStyle: {
        color: "#FF005A",
      },
      lineStyle: {
        color: "#FF005A",
        width: 2,
      },
      smooth: true,
      type: "line",
      data: [] as number[],
      animationDuration: 2800,
      animationEasing: "cubicInOut",
    },
    {
      name: "独立访客(UV)",
      smooth: true,
      type: "line",
      itemStyle: {
        color: "#3888fa",
      },
      lineStyle: {
        color: "#3888fa",
        width: 2,
      },
      areaStyle: {
        color: "#f3f8ff",
      },
      data: [] as number[],
      animationDuration: 2800,
      animationEasing: "quadraticOut",
    },
  ],
});
let categoryOptions = reactive({
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    top: "bottom",
  },
  series: [
    {
      name: "分类统计",
      type: "pie",
      radius: [15, 95],
      center: ["50%", "38%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 6,
      },
      data: [] as {
        value: number;
        name: string;
      }[],
    },
  ],
});
let articleRankOptions = reactive({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  color: ["#58AFFF"],
  grid: {
    left: "0%",
    right: "0%",
    bottom: "0%",
    top: "10%",
    containLabel: true,
  },
  xAxis: {
    data: [] as string[],
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    type: "value",
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      name: "浏览量",
      type: "bar",
      data: [] as number[],
    },
  ],
});
const tagList = ref<any[]>([]);
const tagLoad = ref(false);

const getList = () => {
  loading.value = true;
  WebsiteAPI.getAdminHomeInfoApi()
    .then((res) => {
      viewCount.value = res.data.view_count;
      remarkCount.value = res.data.remark_count;
      userCount.value = res.data.user_count;
      articleCount.value = res.data.article_count;

      if (res.data.category_list != null) {
        res.data.category_list.forEach((item) => {
          categoryOptions.series[0].data.push({
            value: item.article_count,
            name: item.category_name,
          });
        });
      }
      if (res.data.tag_list != null) {
        res.data.tag_list.forEach((item) => {
          tagList.value.push({
            tag_name: item.tag_name,
          });
        });
        tagLoad.value = true;
      }
      if (res.data.article_view_ranks != null) {
        res.data.article_view_ranks.forEach((item) => {
          articleRankOptions.series[0].data.push(item.view_count);
          articleRankOptions.xAxis.data.push(item.article_title);
        });
      }
      if (res.data.article_statistics != null) {
        articleStatisticsList.value = res.data.article_statistics;
      }

      if (res.data.user_visit_daliy != null) {
        const x = [];
        const y = [];
        res.data.user_visit_daliy.reverse().forEach((item) => {
          x.push(item.date);
          y.push(item.count);
        });

        userViewOptions.xAxis.data.push(...x);
        userViewOptions.series[0].data.push(...y);
      }
      // if (res.data.userViewVOList != null) {
      //   res.data.userViewVOList.forEach((item) => {
      //     userView.xAxis.data.push(item.date);
      //     userView.series[0].data.push(item.pv);
      //     userView.series[1].data.push(item.uv);
      //   });
      // }
    })
    .catch((e) => {
      console.log("获取数据失败", e);
    })
    .finally(() => {
      loading.value = false;
    });
};

// 切换用户/游客类型
const type = ref(1);
const listUserArea = () => {
  // 发送请求获取用户地域分布数据
  AccountAPI.findAccountAreaAnalysisApi().then((res) => {
    // userAreaMap.series[0].data = res.data
    res.data.list.forEach((item: AccountArea) => {
      areaData.value.push({
        name: item.name,
        value: item.value,
      });
    });
  });
};

onMounted(() => {
  getList();
  listUserArea();
});

const userStore = useUserStore();
const date: Date = new Date();
const greetings = computed(() => {
  const hours = date.getHours();
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (hours >= 8 && hours < 12) {
    return "上午好，" + userStore.userInfo.nickname + "！";
  } else if (hours >= 12 && hours < 18) {
    return "下午好，" + userStore.userInfo.nickname + "！";
  } else if (hours >= 18 && hours < 24) {
    return "晚上好，" + userStore.userInfo.nickname + "！";
  } else {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});
// 右上角数量
const statisticData = ref([
  {
    value: 99,
    iconClass: "message",
    title: "消息",
    key: "message",
  },
  {
    value: 50,
    iconClass: "todo",
    title: "待办",
    suffix: "/100",
    key: "upcoming",
  },
  {
    value: 10,
    iconClass: "project",
    title: "项目",
    key: "project",
  },
]);
</script>
<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 700;
  color: var(--el-text-color-secondary);
}

.data-card {
  padding: 1rem;
  background: var(--el-bg-color-overlay);
}

.dashboard-container {
  position: relative;
  padding: 32px;
  background: var(--el-bg-color-page);

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
  }

  .chart-wrapper {
    padding: 1rem;
    background: var(--el-bg-color-overlay);
    //margin-bottom: 2rem;
  }
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    position: relative;
    height: 108px;
    overflow: hidden;
    font-size: 12px;
    color: #666;
    cursor: pointer;
    background: var(--el-bg-color-overlay);
    border-color: rgb(0 0 0 / 5%);
    box-shadow: 4px 4px 40px rgb(0 0 0 / 5%);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-view {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-view {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      padding: 16px;
      margin: 14px 0 0 14px;
      border-radius: 6px;
      transition: all 0.38s ease-out;
    }

    .card-panel-description {
      float: right;
      margin: 26px;
      margin-left: 0;
      font-weight: bold;

      .card-panel-text {
        margin-bottom: 12px;
        font-size: 16px;
        line-height: 18px;
        color: var(--el-text-color-secondary);
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (width <= 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

@media (width <= 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      float: none !important;
      margin: 14px auto !important;
    }
  }
}
</style>
