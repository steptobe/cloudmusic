<template>
    <div class="clound">
        <mt-header title="右侧仅文字">
            <router-link to="/" slot="right">
                <mt-button>
                    <i class="iconfont icon-search_light"></i>
                </mt-button>
            </router-link>
        </mt-header>

        </header>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in data" :key="item.encodeId">
                <a href="javascript:;">
                    <img :src="item.pic" :alt="item.pic">
                </a>
            </mt-swipe-item>
        </mt-swipe>

        <div></div>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            data: ''
        }
    },
    created() {
        this.getdata()
    },
    methods: {
        callback(res) {
            this.data = res.banners

        },
        getdata() {
            var self = this
            self.getData('/banner', this.callback)

            console.log('data' + self.msg)
        },


    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/sass/mixin.scss';

.clound {
    header {
        display: flex;
        align-items: center;
        margin: 0 auto;
        @include lh(1rem);
        a {
            @include lh(0.8rem);
        }
    }
    .mint-header {
        background-color: $bc;
        color: $fontc;
    }
    .mint-button {
        @include lh(0.8rem);
    }
    .iconfont {
        font-size: .373333rem /* 28/75 */;
        color: $fontc;
        display: inline-block;
        width: 30px;
        vertical-align: middle;
    }

    .mint-swipe-item a {
        display: block;
        height: 5.6rem/* 420/75 */
        ;
        width: 100vw;
    }

    .mint-swipe-item img {
        width: 100%;
        height: 5.6rem;
    }

    .mint-swipe {
        height: 4.666667rem /* 350/75 */
        ;
    }
}
</style>
