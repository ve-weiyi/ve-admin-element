<template>
  <div class="app-container">
    <el-card class="main-card">
      <div class="table-title">{{ route.meta.title }}</div>
      <!-- 操作 -->
      <div class="operation-container">
        <el-button type="primary" plain icon="Promotion" @click="handleAdd()">发布说说</el-button>
      </div>
      <!-- 文章状态 -->
      <div class="status-menu">
        <span>状态</span>
        <span :class="isActive(0)" @click="changeStatus(0)">全部</span>
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
              <el-dropdown>
                <el-icon style="color: #333; cursor: pointer">
                  <MoreFilled />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item icon="edit" @click="handleEdit(item)">编辑</el-dropdown-item>
                    <el-dropdown-item icon="delete" @click="handleDelete(item)">
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
                <el-image class="images-items" :preview-src-list="item.img_list" :src="img" />
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <VeTablePagination v-if="pageData.total > 0" v-model="pageData" @pagination="refreshList" />
      <!-- 添加或修改对话框 -->
      <el-dialog v-model="addModalVisible" width="60%">
        <div class="table-title">{{ title }}</div>
        <div class="talk-container">
          <!-- 输入框 -->
          <Editor
            ref="editorRef"
            class="editor-wrapper"
            placeholder="说点什么吧"
            v-model:text="talk.content"
          />
          <!-- 操作菜单 -->
          <div class="operation-wrapper">
            <div class="left-wrapper">
              <!-- 表情 -->
              <el-popover placement="bottom-start" trigger="click" width="460">
                <span
                  v-for="(item, key) of emojiList"
                  :key="key"
                  class="emoji-item"
                  @click="addEmoji(key, item.active)"
                >
                  <img :src="item.normal" :title="item.key" class="emoji" height="24" width="24" />
                </span>
                <template #reference>
                  <el-icon class="operation-btn">
                    <Avatar />
                  </el-icon>
                </template>
              </el-popover>
              <!-- 图片上传 -->
              <el-icon class="operation-btn" @click="showUpload = !showUpload">
                <PictureFilled />
              </el-icon>
            </div>
            <div class="right-wrapper">
              <!-- 是否置顶 -->
              <el-switch
                v-model="talk.is_top"
                :active-value="1"
                :inactive-value="0"
                inactive-text="置顶"
                style="margin-right: 16px"
              />
              <!-- 说说状态 -->
              <el-dropdown style="margin-right: 16px" trigger="click" @command="handleCommand">
                <span class="talk-status">
                  {{ dropdownTitle }}
                  <el-icon><ArrowUp /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(item, index) of statusList"
                      :key="index"
                      :command="item.status"
                    >
                      {{ item.desc }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-button
                :disabled="talk.content === ''"
                size="default"
                type="primary"
                @click="saveOrUpdateTalk"
              >
                发布
              </el-button>
            </div>
          </div>
          <!-- 图片上传 -->
          <multi-image-upload
            v-show="showUpload || uploadList.length > 0"
            class="talk-image-upload"
            list-type="picture-card"
            v-model:file-list="uploadList"
            :show-file-list="true"
            upload-path="blog/talk/"
          />
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import VeTablePagination from "@/components/VeTable/TablePagination.vue";
import { TalkAPI } from "@/api/talk";
import type { TalkQuery, TalkBackVO, TalkNewReq } from "@/api/types";
import { useRoute, useRouter } from "vue-router";
import "@/styles/table.scss";
import { formatDateTime } from "@/utils/date";
import { ElMessage } from "element-plus";
import Editor from "@/components/Editor/index.vue";
import EmojiList from "@/assets/emojis/qq_emoji.json";
import { TalkStatusEnum, TalkTopEnum } from "@/enums/TalkEnum.ts";

const route = useRoute();
const router = useRouter();

const data = reactive({
  pageData: {
    currentPage: 1,
    pageSize: 10,
    total: 20,
  },
  tableData: [] as Array<TalkBackVO>,
});

const { pageData, tableData } = toRefs(data);

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

const status = ref(0);
const addModalVisible = ref(false);
const initFormData = {
  id: 0,
  content: "",
  img_list: [],
  is_top: TalkTopEnum.NO,
  status: TalkStatusEnum.PUBLIC,
};
const talk = reactive<TalkNewReq>({ ...initFormData });

function handleAdd() {
  Object.assign(talk, initFormData);
  showUpload.value = false;
  uploadList.value = [];
  addModalVisible.value = true;
}

function handleEdit(item: TalkBackVO) {
  Object.assign(talk, item);
  showUpload.value = false;
  uploadList.value =
    item.img_list?.map((img) => ({
      name: img.split("/").pop() || "image",
      url: img,
    })) || [];
  addModalVisible.value = true;
}

function handleDelete(item: TalkBackVO) {
  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    TalkAPI.deleteTalkApi({ id: item.id })
      .then((res) => {
        ElMessage.success("删除成功");
        refreshList();
      })
      .catch((error) => {
        ElMessage.error("删除失败: " + error.message);
      });
  });
}

const title = computed(() => {
  return talk.id ? "编辑说说" : "发布说说";
});

// const route = useRoute();
const emojiList = reactive<any>(EmojiList);
const statusList = [
  { status: 1, desc: "公开" },
  { status: 2, desc: "私密" },
];
const uploadList = ref([]);
const showUpload = ref(false);

function handleCommand(command: any) {
  talk.status = command;
}

const editorRef = ref(null);

function addEmoji(key, value) {
  const emojiTag = `<img src="${value}" width="24" height="24" alt="${key}" style="margin: 0 1px;display: inline;vertical-align: text-bottom"/>`;
  editorRef.value.addText(emojiTag);
  console.log("talk.content", talk.content);
}

function saveOrUpdateTalk() {
  if (talk.content.trim() === "") {
    ElMessage.error("说说内容不能为空");
    return false;
  }

  // 转换图片
  talk.img_list = uploadList.value.map((item) => item.url);

  if (talk.id) {
    TalkAPI.updateTalkApi(talk).then((res) => {
      ElMessage.success("更新说说成功");
      addModalVisible.value = false;
      refreshList();
    });
  } else {
    TalkAPI.addTalkApi(talk).then((res) => {
      ElMessage.success("发布说说成功");
      addModalVisible.value = false;
      refreshList();
    });
  }
  return true;
}

const dropdownTitle = computed(() => {
  const currentStatus = talk.status;
  const status = statusList.find((item) => item.status === currentStatus);
  return status ? status.desc : "";
});

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

/* 编辑对话框相关样式 */
.talk-container {
  margin-top: 10px;
}

.editor-wrapper {
  min-height: 200px;
}

.operation-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.operation-btn {
  cursor: pointer;
  color: #838383;
  font-size: 20px;
  margin-right: 12px;
}

.talk-status {
  cursor: pointer;
  font-size: 12px;
  color: #999;
}

.emoji {
  user-select: none;
  margin: 0.25rem;
  display: inline-block;
  vertical-align: middle;
}

.emoji-item {
  cursor: pointer;
  display: inline-block;
}

.emoji-item:hover {
  transition: all 0.2s;
  border-radius: 0.25rem;
  background: #dddddd;
}

.left-wrapper {
  display: flex;
}

.right-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.talk-image-upload {
  margin-top: 8px;
}
</style>
