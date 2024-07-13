import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Login from '../views/Auth/Login.vue';
import { useUserStore } from '../store/userStore'

const routes = [
    {
        path: "/",
        name: "login",
        component: Login
    },
    {
        path: '/index', redirect: '/index/recommend',
        name: "index",
        meta: { requiresAuth: true, random: Math.random() }, // 需要登录才能访问的页面
        component: () => import("../views/Index.vue"),
        children: [
            {
                path: 'recommend',
                name: 'recommend',
                component: () => import("../components/Recommend.vue")
            },
            {
                path: 'upload',
                name: 'upload',
                component: () => import("../components/Upload.vue")
            },
            {
                path: 'mine',
                name: 'mine',
                component: () => import("../components/Mine.vue")
            }
        ]
    },
];


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


// 定义全局路由守卫

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    // console.log(to); // to 将要访问的页面
    // console.log(from); // from 代表从哪个页面跳转过来
    // console.log(next); // 下一步要做什么
    // 获取pinia数据的操作一定要放在路由守卫的函数里面，不能定义在外部

    // console.log(userStore.userInfo);
    // 如果前往的不是登录页，且状态管理中没有登录人的信息，那么就去登录页，否则直接放行
    if (to.path != '/' && userStore.userInfo == null) {
        next({ path: '/' })
    } else {
        next()
        // console.log('Conditions passed, allowing navigation');
        if (localStorage.getItem('userInfo')) {
            localStorage.removeItem('userInfo');
        } else {
            // console.log(123);
        }
    }
})

export default router;