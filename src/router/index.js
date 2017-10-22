import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = resolve => require(['../pages/index.vue'], resolve)
const login = resolve => require(['../pages/login.vue'], resolve)
const account = resolve => require(['../pages/account.vue'], resolve)

const routes = [{
        path: '/',
        redirect: '/index'
    },
    { //首页
        path: '/index',
        component: index
    },
    { //登陆
        path: '/login',
        component: login
    },
    { //我的
        path: '/user',
        component: account
    }
]

export default new Router({
    routes
})