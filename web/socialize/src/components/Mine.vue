<template>
    <div class="user-info">
        <div class="user-avatar">
            <img class="user-image" :src="userAvatar">

        </div>
        <div class="info">
            <div class="user-name">
                <span class="userName">{{ userName }}</span>
            </div>
            <div class="user-desc">还没有简介</div>
            <div data-v-e99584b8="" data-v-6c6519b2="" class="data-info">
                <div data-v-e99584b8="" class="user-interactions">
                    <div data-v-e99584b8=""><span data-v-e99584b8="" class="count">3</span><span data-v-e99584b8=""
                            class="shows">关注</span></div>
                    <div data-v-e99584b8=""><span data-v-e99584b8="" class="count">2</span><span data-v-e99584b8=""
                            class="shows">粉丝</span></div>
                    <div data-v-e99584b8=""><span data-v-e99584b8="" class="count">0</span><span data-v-e99584b8=""
                            class="shows">获赞与收藏</span></div>
                </div>
            </div>
            <el-button class="el-button" type="primary" @click="dialogFormVisible = true">设置</el-button>
            <el-dialog v-model="dialogFormVisible" title="设置">
                <el-form :model="form">
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="头像" :label-width="formLabelWidth">
                        <div>
                            <!-- 选择文件按钮 -->
                            <input type="file" ref="imageInput" @change="handleFileSelect" style="display: none" />
                            <button class="avatar-button" @click="chooseFile">选择图片</button>
                            <input type="hidden" v-model="user_id" />
                            <!-- 显示文件信息 -->
                            <div>{{ fileInfo }}</div>
                        </div>

                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                        <el-button type="primary" class="confirm" @click="updateImage">
                            确认
                        </el-button>
                    </span>
                </template>
            </el-dialog>
            
        </div>
    </div>
    <div data-v-2e1fc0ab="" data-v-05862639="" class="reds-sticky-box user-page-sticky"
        style="--914909e6: all 0.4s cubic-bezier(0.2, 0, 0.25, 1) 0s;">
        <div data-v-2e1fc0ab="" class="reds-sticky">
            <div data-v-05862639="" data-v-2e1fc0ab-s="" class="tertiary center reds-tabs-list reds-tabs-list"
                style="padding: 0px;">
                <div data-v-05862639="" class="reds-tab-item active sub-tab-list" id=""
                    style="padding: 0px 16px; margin-right: 0px; font-size: 16px;"><!----><!----><span>笔记</span>
                </div>
                <div data-v-05862639="" class="reds-tab-item sub-tab-list" id="user-page-board-guide"
                    style="padding: 0px 16px; margin-right: 0px; font-size: 16px;"><!----><!----><span>收藏</span>
                </div>
                <div data-v-05862639="" class="reds-tab-item sub-tab-list" id=""
                    style="padding: 0px 16px; margin-right: 0px; font-size: 16px;"><!----><!----><span>点赞</span>
                </div>
                <!---->
                <div class="active-tag" style="width: 64px; left: 288px;"></div>
            </div>
        </div>
    </div>
    <div data-v-05862639="" class="divider" style="--914909e6: all 0.4s cubic-bezier(0.2, 0, 0.25, 1) 0s;"></div>

</template>

<script setup>
import axios from 'axios'
import { ref, reactive, onMounted } from 'vue';

const userAvatar = ref('');
const userName = ref('');
const fileInfo = ref('');
const imageInput = ref(null);
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
const formLabelWidth = '140px';
let dialogFormVisible = ref(false);

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
const chooseFile = (event) => {
    //阻止表单默认提交行为   
    event.preventDefault();
    imageInput.value.click();
};

const handleFileSelect = () => {
    fileInfo.value = '已选择文件: ' + imageInput.value.files[0].name;
};

//更新头像和用户名
const updateImage = async () => {
    // 关闭弹窗
    dialogFormVisible.value = false;

    const formData = new FormData();
    formData.append('avatar', imageInput.value.files[0]);
    formData.append('username', form.name);
    const userId = localStorage.getItem('userId'); // 从本地存储获取用户ID
    formData.append('user_id', userId);

    try {
        const response = await axios.post('http://localhost:5500/set/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // 更新用户信息
        userName.value = form.name;
        userAvatar.value = response.data.data.avatar;

    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    Setinit(); // 组件挂载时获取用户信息
});

</script>

<style scoped>
.user-info {
    width: 80%;
    height: 100%;
    display: flex;
    padding: 15px;
    margin: 15px;
    margin-top: 5%;
}

.user-avatar {
    width: calc(33.33333vw - 32px);
    height: 190px;
    text-align: center;

}

.user-image {
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 50%;
    width: 190px;
    height: 190px;
}

.info {
    margin-left: 0px;
}

.user-name {
    display: flex;
    align-items: center;
}

.userName {
    font-size: 23px;
    font-weight: 700
}

.user-desc {
    width: 100%;
    font-size: 14px;
    line-height: 140%;
    color: var(--color-primary-label);
    margin-top: 16px;
    white-space: pre-line;
}

.data-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.el-button{
    background: white;
    color: black;
    border: gray solid 0.5px ;
    margin-top: 20px;
}

.avatar-button{
    background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
    background-image: none;
    color: black;
    border: gray solid 0.5px ;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    width: 100px;
    height: 30px;
}

.user-interactions[data-v-e99584b8] {
    width: 100%;
    display: flex;
    align-items: center;
}


.reds-tabs-list.center {
    justify-content: center;
}

.reds-tabs-list {
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    font-size: 16px;
}

.reds-tabs-list>.reds-tab-item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 40px;
    cursor: pointer;
    color: var(--color-secondary-label);
    white-space: nowrap;
    transition: transform .3s cubic-bezier(.2, 0, .25, 1);
    z-index: 1;
}

.reds-tabs-list>.reds-tab-item.active {
    font-weight: 600;
    color: var(--color-primary-label);
}

.user-interactions>div[data-v-e99584b8] {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-right: 16px;
}

.user-interactions .count[data-v-e99584b8] {
    font-weight: 500;
    font-size: 14px;
    margin-right: 4px;
}

.user-interactions .shows[data-v-e99584b8] {
    color: var(--color-tertiary-label);
    font-size: 14px;
    line-height: 120%;
}



.divider[data-v-05862639] {
    height: 1px;
    background: #DDDFE5;
    width: 88%;
    margin: 0;
}
</style>