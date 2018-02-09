import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

//首页
const index = resolve => require(['../pages/index.vue'], resolve)
const index1 = resolve => require(['../pages/index1.vue'], resolve)
const login = resolve => require(['../pages/login.vue'], resolve)
const account = resolve => require(['../pages/account.vue'], resolve)
const dailyRecommendation = resolve => require(['../pages/dailyRecommendation.vue'], resolve)
const recommendSongList = resolve => require(['../pages/recommendSongList.vue'], resolve)
const myMusic = resolve => require(['../pages/myMusic.vue'], resolve)
const songMenu = resolve => require(['../pages/songMenu.vue'], resolve)
const play = resolve => require(['../pages/play.vue'], resolve);
const search = resolve => require(['../pages/search.vue'], resolve);
const mvDetail = resolve => require(['../pages/mvDetail.vue'], resolve);
const routes = [{
        path: '/',
        redirect: '/index',

    },
    // { //首页
    //     path: '/index',
    //     component: index,
    //     meta: {
    //         keepAlive: false, //此组件需要被缓存
    //     }
    // },
    { //首页
        path: '/index',
        component: index,
        name: 'index',
        meta: {
            keepAlive: true, //此组件需要被缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    { //登陆
        path: '/login',
        component: login
    },
    { //我的
        path: '/user/:id',
        name: 'account',
        component: account,
        meta: {
            keepAlive: true, //此组件需要被缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    { //每日推荐
        path: '/dailyRecommendation',
        component: dailyRecommendation

    },
    //推荐歌单
    {
        path: '/recommendSongList',
        component: recommendSongList
    },
    //我的音乐
    {
        path: '/myMusic',
        component: myMusic
    },
    //歌单
    {
        path: '/songMenu/:id',
        component: songMenu
    },
    //播放
    {
        path: '/play/:id',
        component: play
    },
    //搜索
    {
        path: '/search',
        component: search,
        meta: {
            keepAlive: true, //此组件需要被缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    //mv
    {
        path: '/mvDetail/:id',
        name: mvDetail,
        component: mvDetail,

    },
    {
        path: '/albums/:id',
        name: songMenu,
        component: songMenu,
    }
]

// const scrollBehavior = (to, from, savedPosition) => {
//     if (savedPosition) {
//         // savedPosition is only available for popstate navigations.
//         return savedPosition
//     } else {
//         const position = {}
//             // new navigation.
//             // scroll to anchor by returning the selector
//         if (to.hash) {
//             position.selector = to.hash
//         }
//         // check if any matched route config has meta that requires scrolling to top
//         if (to.matched.some(m => m.meta.scrollToTop)) {
//             // cords will be used if no selector is provided,
//             // or if the selector didn't match any element.
//             position.x = 0
//             position.y = 0
//         }
//         // if the returned position is falsy or an empty object,
//         // will retain current scroll position.
//         return position
//     }
// }
export default new Router({
    // mode: 'hash',

    routes,
    mode: 'history',
    //滚动
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {

            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
    // strict: process.env.NODE_ENV !== 'production',
    // scrollBehavior(to, from, savedPosition) {
    //     if (savedPosition) {
    //         alert(savedPosition)
    //         return savedPosition
    //     } else {
    //         if (from.meta.keepAlive) {
    //             from.meta.savedPosition = document.body.scrollTop;
    //         }
    //         alert(to.meta.savedPosition)
    //         return { x: 0, y: to.meta.savedPosition || 0 }
    //     }
    // }
    // scrollBehavior(to, from, savedPosition) {
    //     return new Promise((resolve, reject) => {
    //             setTimeout(() => {
    //                 resolve(savedPosition)
    //             }, 500)
    //         })
    // if (savedPosition) {
    //     return savedPosition
    // } else {
    //     return { x: 0, y: 0 }
    // }
    // }
})