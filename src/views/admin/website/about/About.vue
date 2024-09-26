<template>
  <div class="app-container">
    <el-card class="main-card">
      <div class="table-title">{{ route.meta.title }}</div>
      <!--    <mavon-editor-->
      <!--      ref="mdRef"-->
      <!--      @imgAdd="uploadImg"-->
      <!--      v-model="aboutContent"-->
      <!--      style="height: calc(100vh - 250px); margin-top: 2.25rem"-->
      <!--    />-->
      <MdEditor
        ref="mdRef"
        v-model="aboutContent"
        :auto-detect-code="true"
        placeholder="快编辑你的个人信息吧~"
        style="height: calc(100vh - 250px); margin-top: 2.25rem"
        @onUploadImg="onUploadImg"
      />
      <el-button
        class="edit-btn"
        size="default"
        type="danger"
        @click="updateAbout"
      >
        修改
      </el-button>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElNotification } from "element-plus";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { uploadFileApi } from "@/api/file";
import { getAboutMeApi, updateAboutMeApi } from "@/api/website";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const mdRef = ref(null);
const aboutContent = ref("");

const getAbout = () => {
  getAboutMeApi().then((res) => {
    aboutContent.value = res.data.content;
  });
};

const onUploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const data = {
          label: "about",
          file: file,
          file_size: file.size,
          file_md5: "",
        };
        uploadFileApi(data)
          .then((res) => rev(res))
          .catch((error) => rej(error));
      });
    })
  );

  callback(res.map((item) => item.data.file_url));

  // const formdata = new FormData()
  // if (file.size / 1024 < 200) {
  //   formdata.append("file", file)
  //   axios.post("/api/admin/articles/images", formdata).then(({ data }) => {
  //     mdRef.value.img2Url(pos, data.data)
  //   })
  // } else {
  //   imageConversion.compressAccurately(file, 200).then((res) => {
  //     formdata.append("file", new window.File([res], file.name, { type: file.type }))
  //     axios.post("/api/admin/articles/images", formdata).then(({ data }) => {
  //       mdRef.value.img2Url(pos, data.data)
  //     })
  //   })
  // }
};

const updateAbout = () => {
  const data = {
    content: aboutContent.value,
  };
  updateAboutMeApi(data).then((res) => {
    ElNotification.success({
      title: "成功",
      message: res.message,
    });
  });
};

onMounted(() => {
  getAbout();
});
</script>

<style scoped>
.edit-btn {
  float: right;
  margin: 1rem 0;
}
</style>
