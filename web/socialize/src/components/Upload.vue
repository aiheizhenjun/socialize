<template>
  <div class="show" style="padding: 15px; height: 10%; width: 80%; overflow-y:hidden;">
    <div>
      <textarea v-model="content" class="form-control" id="content" required placeholder="这一刻的想法"></textarea>
    </div>
    <div id="down">
      <input type="file" ref="imageInput" multiple style="display: none">
      <button @click="chooseFile" class="custom-file-upload">选择图片</button>
      <div id="fileInfo">{{ fileInfo }}</div>
      <button @click="uploadImages" class="btn">发布</button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const content = ref('');
const fileInfo = ref('');
const imageInput = ref(null);
const router = useRouter();

const chooseFile = () => {
  imageInput.value.click();
};

const handleFileSelect = () => {
  fileInfo.value = '已选择文件: ' + imageInput.value.files[0].name;
};

const uploadImages = () => {
  const formData = new FormData();
  for (const file of imageInput.value.files) {
    formData.append('images', file);
  }
  formData.append('content', content.value);
  const userId = localStorage.getItem('userId'); // 从本地存储获取用户ID
  formData.append('user_id', userId);
  axios.post('http://localhost:5500/upload/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {

      // console.log(response);
      const PostID = response.data.data.recommendInstance.post_id;
      localStorage.setItem('PostID', PostID);
      router.push({ path: '/index/recommend' })
    })
    .catch(error => {
      console.error(error);
    });
};

onMounted(() => {
  imageInput.value.addEventListener('change', handleFileSelect);
});
</script>

<style scoped>
.form-control {
  width: 97%;
  height: 347px;
  margin: 15px;
  font-size: 20px;
  border: none;
  resize: none;
  outline: none;
}

button {
  width: fit-content;
  min-width: 100px;
  height: 45px;
  padding: 8px;
  border-radius: 5px;
  border: 2.5px solid #E0E1E4;
  box-shadow: 0px 0px 20px -20px;
  cursor: pointer;
  background-color: white;
  transition: all 0.2s ease-in-out 0ms;
  user-select: none;
  font-family: 'Poppins', sans-serif;
}

button:hover {
  background-color: #F2F2F2;
  box-shadow: 0px 0px 20px -18px;
}

button:active {
  transform: scale(0.95);
}

#down {
  display: flex;
}
</style>