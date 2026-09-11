<template>
  <el-breadcrumb class="flex-y-center">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span
        v-if="item.redirect === 'noredirect' || index === breadcrumbs.length - 1"
        class="color-gray-400"
      >
        {{ item.meta.title ?? "" }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta.title ?? "" }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import type { RouteLocationMatched } from "vue-router";
import { compile } from "path-to-regexp";
import router from "@/router";

type BreadcrumbRoute = {
  path: string;
  name?: RouteLocationMatched["name"];
  redirect?: string;
  meta: RouteLocationMatched["meta"];
};

const currentRoute = useRoute();
const dashboardRoute: BreadcrumbRoute = { path: "/dashboard", meta: { title: "首页" } };

const pathCompile = (path: string) => {
  const { params } = currentRoute;
  const toPath = compile(path);
  return toPath(params);
};

const breadcrumbs = ref<BreadcrumbRoute[]>([]);

function getBreadcrumb() {
  let matched: BreadcrumbRoute[] = currentRoute.matched
    .filter((item) => item.meta && item.meta.title)
    .map(({ path, name, redirect, meta }) => ({
      path,
      name,
      redirect: typeof redirect === "string" ? redirect : undefined,
      meta,
    }));

  const first = matched[0];
  if (!isDashboard(first)) {
    matched = [dashboardRoute].concat(matched);
  }
  breadcrumbs.value = matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  });
}

function isDashboard(route?: BreadcrumbRoute) {
  const name = route?.name;
  if (!name) {
    return false;
  }
  return name.toString().trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
}

function handleLink(item: BreadcrumbRoute) {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect).catch((err) => {
      console.warn(err);
    });
    return;
  }
  router.push(pathCompile(path)).catch((err) => {
    console.warn(err);
  });
}

watch(
  () => currentRoute.path,
  (path) => {
    if (path.startsWith("/redirect/")) {
      return;
    }
    getBreadcrumb();
  }
);

onBeforeMount(() => {
  getBreadcrumb();
});
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}
</style>
