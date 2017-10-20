import footer from '../components/footer.vue'
var MyComponent = {
    // 自定义全局插件
    install(Vue) {
        Vue.component('footerCom', footer)
    }
};

export default MyComponent