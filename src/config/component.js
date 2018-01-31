import loading from '../components/common/loading'
import music from '../components/music.vue'
var MyComponent = {
    // 自定义全局插件
    install(Vue) {
        Vue.component('loading', loading);
        Vue.component('music', music);
    }
};

export default MyComponent