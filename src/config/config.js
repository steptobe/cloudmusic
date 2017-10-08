var MyPlugin = {
    // 自定义全局插件
    install(Vue, options) {
        //全局获取数据函数
        Vue.prototype.getData = (url, callback) => {

                Vue.http.get('http://localhost:3000' + url).then(res => {
                    if (res.body.code == 200) {
                        if (typeof callback == 'function')
                            callback(res.body)
                    } else {
                        alert('错误')
                    }

                })
            },
            //响应式
            Vue.prototype.initRem = () => {
                new function() {
                    var _self = this
                    _self.width = 750; // 设置默认最大宽度
                    _self.fontSize = 75; // 默认字体大小
                    _self.changePage = function() {
                        var width = document.documentElement.getBoundingClientRect().width
                        var p = width / _self.width;
                        document
                            .getElementsByTagName('html')[0]
                            .setAttribute('style', 'font-size:' + p * _self.fontSize + 'px !important')
                    }
                    _self.changePage()
                    window.addEventListener('resize', function() {
                        _self.changePage()
                    }, false)
                }
            }
    }
}

export default MyPlugin