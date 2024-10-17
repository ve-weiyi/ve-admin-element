<template>
  <el-card class="main-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 修改信息 -->
      <el-tab-pane label="网站信息" name="info">
        <el-form
          v-model="websiteConfigForm"
          label-position="left"
          label-width="100px"
        >
          <el-form-item label="网站头像">
            <el-upload
              :show-file-list="false"
              :http-request="onUpload"
              :before-upload="beforeUpload"
              class="avatar-uploader"
              :on-success="handleWebsiteAvatarSuccess"
            >
              <img
                v-if="websiteConfigForm.website_avatar"
                :src="websiteConfigForm.website_avatar"
                alt="img"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="网站名称">
            <el-input
              v-model="websiteConfigForm.website_name"
              size="small"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item label="网站作者">
            <el-input
              v-model="websiteConfigForm.website_author"
              size="small"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item label="网站简介">
            <el-input
              v-model="websiteConfigForm.website_intro"
              size="small"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item label="网站创建日期">
            <el-date-picker
              v-model="websiteConfigForm.website_create_time"
              placeholder="选择日期"
              style="width: 400px"
              type="date"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="网站公告">
            <el-input
              v-model="websiteConfigForm.website_notice"
              :rows="5"
              placeholder="请输入公告内容"
              style="width: 400px"
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="备案号">
            <el-input
              v-model="websiteConfigForm.website_record_no"
              size="small"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item label="第三方登录">
            <el-checkbox-group v-model="websiteConfigForm.social_login_list">
              <el-checkbox label="qq" value="qq">QQ</el-checkbox>
              <el-checkbox label="weibo" value="weibo">微博</el-checkbox>
              <el-checkbox label="feishu" value="feishu">飞书</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-button
            size="default"
            style="margin-left: 6.3rem"
            type="primary"
            @click="updateWebsiteConfig"
          >
            修改
          </el-button>
        </el-form>
      </el-tab-pane>
      <!-- 网站公告 -->
      <el-tab-pane label="社交信息" name="notice">
        <el-form v-model="websiteConfigForm" label-width="70px">
          <el-checkbox-group v-model="websiteConfigForm.social_url_list">
            <el-form-item label="QQ">
              <el-input
                v-model="websiteConfigForm.qq"
                size="small"
                style="width: 400px; margin-right: 1rem"
              />
              <el-checkbox label="qq" value="qq">是否展示</el-checkbox>
            </el-form-item>
            <el-form-item label="Github">
              <el-input
                v-model="websiteConfigForm.github"
                size="small"
                style="width: 400px; margin-right: 1rem"
              />
              <el-checkbox label="github" value="github">是否展示</el-checkbox>
            </el-form-item>
            <el-form-item label="Gitee">
              <el-input
                v-model="websiteConfigForm.gitee"
                size="small"
                style="width: 400px; margin-right: 1rem"
              />
              <el-checkbox label="gitee" value="gitee">是否展示</el-checkbox>
            </el-form-item>
            <el-button
              size="default"
              style="margin-left: 4.375rem"
              type="primary"
              @click="updateWebsiteConfig"
            >
              修改
            </el-button>
          </el-checkbox-group>
        </el-form>
      </el-tab-pane>
      <!-- 修改密码 -->
      <el-tab-pane label="其他设置" name="password">
        <el-form
          v-model="websiteConfigForm"
          label-position="left"
          label-width="120px"
        >
          <el-row style="width: 600px">
            <el-col :md="12">
              <el-form-item label="用户头像">
                <el-upload
                  :show-file-list="false"
                  :http-request="onUpload"
                  :before-upload="beforeUpload"
                  class="avatar-uploader"
                  :on-success="handleUserAvatarSuccess"
                >
                  <img
                    v-if="websiteConfigForm.user_avatar"
                    :src="websiteConfigForm.user_avatar"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="游客头像">
                <el-upload
                  :show-file-list="false"
                  :http-request="onUpload"
                  :before-upload="beforeUpload"
                  :on-success="handleTouristAvatarSuccess"
                  class="avatar-uploader"
                >
                  <img
                    v-if="websiteConfigForm.tourist_avatar"
                    :src="websiteConfigForm.tourist_avatar"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="邮箱通知">
            <el-radio-group v-model="websiteConfigForm.is_email_notice">
              <el-radio :label="0" :value="0">关闭</el-radio>
              <el-radio :label="1" :value="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="评论审核">
            <el-radio-group v-model="websiteConfigForm.is_comment_review">
              <el-radio :label="0" :value="0">关闭</el-radio>
              <el-radio :label="1" :value="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="留言审核">
            <el-radio-group v-model="websiteConfigForm.is_message_review">
              <el-radio :label="0" :value="0">关闭</el-radio>
              <el-radio :label="1" :value="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="打赏状态">
            <el-radio-group v-model="websiteConfigForm.is_reward">
              <el-radio :label="0" :value="0">关闭</el-radio>
              <el-radio :label="1" :value="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row
            v-show="websiteConfigForm.is_reward == 1"
            style="width: 600px"
          >
            <el-col :md="12">
              <el-form-item label="微信收款码">
                <el-upload
                  :show-file-list="false"
                  :http-request="onUpload"
                  :before-upload="beforeUpload"
                  class="avatar-uploader"
                  :on-success="handleWeiXinSuccess"
                >
                  <img
                    v-if="websiteConfigForm.weixin_qr_code"
                    :src="websiteConfigForm.weixin_qr_code"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="支付宝收款码">
                <el-upload
                  :show-file-list="false"
                  :http-request="onUpload"
                  :before-upload="beforeUpload"
                  class="avatar-uploader"
                  :on-success="handleAlipaySuccess"
                >
                  <img
                    v-if="websiteConfigForm.alipay_qr_code"
                    :src="websiteConfigForm.alipay_qr_code"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="聊天室状态">
            <el-radio-group v-model="websiteConfigForm.is_chat_room">
              <el-radio :label="0" :value="0">关闭</el-radio>
              <el-radio :label="1" :value="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-show="websiteConfigForm.is_chat_room == 1"
            label="Websocket地址"
          >
            <el-input
              v-model="websiteConfigForm.websocket_url"
              size="small"
              style="width: 400px"
            />
          </el-form-item>
          <el-form-item label="音乐播放器状态">
            <el-radio-group v-model="websiteConfigForm.is_music_player">
              <el-radio :label="0" :value="0">关闭</el-radio>
              <el-radio :label="1" :value="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-button
            size="default"
            style="margin-left: 6.3rem"
            type="primary"
            @click="updateWebsiteConfig"
          >
            修改
          </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElMessage, UploadRawFile, UploadRequestOptions } from "element-plus";
import { getWebsiteConfigApi, updateWebsiteConfigApi } from "@/api/website";
import { WebsiteConfig } from "@/api/types.ts";
import { uploadFile } from "@/utils/file.ts";

const websiteConfigForm = ref<WebsiteConfig>({
  website_avatar: "",
  website_name: "",
  website_author: "",
  website_intro: "",
  website_notice: "",
  website_create_time: null,
  website_record_no: "",
  social_login_list: [],
  admin_url: "",
  social_url_list: [],
  qq: "",
  github: "",
  gitee: "",
  user_avatar: "",
  tourist_avatar: "",
  is_reward: 1,
  weixin_qr_code: "",
  alipay_qr_code: "",
  is_chat_room: 1,
  websocket_url: "",
  is_music_player: 1,
  is_email_notice: 1,
  is_comment_review: 0,
  is_message_review: 0,
});

const activeName = ref("info");

onMounted(() => {
  getWebsiteConfig();
});

function getWebsiteConfig() {
  getWebsiteConfigApi().then((res) => {
    websiteConfigForm.value = res.data;
  });
}

function updateWebsiteConfig() {
  updateWebsiteConfigApi(websiteConfigForm.value).then((res) => {
    ElMessage.success(res.message);
  });
}

function handleClick(tab) {
  console.log(tab);
}

// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
function beforeUpload(rawFile: UploadRawFile) {
  return rawFile;
}

function onUpload(options: UploadRequestOptions) {
  return uploadFile(options.file, "/website");
}

function handleWebsiteAvatarSuccess(response) {
  websiteConfigForm.value.website_avatar = response.data.file_url;
  updateWebsiteConfig();
}

function handleUserAvatarSuccess(response) {
  websiteConfigForm.value.user_avatar = response.data.file_url;
}

function handleTouristAvatarSuccess(response) {
  websiteConfigForm.value.tourist_avatar = response.data.file_url;
}

function handleWeiXinSuccess(response) {
  websiteConfigForm.value.weixin_qr_code = response.data.file_url;
}

function handleAlipaySuccess(response) {
  websiteConfigForm.value.alipay_qr_code = response.data.file_url;
}
</script>

<style>
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  width: 120px;
  height: 120px;
  font-size: 28px;
  line-height: 120px;
  color: #8c939d;
  text-align: center;
}

.avatar {
  display: block;
  width: 120px;
  height: 120px;
}
</style>
