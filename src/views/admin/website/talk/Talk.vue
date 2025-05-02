<template>
  <div class="app-container">
    <el-card class="main-card">
      <div class="table-title">{{ route.meta.title }}</div>
      <!-- 操作 -->
      <div class="operation-container">
        <el-button type="primary" plain icon="Promotion" @click="handPublish">发布说说</el-button>
      </div>
      <!-- 文章状态 -->
      <div class="status-menu">
        <span>状态</span>
        <span :class="isActive(null)" @click="changeStatus(null)">全部</span>
        <span :class="isActive(1)" @click="changeStatus(1)">公开</span>
        <span :class="isActive(2)" @click="changeStatus(2)">私密</span>
      </div>
      <el-empty v-if="tableData == null" description="暂无说说" />
      <!-- 说说列表 -->
      <div v-for="item of tableData" :key="item.id" class="talk-item">
        <!-- 用户信息 -->
        <div class="user-info-wrapper">
          <el-avatar :size="36" :src="item.user?.avatar" class="user-avatar" />
          <div class="user-detail-wrapper">
            <div class="user-nickname">
              <div>{{ item.user?.nickname || "未知用户" }}</div>
              <!-- 操作 -->
              <el-dropdown trigger="click" @command="handleCommand">
                <el-icon style="color: #333; cursor: pointer">
                  <MoreFilled />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="'1,' + item.id">
                      <el-icon>
                        <Edit />
                      </el-icon>
                      编辑
                    </el-dropdown-item>
                    <el-dropdown-item :command="'2,' + item.id">
                      <el-icon>
                        <Delete />
                      </el-icon>
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <!-- 发表时间 -->
            <div class="time">
              {{ formatDateTime(item.created_at) }}
              <span v-if="item.is_top === 1" class="top">
                <el-icon style="color: #ff7242">
                  <Promotion />
                </el-icon>
                置顶
              </span>
              <span v-if="item.status === 2" class="secret">
                <el-icon style="color: #ff9900">
                  <Lock />
                </el-icon>
                私密
              </span>
            </div>
            <!-- 说说信息 -->
            <div class="talk-content" v-html="item.content"></div>
            <!-- 图片列表 -->
            <el-row v-if="item.img_list" :gutter="4" class="talk-images">
              <el-col v-for="(img, index) of item.img_list" :key="index" :cols="6" :sm="4" :xs="4">
                <el-image class="images-items" :preview-src-list="previewList" :src="img" />
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <VeTablePagination v-if="pageData.total > 0" v-model="pageData" @pagination="refreshList" />
      <!-- 删除对话框 -->
      <el-dialog v-model="isDelete" width="30%">
        <template #header>
          <div class="dialog-title-container">
            <el-icon style="color: #ff9900">
              <WarningFilled />
            </el-icon>
            提示
          </div>
        </template>
        <div style="font-size: 1rem">是否删除该说说？</div>
        <template #footer>
          <el-button @click="isDelete = false">取 消</el-button>
          <el-button type="primary" @click="handDelete">确 定</el-button>
        </template>
      </el-dialog>
      <!-- 添加或修改对话框 -->
      <el-dialog v-model="isEdit" width="60%">
        <Talk :talk-id="talkId" @on-confirm="afterPublish" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import Talk from "./TalkWrite.vue";
import VeTablePagination from "@/components/VeTable/TablePagination.vue";
import { TalkAPI } from "@/api/talk";
import type { TalkQuery, TalkBackVO } from "@/api/types";
import { useRoute, useRouter } from "vue-router";
import "@/styles/table.scss";
import { formatDateTime } from "@/utils/date";

const route = useRoute();
const router = useRouter();

const data = reactive({
  pageData: {
    currentPage: 1,
    pageSize: 10,
    total: 20,
  },
  searchData: {} as any,
  orderData: {} as any,
  tableData: [] as Array<TalkBackVO>,
  formData: {} as any,
});

const { pageData, searchData, orderData, tableData, formData } = toRefs(data);

function refreshList() {
  let data: TalkQuery = {
    page: pageData.value.currentPage,
    page_size: pageData.value.pageSize,
    status: status.value,
  };

  TalkAPI.findTalkListApi(data).then((res) => {
    tableData.value = res.data.list;
    pageData.value.total = res.data.total;
  });
}

onMounted(() => {
  refreshList();
});

const status = ref(1);
const isEdit = ref(false);
const isDelete = ref(false);
const previewList = ref([]);
const talkId = ref(0);

function handleCommand(command) {
  const arr = command.split(",");
  talkId.value = parseInt(arr[1]);
  console.log("type", arr[0], "talkId", talkId.value);
  switch (arr[0]) {
    case "1":
      isEdit.value = true;
      break;
    case "2":
      isDelete.value = true;
      break;
  }
}

function handDelete() {
  const data = {
    id: talkId.value,
  };
  TalkAPI.deleteTalkApi(data).then(() => {
    refreshList();
  });

  isDelete.value = false;
}

function handPublish() {
  talkId.value = 0;
  isEdit.value = true;
}

function afterPublish() {
  isEdit.value = false;
  refreshList();
}

function changeStatus(s) {
  status.value = s;
  refreshList();
}

const isActive = computed(() => {
  return function (s) {
    return status.value === s ? "active-status" : "status";
  };
});
</script>

<style scoped>
.status-menu {
  font-size: 14px;
  margin-top: 20px;
  color: #999;
}

.status-menu span {
  margin-right: 24px;
}

.status {
  cursor: pointer;
}

.active-status {
  cursor: pointer;
  color: #333;
  font-weight: bold;
}

.talk-item:not(:first-child) {
  margin-top: 20px;
}

.talk-item {
  padding: 16px 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 3px 8px 6px rgb(7 17 27 / 6%);
  transition: all 0.3s ease 0s;
}

.talk-item:hover {
  box-shadow: 0 5px 10px 8px rgb(7 17 27 / 16%);
  transform: translateY(-3px);
}

.user-info-wrapper {
  width: 100%;
  display: flex;
}

.user-avatar {
  border-radius: 50%;
}

.user-avatar {
  transition: all 0.5s;
}

.user-avatar:hover {
  transform: rotate(360deg);
}

.user-detail-wrapper {
  margin-left: 10px;
  width: 100%;
}

.user-nickname {
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}

.user-sign {
  margin-left: 4px;
}

.time {
  color: #999;
  margin-top: 2px;
  font-size: 12px;
}

.top {
  color: #ff7242;
  margin-left: 10px;
}

.secret {
  color: #999;
  margin-left: 10px;
}

.talk-content {
  margin-top: 8px;
  font-size: 14px;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
}

.talk-images {
  margin-top: 8px;
}

.images-items {
  cursor: pointer;
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 4px;
}
</style>
