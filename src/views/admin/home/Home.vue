<template>
  <div class="dashboard-container">
    <!-- github 角标 -->
    <github-corner class="github-corner" />

    <el-card shadow="never" class="mt-2">
      <el-row class="h-80px">
        <el-col :span="18" :xs="24">
          <div class="flex-x-start">
            <img
              class="w80px h80px rounded-full"
              :src="userStore.userInfo.avatar + '?imageView2/1/w/80/h/80'"
            />
            <div class="ml-5">
              <p>{{ greetings }}</p>
              <p class="text-sm text-gray">今日天气晴朗，气温在15℃至25℃之间，东南风。</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 数据统计 -->
    <el-row :gutter="10" class="mt-5">
      <!-- 在线用户数量 -->
      <el-col :xs="8" :sm="8" :md="4">
        <el-card shadow="never">
          <template #header>
            <div class="flex-x-between">
              <span class="text-gray">在线用户</span>
              <el-tag type="danger" size="small">实时</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <div class="flex-y-center">
              <span class="text-lg transition-all duration-300 hover:scale-110">
                {{ onlineUserCount }}
              </span>
              <span v-if="isConnected" class="ml-2 text-xs text-[#67c23a]">
                <el-icon><Connection /></el-icon>
                已连接
              </span>
              <span v-else class="ml-2 text-xs text-[#f56c6c]">
                <el-icon><Failed /></el-icon>
                未连接
              </span>
            </div>
            <div class="i-svg:people w-8 h-8 animate-[pulse_2s_infinite]" />
          </div>

          <div class="flex-x-between mt-2 text-sm text-gray">
            <span>更新时间</span>
            <span>{{ formattedTime }}</span>
          </div>
        </el-card>
      </el-col>

      <!-- 访客数(UV) -->
      <el-col :xs="8" :sm="8" :md="4">
        <el-skeleton :loading="visitStatsLoading" :rows="5" animated>
          <template #template>
            <el-card>
              <template #header>
                <div>
                  <el-skeleton-item variant="h3" style="width: 40%" />
                  <el-skeleton-item variant="rect" style="float: right; width: 1em; height: 1em" />
                </div>
              </template>

              <div class="flex-x-between">
                <el-skeleton-item variant="text" style="width: 30%" />
                <el-skeleton-item variant="circle" style="width: 2em; height: 2em" />
              </div>
              <div class="mt-5 flex-x-between">
                <el-skeleton-item variant="text" style="width: 50%" />
                <el-skeleton-item variant="text" style="width: 1em" />
              </div>
            </el-card>
          </template>
          <template v-if="!visitStatsLoading">
            <el-card shadow="never">
              <template #header>
                <div class="flex-x-between">
                  <span class="text-gray">访客数(UV)</span>
                  <el-tag type="success" size="small">日</el-tag>
                </div>
              </template>

              <div class="flex-x-between mt-2">
                <div class="flex-y-center">
                  <span class="text-lg">{{ Math.round(transitionUvCount) }}</span>
                  <span
                    :class="[
                      'text-xs',
                      'ml-2',
                      computeGrowthRateClass(visitStatsData.uv_growth_rate),
                    ]"
                  >
                    <el-icon>
                      <Top v-if="visitStatsData.uv_growth_rate > 0" />
                      <Bottom v-else-if="visitStatsData.uv_growth_rate < 0" />
                    </el-icon>
                    {{ formatGrowthRate(visitStatsData.uv_growth_rate) }}
                  </span>
                </div>
                <div class="i-svg:visitor w-8 h-8" />
              </div>

              <div class="flex-x-between mt-2 text-sm text-gray">
                <span>总访客数</span>
                <span>{{ Math.round(transitionTotalUvCount) }}</span>
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>

      <!-- 浏览量(PV) -->
      <el-col :xs="8" :sm="8" :md="4">
        <el-skeleton :loading="visitStatsLoading" :rows="5" animated>
          <template #template>
            <el-card>
              <template #header>
                <div>
                  <el-skeleton-item variant="h3" style="width: 40%" />
                  <el-skeleton-item variant="rect" style="float: right; width: 1em; height: 1em" />
                </div>
              </template>

              <div class="flex-x-between">
                <el-skeleton-item variant="text" style="width: 30%" />
                <el-skeleton-item variant="circle" style="width: 2em; height: 2em" />
              </div>
              <div class="mt-5 flex-x-between">
                <el-skeleton-item variant="text" style="width: 50%" />
                <el-skeleton-item variant="text" style="width: 1em" />
              </div>
            </el-card>
          </template>
          <template v-if="!visitStatsLoading">
            <el-card shadow="never">
              <template #header>
                <div class="flex-x-between">
                  <span class="text-gray">浏览量(PV)</span>
                  <el-tag type="primary" size="small">日</el-tag>
                </div>
              </template>

              <div class="flex-x-between mt-2">
                <div class="flex-y-center">
                  <span class="text-lg">{{ Math.round(transitionPvCount) }}</span>
                  <span
                    :class="[
                      'text-xs',
                      'ml-2',
                      computeGrowthRateClass(visitStatsData.pv_growth_rate),
                    ]"
                  >
                    <el-icon>
                      <Top v-if="visitStatsData.pv_growth_rate > 0" />
                      <Bottom v-else-if="visitStatsData.pv_growth_rate < 0" />
                    </el-icon>
                    {{ formatGrowthRate(visitStatsData.pv_growth_rate) }}
                  </span>
                </div>
                <div class="i-svg:browser w-8 h-8" />
              </div>

              <div class="flex-x-between mt-2 text-sm text-gray">
                <span>总浏览量</span>
                <span>{{ Math.round(transitionTotalPvCount) }}</span>
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>

      <!-- 用户量 -->
      <el-col :xs="8" :sm="8" :md="4">
        <el-card shadow="never" :loading="homeInfoLoading">
          <template #header>
            <div class="flex-x-between">
              <span class="text-gray">用户量</span>
              <el-tag type="warning" size="small">总</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <div class="flex-y-center">
              <span class="text-lg">{{ Math.round(transitionUserCount) }}</span>
            </div>
            <div class="i-svg:user w-8 h-8" />
          </div>

          <div class="flex-x-between mt-2 text-sm text-gray">
            <span>注册用户</span>
            <span>{{ Math.round(transitionUserCount) }}</span>
          </div>
        </el-card>
      </el-col>

      <!-- 文章量 -->
      <el-col :xs="8" :sm="8" :md="4">
        <el-card shadow="never" :loading="homeInfoLoading">
          <template #header>
            <div class="flex-x-between">
              <span class="text-gray">文章量</span>
              <el-tag type="success" size="small">总</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <div class="flex-y-center">
              <span class="text-lg">{{ Math.round(transitionArticleCount) }}</span>
            </div>
            <div class="i-svg:article w-8 h-8" />
          </div>

          <div class="flex-x-between mt-2 text-sm text-gray">
            <span>发布文章</span>
            <span>{{ Math.round(transitionArticleCount) }}</span>
          </div>
        </el-card>
      </el-col>

      <!-- 留言量 -->
      <el-col :xs="8" :sm="8" :md="4">
        <el-card shadow="never" :loading="homeInfoLoading">
          <template #header>
            <div class="flex-x-between">
              <span class="text-gray">留言量</span>
              <el-tag type="info" size="small">总</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2">
            <div class="flex-y-center">
              <span class="text-lg">{{ Math.round(transitionRemarkCount) }}</span>
            </div>
            <div class="i-svg:message w-8 h-8" />
          </div>

          <div class="flex-x-between mt-2 text-sm text-gray">
            <span>留言总数</span>
            <span>{{ Math.round(transitionRemarkCount) }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="mt-5">
      <!-- 访问趋势统计图 -->
      <el-col :xs="24" :span="16">
        <el-card>
          <template #header>
            <div class="flex-x-between">
              <div class="title">一周访问量✨</div>
              <el-radio-group v-model="visitTrendDateRange" size="small">
                <el-radio-button :value="30">近30天</el-radio-button>
                <el-radio-button :value="180">近180天</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <ECharts :options="visitTrendChartOptions" height="400px" />
        </el-card>
      </el-col>
      <!-- 最新动态 -->
      <el-col :xs="24" :span="8">
        <el-card>
          <template #header>
            <div class="flex-x-between">
              <div class="title">最新动态✨</div>
              <el-link
                type="primary"
                underline="never"
                href="https://github.com/ve-weiyi/ve-blog-golang/releases"
                target="_blank"
              >
                完整记录
                <el-icon class="link-icon">
                  <TopRight />
                </el-icon>
              </el-link>
            </div>
          </template>

          <el-scrollbar height="400px" v-loading="versionLoading">
            <el-timeline class="p-3">
              <el-timeline-item
                v-for="(item, index) in vesionList"
                :key="index"
                :timestamp="item.date"
                placement="top"
                :color="index === 0 ? '#67C23A' : '#909399'"
                :hollow="index !== 0"
                size="large"
              >
                <div class="version-item" :class="{ 'latest-item': index === 0 }">
                  <div>
                    <el-text tag="strong">{{ item.title }}</el-text>
                    <el-tag v-if="item.tag" :type="index === 0 ? 'success' : 'info'" size="small">
                      {{ item.tag }}
                    </el-tag>
                  </div>

                  <el-text class="version-content">{{ item.content }}</el-text>

                  <div v-if="item.link">
                    <el-link
                      :type="index === 0 ? 'primary' : 'info'"
                      :href="item.link"
                      target="_blank"
                      underline="never"
                    >
                      详情
                      <el-icon class="link-icon">
                        <TopRight />
                      </el-icon>
                    </el-link>
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表 -->
    <el-row :gutter="32" style="margin-top: 32px">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card shadow="never" :loading="homeInfoLoading">
          <div class="title">文章浏览量排行🚀</div>
          <ECharts :options="articleRankOptions" height="350px" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card shadow="never" :loading="homeInfoLoading">
          <div class="title">文章分类统计🍉</div>
          <ECharts :options="categoryOptions" height="350px" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card shadow="never" :loading="homeInfoLoading">
          <div class="title">文章标签统计🌈</div>
          <TagCloud v-if="!homeInfoLoading" :tag-list="homeInfoData.tag_list" />
        </el-card>
      </el-col>
    </el-row>

    <el-row class="data-card" style="margin-top: 32px">
      <div class="title">文章贡献统计🎉</div>
      <Calender style="width: 100%" :values="homeInfoData.article_statistics || []" />
    </el-row>

    <!-- 用户地域分布 -->
    <el-card shadow="never" :loading="homeInfoLoading">
      <div class="title">用户地域分布</div>
      <div v-loading="homeInfoLoading" style="height: 450px">
        <div class="chart-wrapper">
          <el-radio-group v-model="userType" size="small">
            <el-radio :value="0">用户</el-radio>
            <el-radio :value="1">游客</el-radio>
          </el-radio-group>
        </div>
        <ChinaMap :values="userAreaData || []" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

import { dayjs } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { useDateFormat, useTransition } from "@vueuse/core";
import { Connection, Failed } from "@element-plus/icons-vue";
import { useOnlineCount } from "@/hooks/websocket/services/useOnlineCount";
import {
  AdminHomeInfo,
  ArticleViewVO,
  CategoryVO,
  GetVisitStatsResp,
  GetVisitTrendResp,
  UserAreaVO,
} from "@/api/types";
import { WebsiteAPI } from "@/api/website";
import ECharts from "@/components/ECharts/index.vue";
import ChinaMap from "./components/ChinaMap.vue";
import Calender from "./components/Calender.vue";
import TagCloud from "./components/TagCloud.vue";

// 在线用户数量组件相关
const { onlineUserCount, lastUpdateTime, isConnected } = useOnlineCount();

// 记录上一次的用户数量用于计算趋势
const previousCount = ref(0);

// 监听用户数量变化，计算趋势
watch(onlineUserCount, (newCount, oldCount) => {
  if (oldCount > 0) {
    previousCount.value = oldCount;
  }
});

// 格式化时间戳
const formattedTime = computed(() => {
  if (!lastUpdateTime.value) return "--";
  return useDateFormat(lastUpdateTime, "HH:mm:ss").value;
});

interface VersionItem {
  id: string;
  title: string; // 版本标题（如：v2.4.0）
  date: string; // 发布时间
  content: string; // 版本描述
  link: string; // 详情链接
  tag?: string; // 版本标签（可选）
}

// GitHub Release 接口类型
interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
}

const userStore = useUserStore();

// 版本列表数据
const vesionList = ref<VersionItem[]>([]);
const versionLoading = ref(false);

/**
 * 获取 GitHub 仓库发布版本列表
 */
const fetchGitHubReleases = async () => {
  versionLoading.value = true;
  try {
    const response = await fetch("https://api.github.com/repos/ve-weiyi/ve-blog-golang/releases");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const releases: GitHubRelease[] = await response.json();

    // 转换数据格式
    vesionList.value = releases
      .filter((release) => !release.draft) // 过滤掉草稿版本
      .slice(0, 10) // 只取前10个版本
      .map((release, index) => ({
        id: release.id.toString(),
        title: release.name || release.tag_name,
        date: dayjs(release.published_at).format("YYYY-MM-DD HH:mm:ss"),
        content:
          release.body?.substring(0, 100) + (release.body?.length > 100 ? "..." : "") || "暂无描述",
        link: release.html_url,
        tag: index === 0 ? "最新版本" : release.prerelease ? "预发布" : "稳定版",
      }));
  } catch (error) {
    console.error("获取 GitHub 发布版本失败:", error);
    // 失败时使用默认数据
    vesionList.value = [
      {
        id: "1",
        title: "获取失败",
        date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        content: "无法获取最新版本信息，请检查网络连接",
        link: "https://github.com/ve-weiyi/ve-blog-golang/releases",
        tag: "错误",
      },
    ];
  } finally {
    versionLoading.value = false;
  }
};

// 当前时间（用于计算问候语）
const currentDate = new Date();

// 问候语：根据当前小时返回不同问候语
const greetings = computed(() => {
  const hours = currentDate.getHours();
  const nickname = userStore.userInfo.nickname;
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (hours >= 8 && hours < 12) {
    return `上午好，${nickname}！`;
  } else if (hours >= 12 && hours < 18) {
    return `下午好，${nickname}！`;
  } else if (hours >= 18 && hours < 24) {
    return `晚上好，${nickname}！`;
  } else {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});

// 访客统计数据加载状态
const visitStatsLoading = ref(true);
// 访客统计数据
const visitStatsData = ref<GetVisitStatsResp>({
  today_uv_count: 0,
  total_uv_count: 0,
  uv_growth_rate: 0,
  today_pv_count: 0,
  total_pv_count: 0,
  pv_growth_rate: 0,
});

// 数字过渡动画
const transitionUvCount = useTransition(
  computed(() => visitStatsData.value.today_uv_count),
  {
    duration: 1000,
    transition: [0.25, 0.1, 0.25, 1.0], // CSS cubic-bezier
  }
);

const transitionTotalUvCount = useTransition(
  computed(() => visitStatsData.value.total_uv_count),
  {
    duration: 1200,
    transition: [0.25, 0.1, 0.25, 1.0],
  }
);

const transitionPvCount = useTransition(
  computed(() => visitStatsData.value.today_pv_count),
  {
    duration: 1000,
    transition: [0.25, 0.1, 0.25, 1.0],
  }
);

const transitionTotalPvCount = useTransition(
  computed(() => visitStatsData.value.total_pv_count),
  {
    duration: 1200,
    transition: [0.25, 0.1, 0.25, 1.0],
  }
);

// 访问趋势日期范围（单位：天）
const visitTrendDateRange = ref(30);
// 访问趋势图表配置
const visitTrendChartOptions = ref();

/**
 * 获取访客统计数据
 */
const fetchVisitStatsData = () => {
  WebsiteAPI.getVisitStatsApi()
    .then((res) => {
      visitStatsData.value = res.data;
    })
    .finally(() => {
      visitStatsLoading.value = false;
    });
};

/**
 * 获取访问趋势数据，并更新图表配置
 */
const fetchVisitTrendData = () => {
  const startDate = dayjs()
    .subtract(visitTrendDateRange.value - 1, "day")
    .toDate();
  const endDate = new Date();

  WebsiteAPI.getVisitTrendApi({
    start_date: dayjs(startDate).format("YYYY-MM-DD"),
    end_date: dayjs(endDate).format("YYYY-MM-DD"),
  }).then((res) => {
    updateVisitTrendChartOptions(res.data);
  });
};

/**
 * 更新访问趋势图表的配置项
 *
 * @param data - 访问趋势数据
 */
const updateVisitTrendChartOptions = (data: GetVisitTrendResp) => {

  const dates = [];
  const pvs = [];
  const uvs = [];
  data.visit_trend.forEach((item, _) => {
    dates.push(item.date);
    pvs.push(item.pv_count);
    uvs.push(item.uv_count);
  });

  visitTrendChartOptions.value = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["浏览量(PV)", "访客数(UV)"],
      bottom: 0,
    },
    grid: {
      left: "1%",
      right: "5%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: dates,
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "浏览量(PV)",
        type: "line",
        data: pvs,
        areaStyle: {
          color: "rgba(64, 158, 255, 0.1)",
        },
        smooth: true,
        itemStyle: {
          color: "#4080FF",
        },
        lineStyle: {
          color: "#4080FF",
        },
      },
      {
        name: "访客数(UV)",
        type: "line",
        data: uvs,
        areaStyle: {
          color: "rgba(103, 194, 58, 0.1)",
        },
        smooth: true,
        itemStyle: {
          color: "#67C23A",
        },
        lineStyle: {
          color: "#67C23A",
        },
      },
    ],
  };
};

function formatGrowthRate(growthRate: number) {
  if (growthRate === 0) {
    return "-";
  }

  const formattedRate = Math.abs(growthRate * 100)
    .toFixed(2)
    .replace(/\.?0+$/, "");
  return formattedRate + "%";
}

/**
 * 根据增长率计算对应的 CSS 类名
 *
 * @param growthRate - 增长率数值
 */
const computeGrowthRateClass = (growthRate?: number): string => {
  if (!growthRate) {
    return "text-[--el-color-info]";
  }
  if (growthRate > 0) {
    return "text-[--el-color-danger]";
  } else if (growthRate < 0) {
    return "text-[--el-color-success]";
  } else {
    return "text-[--el-color-info]";
  }
};

// 监听访问趋势日期范围的变化，重新获取趋势数据
watch(
  () => visitTrendDateRange.value,
  (newVal) => {
    console.log("Visit trend date range changed:", newVal);
    fetchVisitTrendData();
  },
  { immediate: true }
);

// 首页信息加载状态
const homeInfoLoading = ref(true);
// 首页信息数据
const homeInfoData = ref<AdminHomeInfo>({
  user_count: 0,
  article_count: 0,
  remark_count: 0,
  category_list: [],
  tag_list: [],
  article_view_ranks: [],
  article_statistics: [],
});

// 数字过渡动画
const transitionUserCount = useTransition(
  computed(() => homeInfoData.value.user_count),
  {
    duration: 1000,
    transition: [0.25, 0.1, 0.25, 1.0],
  }
);

const transitionArticleCount = useTransition(
  computed(() => homeInfoData.value.article_count),
  {
    duration: 1000,
    transition: [0.25, 0.1, 0.25, 1.0],
  }
);

const transitionRemarkCount = useTransition(
  computed(() => homeInfoData.value.remark_count),
  {
    duration: 1000,
    transition: [0.25, 0.1, 0.25, 1.0],
  }
);

/**
 * 获取首页信息数据
 */
const fetchHomeInfoData = () => {
  WebsiteAPI.getAdminHomeInfoApi()
    .then((res) => {
      homeInfoData.value = res.data;
      updateArticleRankOptions(res.data.article_view_ranks);
      updateCategoryOptions(res.data.category_list);
    })
    .finally(() => {
      homeInfoLoading.value = false;
    });
};

/**
 * 获取用户地区分布数据
 */
const fetchUserAreaData = () => {
  WebsiteAPI.getUserAreaStatsApi({
    user_type: userType.value,
  }).then((res) => {
    userAreaData.value = res.data.user_areas;
  });
};

// 组件挂载后加载访客统计数据和首页信息数据
onMounted(() => {
  fetchVisitStatsData();
  fetchHomeInfoData();
  fetchGitHubReleases(); // 获取 GitHub 发布版本
});

// 文章浏览量排行图表配置
const articleRankOptions = ref();

// 文章分类统计图表配置
const categoryOptions = ref();

const updateArticleRankOptions = (articleRanks: ArticleViewVO[]) => {
  articleRankOptions.value = {
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
      data: articleRanks?.map((item) => item.article_title),
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
        data: articleRanks?.map((item) => item.view_count),
      },
    ],
  };
};

const updateCategoryOptions = (categories: CategoryVO[]) => {
  categoryOptions.value = {
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
        data: categories?.map((item) => ({
          name: item.category_name,
          value: item.article_count,
        })),
      },
    ],
  };
};

// 用户类型（0：用户，1：游客）
const userType = ref(1);

// 用户地域分布数据
const userAreaData = ref<UserAreaVO[]>([]);

// 监听用户类型的变化，重新获取用户地区分布数据
watch(
  () => userType.value,
  (newVal) => {
    console.log("User type changed:", newVal);
    fetchUserAreaData();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border: 0;
  }

  .version-item {
    padding: 16px;
    margin-bottom: 12px;
    background: var(--el-fill-color-lighter);
    border-radius: 8px;
    transition: all 0.2s;

    &.latest-item {
      background: var(--el-color-primary-light-9);
      border: 1px solid var(--el-color-primary-light-5);
    }

    &:hover {
      transform: translateX(5px);
    }

    .version-content {
      margin-bottom: 12px;
      font-size: 13px;
      line-height: 1.5;
      color: var(--el-text-color-secondary);
    }
  }
}

.title {
  font-size: 14px;
  font-weight: 700;
  color: var(--el-text-color-secondary);
}
</style>
