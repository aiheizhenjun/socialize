<template>
    <div class="common-layout">
        <el-container>
            <el-aside class="el-aside">
                <el-row class="tac">
                    <el-col :span="12">
                        <el-menu class="el-menu-vertical-demo" :default-active="activeIndex" :collapse="false">
                            <el-sub-menu index="1">
                                <template #title>
                                    <el-icon>
                                        <icon-Menu />
                                    </el-icon>
                                    <span>首页</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/index/recommend" @click="switchToRecommend">
                                        <el-icon>
                                            <Promotion />
                                        </el-icon>
                                        推荐
                                    </el-menu-item>
                                    <el-menu-item index="/index/upload" @click="switchToUpload">
                                        <el-icon>
                                            <CirclePlusFilled />
                                        </el-icon>
                                        发布
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                            <el-menu-item index="2">
                                <el-icon>
                                    <Operation />
                                </el-icon>
                                <span>暂时</span>
                            </el-menu-item>
                            <el-menu-item index="3" @click="switchToMine">
                                <el-icon>
                                    <Avatar />
                                </el-icon>
                                <span>我的</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main style="height: 100%; width: 80%; overflow-x:hidden; overflow:hidden">
                <router-view class="content"></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>

import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}

//渲染头像和用户名
const userName = ref('');
const userAvatar = ref('');

const router = useRouter();




//从本地读取，渲染
const Setinit = async () => {
    try {
        // 读取本地存储的用户信息
        const storedUserInfo = localStorage.getItem('userLoginInfo');

        if (storedUserInfo) {
            const userData = JSON.parse(storedUserInfo);

            if (userData) {
                userName.value = userData.username;
                userAvatar.value = `${userData.avatar}`;
            }
        }

    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    Setinit(); // 组件挂载时获取用户信息
});

// // 根据需要切换的组件，初始值为 Recommend
// const currentComponent = ref(Recommend);



const activeIndex = ref('/index/recommend'); // 默认展开的菜单项

const switchToRecommend = () => {
    router.push({ path: '/index/recommend' });
    activeIndex.value = '/index/recommend'; // 切换时更新默认展开的菜单项
};

const switchToUpload = () => {
    router.push({ path: '/index/upload' });
    activeIndex.value = '/index/upload'; // 切换时更新默认展开的菜单项
};

const switchToMine = () => {
    router.push({ path: '/index/mine' });
    activeIndex.value = '/index/mine'; // 切换时更新默认展开的菜单项
};



const layout = () => {
    // 用户信息是存储在本地存储中
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userLoginInfo');
    // 使用 router 进行页面跳转，跳转到登录页面

    if (router) {
        // 使用 router 进行页面跳转，跳转到登录页面
        router.push('/');
    } else {
        console.error('Router is undefined');
    }
};

// 


</script>

<style scoped>
.el-aside {
    position: sticky;
    top: 0;
    /* 元素会在滚动到视口顶端时固定住 */
    width: 23%;
    height: 830px;
    /* 固定高度 */
    
}

.tac {
    position: absolute;
    top: 10%;
    right: 0%;
    width: 200px;
    height: 100vh;
}

.content {
    width: 100%;
    height: 100vh;
    margin-top: 5%;
    overflow-y: hidden;
    overflow: hidden;
}

#ifr {
    height: 96%;
    width: 100%;
    margin: 0px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
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
    margin: 15px;
    justify-content: space-around;
}

.el-button--text {
    margin-right: 15px;
}

.el-input {
    width: 300px;
    height: 45px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.confirm {
    color: rgba(96, 98, 102)
}

.setting {
    width: 100%;
}

.layout {
    text-align: center;
}

.select-picture {
    color: rgba(96, 98, 102);
    height: 40px;
}
</style>