<template>
    <div>
        <!-- 显示评论列表 -->
        <div v-for="item in getCommentsForPost(currentPostId)" :key="item.comment_id" class="container">
            <!-- 头像 -->
            <img v-if="item.user" :src="item.user.avatar" alt="Avatar" class="head-img">
            <div class="outer">
                <div class="top">
                    <div class="username" v-if="item.user"><b>{{ item.user.username }}</b></div>
                    <div class="daytime">{{ item.created_at }}</div>
                </div>
                <p style="margin-top: 5px;">{{ item.content }}</p>
            </div>
        </div>

        <!-- 用户输入评论 -->
        <div style="text-align:center;vertical-align:middel;width: 100%;">
            <div class="search">
                <input v-model="newComment" placeholder="你的想法..." type="text">
                <button type="submit" @click="submitComment">发表</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const newComment = ref('');
const items = ref([]);
const currentPostId = ref('');  // 当前帖子的标识

const fetchComments = async () => {
    try {
        const response = await axios.get(`http://localhost:5500/comments/list?post_id=${currentPostId.value}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: false,
        });

        const data = response.data;

        if (data.code === 0 && Array.isArray(data.data)) {
            // 将新内容添加到数组开头
            items.value = [...items.value, ...data.data];
        } else {
            console.log('请求出错或返回的数据格式不正确:', data);
        }
    } catch (error) {
        console.log('请求出错:', error);
    }
};

const getCommentsForPost = (postId) => {
    return items.value.filter(item => item.post_id === postId);
};



onMounted(() => {
    currentPostId.value =66;
    fetchComments();
});
</script>

<style scoped>
.search {
    /* display: inline-block; */
    position: relative;
    margin-top: 20px;
    ;
}

.search input[type="text"] {
    width: 70%;
    padding: 10px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    outline: none;
}

.search button[type="submit"] {
    background-color: #4e99e9;
    border: none;
    color: #fff;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    right: 0;
    transition: .9s ease;
}

.search button[type="submit"]:hover {
    transform: scale(1.1);
    color: rgb(255, 255, 255);
    background-color: blue;
}

.head-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 10px;
}

.username {
    color: gray;
    font-size: small;
}

.daytime {
    font-size: small;
    color: gray;
}

.container {
    display: flex;
    flex-direction: row;
    margin-left: 72px;
}

.outer {
    flex: 1;
    margin-left: 10px;
}

.top {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 10px;
}

</style>