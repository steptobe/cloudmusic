// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import MyPlugin from './config/config.js'
import 'mint-ui/lib/style.css'
// import './assets/sass/mixin.scss'
import './assets/sass/style.scss'
import Mint from 'mint-ui';
import './assets/font/iconfont.css';
//import Icon from './components/icon.vue'

// globally (in your main .js file)
//Vue.component('icon', Icon)

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(MyPlugin)
Vue.use(Mint)
    // Vue.use(MyPlugin)

//
//超时设置
Vue.http.interceptors.push((request, next) => {
    let timeout;
    // 如果某个请求设置了_timeout,那么超过该时间，会终端该（abort）请求,并执行请求设置的钩子函数onTimeout方法，不会执行then方法。
    if (request._timeout) {
        timeout = setTimeout(() => {
            if (request.onTimeout) {
                request.onTimeout(request);
                request.abort()

            }
        }, request._timeout);
    }
    next((response) => {
        clearTimeout(timeout);　　　　
        return response;
    })
})



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})