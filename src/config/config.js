var MyPlugin = {
    // 自定义全局插件
    install(Vue, options) {
        // 全局获取数据函数
        Vue.prototype.getData = (url, callback, param) => {

                Vue.http.get('http://127.0.0.1:3000' + url, { params: param }).then(res => {
                    if (res.body.code == 200) {
                        if (typeof callback == 'function')
                            callback(res.body)
                    } else {
                        alert('错误')
                    }
                })
            },
            // 响应式
            Vue.prototype.initRem = () => {
                new function() {
                    var _self = this
                    _self.width = 750; // 设置默认最大宽度
                    _self.fontSize = 75; // 默认字体大小
                    _self.changePage = function() {
                        var width = document.documentElement.getBoundingClientRect().width
                        var p = width / _self.width
                        document
                            .getElementsByTagName('html')[0]
                            .setAttribute('style', 'font-size:' + p * _self.fontSize + 'px !important')
                    }
                    _self.changePage()
                    window.addEventListener('resize', function() {
                        _self.changePage()
                    }, false)
                }
            },
            // 图片测试
            Vue.prototype.getImgPath = (path) => {
                let suffix
                if (path == undefined) {
                    return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
                }
                if (path.indexOf('jpeg') !== -1) {
                    suffix = '.jpeg'
                } else {
                    suffix = '.png'
                }
                let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix
                return path
            },
            Vue.prototype.getCookie = (id) => {
                if (document.cookie.length > 0) {
                    let c_start = document.cookie.indexOf(id + '=')
                    if (c_start != -1) {
                        c_start = c_start + id.length + 1
                        let c_end = document.cookie.indexOf(';', c_start)
                        if (c_end == -1) c_end = document.cookie.length
                        return unescape(document.cookie.substring(c_start, c_end))
                    }
                }
                return ''
            },

            Vue.prototype.setCookie = (id, value, expiredays) => {
                var exdate = new Date()
                exdate.setDate(exdate.getDate() + expiredays)
                document.cookie = id + '=' + escape(value) +
                    ((expiredays == null) ? '' : '; expires=' + exdate.toGMTString())
            }
    }
}

export default MyPlugin