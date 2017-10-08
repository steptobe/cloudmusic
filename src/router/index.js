import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = resolve => require(['../pages/index.vue'], resolve)

const routes = [{
        path: '/',
        redirect: '/index'
    },
    { //首页
        path: '/index',
        component: index
    },
]

export default new Router({
    routes
})