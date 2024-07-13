<template>
  <div class="show" style="padding: 15px; height: 100%; width: 90%; ">
    <div v-for="item in items" :key="item.post_id" class="card ">

      <div class="container">
        <!-- 头像 -->
        <img :src="item.user.avatar" alt="Avatar" class="head-img">
        <div class="outer">
          <div class="top">
            <div class="username"><b>{{ item.user.username }}</b></div>
            <div class="daytime">{{ item.upTime }}</div>
          </div>
          <p style="margin-top: 5px;">{{ item.content }}</p>
          <div class="middle" style="margin-top: 5px;">
            <div class="index-module-imgs">
              <div class="ImageList__wrapper">
                <div class="index-module__ImageList">
                  <div v-for="(imageSrc, index) in item.images" :key="index" class="imageWrapper">
                    <img :src="imageSrc" alt="" loading="lazy" class="image">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="down">
            <!-- 分享图标 -->
            <div class="index-module__PostActions index-module__PostActions1">
              <svg t="1699632985690" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="21715" width="200" height="200">
                <path
                  d="M738.8751591 953.16515795H148.53109306c-78.24915548 0-141.88583414-63.63667862-141.88583413-141.85950529V220.93525777c0-78.22282671 63.63667862-141.85950533 141.88583413-141.85950532h397.67000147c21.19467369 0 38.38737172 17.19269802 38.38737171 38.38737171s-17.19269802 38.38737172-38.38737171 38.38737171H148.53109306c-35.88613695 0-65.08476193 29.19862498-65.08476195 65.0847619v590.37039489c0 35.88613695 29.19862498 65.08476193 65.08476195 65.08476189h590.34406604c35.88613695 0 65.08476193-29.19862498 65.08476191-65.08476189V504.12769263c0-21.22100244 17.19269802-38.38737172 38.38737169-38.38737169s38.38737172 17.19269802 38.38737172 38.38737169v307.1516312c0.02632879 78.24915548-63.61034981 141.88583414-141.85950532 141.88583412z"
                  fill="#2c2c2c" p-id="21716"></path>
                <path
                  d="M368.56076748 782.15968523c-21.19467369 0-38.38737172-17.19269802-38.38737173-38.38737173v-49.55077743c0-238.30185277 193.85885998-432.16071271 432.13438396-432.16071275h209.78777623c21.19467369 0 38.38737172 17.19269802 38.38737169 38.38737171s-17.19269802 38.38737172-38.38737169 38.38737169h-209.78777623c-195.93883415 0-355.35964055 159.42080636-355.35964053 355.35964054v49.55077748c0 21.24733122-17.19269802 38.41370053-38.3873717 38.41370049z"
                  fill="#2c2c2c" p-id="21717"></path>
                <path
                  d="M979.44128756 334.59663196c-9.05710281 0-18.14053437-3.18578325-25.43360843-9.66266485l-207.78678839-184.30151024c-15.87625868-14.05957233-17.32434196-38.33471417-3.23844084-54.184644 14.05957233-15.84992988 38.33471417-17.32434196 54.18464401-3.23844085l207.7867884 184.30151025c15.87625868 14.05957233 17.32434196 38.33471417 3.23844084 54.184644-7.55636192 8.53052707-18.14053437 12.9011057-28.75103559 12.90110569z"
                  fill="#2c2c2c" p-id="21718"></path>
              </svg>
              <span class="index-module__PostActions__shareText__5fU4c">分享链接</span>
            </div>


            <!-- 评论图标 -->
            <div class="index-module__PostActions index-module__PostActions2" @click="toggleCollapse(item.post_id)">
              <svg t="1699632109799" class="icon comment-icon" viewBox="0 0 1024 1024" version="1.1"
                @mouseenter="hoverCommentIcon(true)" @mouseleave="hoverCommentIcon(false)"
                xmlns="http://www.w3.org/2000/svg" p-id="19717" width="200" height="200">
                <path class="comment-icon-path"
                  d="M901.12 173.056H136.192c-35.84 0-64.512 28.672-64.512 64.512v518.144c0 35.84 28.672 64.512 64.512 64.512h52.224v40.96c0 25.6 20.48 46.08 46.08 46.08h2.048c9.216 0 31.744-2.048 50.176-24.576l57.344-62.464H901.12c35.84 0 64.512-28.672 64.512-64.512V237.568c0-35.84-28.672-64.512-64.512-64.512z m7.168 582.656c0 4.096-3.072 7.168-7.168 7.168H331.776c-8.192 0-15.36 3.072-21.504 9.216L245.76 842.752v-51.2c0-15.36-13.312-28.672-28.672-28.672h-80.896c-4.096 0-7.168-3.072-7.168-7.168V237.568c0-4.096 3.072-7.168 7.168-7.168H901.12c4.096 0 7.168 3.072 7.168 7.168v518.144z"
                  fill="#1E1E1E" p-id="19718"></path>
                <path class="comment-icon-path"
                  d="M238.592 375.808h243.712c14.336 0 26.624-12.288 26.624-26.624s-12.288-26.624-26.624-26.624H238.592c-14.336 0-26.624 12.288-26.624 26.624s12.288 26.624 26.624 26.624zM630.784 440.32H238.592c-14.336 0-26.624 12.288-26.624 26.624 0 14.336 12.288 26.624 26.624 26.624h392.192c14.336 0 26.624-12.288 26.624-26.624 0-14.336-11.264-26.624-26.624-26.624z"
                  fill="#1E1E1E" p-id="19719"></path>
              </svg>
              <span class="index-module__PostActions__num__7TPnr index-module__PostActions__commentNum__DEczd"></span>
            </div>


            <!-- 点赞图标 -->
            <div class="index-module__PostActions index-module__PostActions3" @click="upvotePost(item.post_id, $event)">
              <svg :class="{ 'liked': item.isLiked }" t="1716434846306" class="icon" viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22295" id="mx_n_1716434846307" width="200"
                height="200">
                <path d="M325.450697 862.306736" fill="#bfbfbf" p-id="22296"></path>
                <path d="M882.088359 862.306736" fill="#bfbfbf" p-id="22297"></path>
                <path d="M236.00336 877.09995" fill="#bfbfbf" p-id="22298"></path>
                <path d="M960.182765 877.09995" fill="#bfbfbf" p-id="22299"></path>
                <path d="M63.645221 788.684697" fill="#bfbfbf" p-id="22300"></path>
                <path d="M958.462624 788.684697" fill="#bfbfbf" p-id="22301"></path>
                <path d="M64.84932 858.69444" fill="#bfbfbf" p-id="22302"></path>
                <path d="M959.494709 858.69444" fill="#bfbfbf" p-id="22303"></path>
                <path
                  d="M842.009071 396.492525l-296.036284-295.86427c-18.749538-18.749538-49.196036-18.749538-67.945574 0l-295.86427 296.036284c-26.662187 26.662187-4.472367 73.278011 30.446498 73.278011l146.728036 0 0 420.5745c0 25.974131 20.985721 47.131866 47.131866 47.131866l211.233328 0c25.974131 0 47.131866-20.985721 47.131866-47.131866L664.834537 469.770536 811.906602 469.770536C847.513523 469.770536 867.811188 422.63867 842.009071 396.492525z"
                  fill="#bfbfbf" p-id="22304"></path>
              </svg>
              <span
                class="index-module__PostActions__num__7TPnr index-module__PostActions__voteNum__fnM-9">{{ item.voteNum }}</span>
            </div>


          </div>
        </div>
      </div>


      <!-- 评论的折叠面板 -->


      <div v-if="collapseState[item.post_id]">
        <Comment :post_id="item.post_id" />
      </div>


      <div data-v-05862639="" class="divider" style="--914909e6: all 0.4s cubic-bezier(0.2, 0, 0.25, 1) 0s;"></div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Comment from './Comment.vue';

const userID = localStorage.getItem('userId'); // 使用存储的用户ID

const items = ref([]);
const limit = ref(10); // 每次加载的帖子数量
const collapseState = ref({});

// 切换折叠状态的函数
function toggleCollapse(post_id) {
  collapseState.value[post_id] = !collapseState.value[post_id];
}

// 初始化函数
async function init() {
  try {
    const response = await axios.get('http://localhost:5500/recommend/list', {
      params: {
        limit: limit.value // 限制每次加载的数据量
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: [(data) => {
        const formData = new URLSearchParams();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        return formData;
      }],
      withCredentials: false,
    });

    const data = response.data;

    if (data.code === 0 && Array.isArray(data.data)) {
      const newItems = data.data.sort((a, b) => new Date(b.upTime) - new Date(a.upTime));

      newItems.forEach(item => {
        const isLikedKey = `isLiked_${userID}_${item.post_id}`;
        item.isLiked = localStorage.getItem(isLikedKey) === 'true';
      });

      items.value = [...newItems, ...items.value];
    } else {
      console.log('请求出错或返回的数据格式不正确:', data);
    }

  } catch (error) {
    console.log('请求出错:', error);
  }
}

// 点赞函数
async function upvotePost(post_id, event) {
  try {
    const post = items.value.find(item => item.post_id === post_id);

    if (post) {
      const isLikedKey = `isLiked_${userID}_${post_id}`;
      const isLiked = post.isLiked;

      if (isLiked) {
        const response = await axios.post('http://localhost:5500/recommend/downvote', {
          post_id: post_id,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          transformRequest: [(data) => {
            const formData = new URLSearchParams();
            for (const key in data) {
              formData.append(key, data[key]);
            }
            return formData;
          }],
          withCredentials: false,
        });

        post.isLiked = false;
        post.voteNum = response.data.voteCount;

        localStorage.setItem(isLikedKey, 'false');
      } else {
        const response = await axios.post('http://localhost:5500/recommend/upvote', {
          post_id: post_id,
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          transformRequest: [(data) => {
            const formData = new URLSearchParams();
            for (const key in data) {
              formData.append(key, data[key]);
            }
            return formData;
          }],
          withCredentials: false,
        });

        post.isLiked = true;
        post.voteNum = response.data.voteCount;

        localStorage.setItem(isLikedKey, 'true');
      }

      event.target.classList.toggle('liked');
    }
  } catch (error) {
    console.error('点赞/取消点赞时发生错误：', error.message, error.stack);
  }
}

// 加载更多帖子函数
async function loadMorePosts() {
  limit.value += 10;
  await init();
}

// 组件挂载时调用初始化函数
onMounted(() => {
  init();
});
</script>


<style scoped>
.card {
  margin-bottom: 20px;
}

.liked path {
  fill: #5A9CF8;
  /* 设置为你想要的颜色 */
}

.head-img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin: 10px;
}

.username {
  color: gray;
  font-size: large;
}

.daytime {
  font-size: small;
  color: gray;
}

.container {
  display: flex;
  flex-direction: row;
  width: 100%;
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

.index-module__ImageList {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 230px);
  grid-gap: 4px;
}

.image {
  max-height: 200px;
  max-width: 200px;
  height: 200px;
  width: auto;
  object-fit: cover;
  margin: 10px;
  cursor: pointer;
  display: inline-block;
  margin-right: 10px;
  transition: transform 0.2s;
  vertical-align: middle;
  border-radius: 8%;
}

.down {
  padding: 16px 0 0;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 17px;
  color: #242529;
  box-sizing: border-box;
}

.icon {
  width: 20px;
  height: 20px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  outline: none;
  background-color: transparent;
  margin: 10px;
}



.index-module__PostActions {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.index-module__PostActions1 {
  margin-right: auto;
}

.index-module__PostActions2 {
  margin-right: auto;
}

.index-module__PostActions3 {
  margin-right: 20px;
}

.divider[data-v-05862639] {
  height: 1px;
  background: #DDDFE5;
  width: 100%;
  margin: 20px;
}

.comment-icon-path {
  fill: #1E1E1E;
  /* 默认颜色 */
  transition: fill 0.3s ease;
  /* 添加过渡效果 */
}

.comment-icon:hover .comment-icon-path {
  fill: #5A9CF8;
  /* 悬停时的颜色 */
}
</style>
