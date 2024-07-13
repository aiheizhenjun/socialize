<template>
  <div class="container" :class="{ 'sign-up-mode': signUpMode }">
    <div class="forms-container">
      <div class="signin-signup">
        <form @submit.prevent="login" class="sign-in-form">
          <h2 class="title">登录</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input v-model="loginData.username" type="text" placeholder="账号" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input v-model="loginData.password" type="password" placeholder="密码" />
          </div>
          <button type="submit" class="btn solid" id="sign-in-login">立即登录</button>
        </form>
        <form @submit.prevent="register" class="sign-up-form">
          <h2 class="title">注册</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input v-model="registerData.username" type="text" placeholder="账号" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input v-model="registerData.password" type="password" placeholder="密码" />
          </div>
          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input v-model="registerData.email" type="email" placeholder="邮箱" />
          </div>
          <button type="submit" class="btn" id="sign-up-register">立即注册</button>
        </form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>加入我们</h3>
          <p></p>
          <button class="btn transparent" @click="switchToSignUp">去注册</button>
        </div>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>已有帐号？</h3>
          <p>立即登录已有帐号。</p>
          <button class="btn transparent" @click="switchToSignIn">去登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import "https://kit.fontawesome.com/64d58efce2.js";
import { useUserStore } from '../../store/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 创建一个路由的管理员
const router = useRouter();
const signUpMode = ref(false);
const userStore = useUserStore();


const loginData = ref({
  username: '',
  password: ''
});

const registerData = ref({
  username: '',
  password: '',
  email: ''
});

const switchToSignUp = () => {
  signUpMode.value = true;
};

const switchToSignIn = () => {
  signUpMode.value = false;
};

const login = async () => {
  try {
 

    const response = await axios.post('http://localhost:5500/login/login', {
      account: loginData.value.username,
      password: loginData.value.password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // 设置请求头
      },
      transformRequest: [(data) => {
        // 将请求数据转为 URLSearchParams 格式
        const formData = new URLSearchParams();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        return formData;
      }],
      withCredentials: false, // 禁止携带 Cookie
    });

    if (response.data.code === 0) {
      const userData = response.data.userData;
      // console.log(userData);
      localStorage.setItem('userLoginInfo', JSON.stringify(userData));

      const userId = response.data.userData.user_id
      localStorage.setItem('userId', userId);

      userStore.$patch({
        userInfo: loginData.value
      });

      localStorage.setItem('userInfo', JSON.stringify(loginData.value));
      //跳转到index
      setTimeout(() => {
        alert(response.data.msg);
        router.push({ path: '/index' });
      }, 100);
    } else {
      alert(response.data.msg);
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
};

const register = async () => {
  try {
    const response = await axios.post('http://localhost:5500/login/register', {
      account: registerData.value.username,
      password: registerData.value.password,
      email: registerData.value.email
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // 设置请求头
      },
      transformRequest: [(data) => {
        // 将请求数据转为 URLSearchParams 格式
        const formData = new URLSearchParams();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        return formData;
      }],
      withCredentials: false, // 禁止携带 Cookie
    });

    if (response.data.code === 0) {
      alert(response.data.msg);
      signUpMode.value = false;
    } else {
      alert(response.data.msg);
    }
  } catch (error) {
    console.error('An error occurred during registration:', error);
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

iframe {
  width: 100%;
  height: 90vh;
}

body,
input {
  font-family: "Poppins", sans-serif;
}

.container {
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  width: 295px;
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: rgba(85, 180, 124);
  border-color: rgba(85, 180, 124);
}

.btn {
  width: 150px;
  background-color: rgba(85, 180, 124);
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

#sign-up-register {
  background-color: rgba(95, 183, 200);
}

.btn:hover {
  background-color: rgba(85, 180, 124);
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, rgba(85, 180, 124) 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }

  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }

  .panel .content {
    padding: 0.5rem 1rem;
  }

  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}
</style>