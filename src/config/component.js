import footer from '../components/footer.vue'
import music from '../components/music.vue'
var MyComponent = {
    // 自定义全局插件
    install(Vue) {
        Vue.component('footerCom', footer);
        Vue.component('music', music);
    }
};

export default MyComponent