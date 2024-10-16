<template>
  <el-card>
    <div class="table-title">{{ "编辑说说" }}</div>
    <div class="talk-container">
      <!-- 输入框 -->
      <Editor
        ref="editorRef"
        v-model="talk.content"
        class="editor-wrapper"
        placeholder="说点什么吧"
      />
      <!-- 操作菜单 -->
      <div class="operation-wrapper">
        <div class="left-wrapper">
          <!-- 表情 -->
          <el-popover placement="bottom-start" trigger="click" width="460">
            <span
              v-for="(item, key, index) of emojiList"
              :key="index"
              class="emoji-item"
              @click="addEmoji(key, item.active)"
            >
              <img
                :src="item.normal"
                :title="item.key"
                class="emoji"
                height="24"
                width="24"
              />
            </span>
            <template #reference>
              <el-icon class="operation-btn">
                <Avatar />
              </el-icon>
              <!--                <i class="iconfont icon-smile operation-btn" />-->
            </template>
          </el-popover>
          <!-- 图片上传 -->
          <el-upload
            :before-upload="beforeUpload"
            :http-request="onUpload"
            :on-success="afterUpload"
            :show-file-list="false"
            multiple
          >
            <el-icon class="operation-btn">
              <PictureFilled />
            </el-icon>
          </el-upload>
        </div>
        <div class="flex-center">
          <!-- 是否置顶 -->
          <el-switch
            v-model="talk.is_top"
            :active-value="1"
            :inactive-value="0"
            inactive-text="置顶"
            style="margin-right: 16px"
          />
          <!-- 说说状态 -->
          <el-dropdown
            style="margin-right: 16px"
            trigger="click"
            @command="handleCommand"
          >
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
      <el-upload
        v-show="uploadList.length > 0"
        :before-upload="beforeUpload"
        :http-request="onUpload"
        :on-success="afterUpload"
        :on-remove="handleRemove"
        :file-list="uploadList"
        class="talk-image-upload"
        list-type="picture-card"
        multiple
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { compressImage, uploadFile } from "@/utils/file.ts";
import EmojiList from "@/assets/emojis/qq_emoji.json";
import Editor from "@/components/Editor/index.vue";
import { addTalkApi, getTalkApi, updateTalkApi } from "@/api/talk.ts";
import { TalkNewReq } from "@/api/types.ts";
import { ElMessage, UploadRawFile, UploadRequestOptions } from "element-plus";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  talkId: {
    type: Number,
    default: 0,
    required: true,
  },
});

const emit = defineEmits(["onConfirm"]);

// const route = useRoute();
const emojiList = ref<any>(EmojiList);
const talk = ref<TalkNewReq>({
  content: "",
  id: 0,
  img_list: [],
  is_top: 0,
  status: 0,
});
const statusList = ref([
  { status: 1, desc: "公开" },
  { status: 2, desc: "私密" },
]);
const uploadList = ref([]);

const { talkId } = toRefs(props);

onMounted(() => {
  findTalk(talkId.value);
});

watch(talkId, (newValue, oldValue) => {
  uploadList.value = [];
  console.log("new talkId", newValue);
  findTalk(newValue);
});

function findTalk(talkId: number) {
  if (talkId) {
    getTalkApi({ id: talkId }).then((res) => {
      talk.value = res.data;
      if (res.data.img_list) {
        res.data.img_list.forEach((item) => {
          uploadList.value.push({ url: item });
        });
      }
    });
  }
}

function handleCommand(command: any) {
  talk.value.status = command;
}

const editorRef = ref(null);

function addEmoji(key, value) {
  const emojiTag = `<img src="${value}" width="24" height="24" alt="${key}" style="margin: 0 1px;display: inline;vertical-align: text-bottom"/>`;
  editorRef.value.addText(emojiTag);
  console.log("talk.value.content", talk.value.content);
}

// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
function beforeUpload(rawFile: UploadRawFile) {
  console.log("beforeUpload", rawFile.name, rawFile.size);

  if (rawFile.size / 1024 < 500) {
    return true;
  }

  return compressImage(rawFile);
}

function onUpload(options: UploadRequestOptions) {
  return uploadFile(options.file, "talk");
}

function afterUpload(res: any) {
  console.log("afterUpload", res);
  ElMessage.success(res.message);
  uploadList.value.push({ url: res.data.file_url });
}

function handleRemove(file) {
  const index = uploadList.value.findIndex((item) => item.url === file.url);
  if (index !== -1) {
    uploadList.value.splice(index, 1);
  }
}

function saveOrUpdateTalk() {
  if (talk.value.content.trim() === "") {
    ElMessage.error("说说内容不能为空");
    return false;
  }

  // 转换图片
  if (uploadList.value.length > 0) {
    const imgList = uploadList.value.map((item) => item.url);
    // talk.value.img_list = JSON.stringify(imgList);
    talk.value.img_list = imgList;
  }

  console.log("talk.value", talk.value);
  if (talk.value.id) {
    updateTalkApi(talk.value).then((res) => {
      editorRef.value.clear();
      uploadList.value = [];
      ElMessage.success("更新说说成功");
      emit("onConfirm");
    });
  } else {
    addTalkApi(talk.value).then((res) => {
      editorRef.value.clear();
      uploadList.value = [];
      ElMessage.success("发布说说成功");
      emit("onConfirm");
    });
  }
}

const dropdownTitle = computed(() => {
  const currentStatus = talk.value.status;
  const status = statusList.value.find((item) => item.status === currentStatus);
  return status ? status.desc : "";
});
</script>

<style scoped>
.talk-container {
  margin-top: 20px;
}

.editor-wrapper {
  min-height: 150px;
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

.right-wrapper {
}

.left-wrapper {
  display: flex;
  width: 50%;
}

.talk-image-upload {
  margin-top: 8px;
}
</style>
