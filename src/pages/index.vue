<template>
    <div class="clound">
        <!-- 头部 -->
        <mt-header title="右侧仅文字">
            <router-link to="/" slot="right">
                <mt-button>
                    <i class="iconfont icon-search_light"></i>
                </mt-button>
            </router-link>
        </mt-header>
        <!-- 音乐、视频、电台 -->
        <div>
            <ul  class="tab">
                <li class="active">
                    <router-link to="">音乐</router-link>
                </li>
                <li>
                    <router-link to="">视频</router-link>
                </li>
                <li>
                    <router-link to="">电台</router-link>
                </li>
            </ul>
        </div>
        <!-- 轮播图 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in banners" :key="item.encodeId">
                <a href="javascript:;">
                    <img :src="item.pic" :alt="item.pic">
                </a>
            </mt-swipe-item>
        </mt-swipe>
        <!-- 私人FM、每日推荐、歌单、排行榜 -->
        <div class="flex sort">
            <router-link to="">私人FM</router-link>
            <router-link to="">每日推荐</router-link>
            <router-link to="">歌单</router-link>
            <router-link to="">排行榜</router-link>
        </div>
        <!-- 推荐歌单 -->
        <div class="recommend">
            <mt-cell
                title="推荐歌单"
                to=""
                is-link
                value="">
                </mt-cell>
            <ul class="clearfix">
                <li v-for="item in recommendSong">
                    <router-link to="">
                        <img :src="item.picUrl" alt="">
                        <p>{{item.name}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 最新音乐 -->
        <div>
            <mt-cell
                title="最新音乐"
                to=""
                is-link
                value="">
                </mt-cell>
            <ul class="clearfix">
                <li v-for="item in recommendSong">
                    <router-link to="">
                        <img :src="item.picUrl" alt="">
                        <p>{{item.name}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 推荐MV -->
        <div></div>
        <!-- 精选专栏 -->
        <div></div>
        <!-- 主播电台 -->
        <div></div>

        
    </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      banners: "",//轮播图
      recommendSong: '',//推荐歌单
    };
  },
  created() {
    this.getbanner();
    this.getRecommendSong();
  },
  methods: {
    callback(res) {
      this.banners = res.banners;
    },
    callback1(res) {
      this.recommendSong = res.result;
      console.log(this.recommendSong)
    },
    getbanner() {
      var self = this;
      self.getData("/banner", this.callback);
      console.log("data" + self.msg);
    },

    //推荐歌单
    getRecommendSong(){
        var self = this;
        self.getData("/personalized", this.callback1);
    }

    //最新歌曲

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// @import '../assets/sass/mixin.scss';
@import "../assets/sass/style.scss";
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
    font-size: 0.373333rem;
    color: $fontc;
    display: inline-block;
    width: 30px;
    vertical-align: middle;
  }
  //选择
  .tab {
    display: flex;
    flex: 1;
    justify-content: space-around;
    @include lh(1rem);
  }
  //轮播图
  .mint-swipe-item a {
    display: block;
    height: 5.6rem;
    width: 100vw;
  }

  .mint-swipe-item img {
    width: 100%;
    height: 5.6rem;
  }

  .mint-swipe {
    height: 4.666667rem;
  }
  .sort {
    @include lh(1.2rem);
    border-bottom: 1px solid $br;
  }
  //头部
  .mint-cell-title {
      text-align: left;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        width: .08rem /* 6/75 */;
        height: .5rem /* 60/75 */;
        background-color: $main;
      }
    }
  //推荐歌单
  .recommend {
    
    ul{
        width: 100vw;
       padding: 0 .266667rem /* 20/75 */;
    }
    li{
        width: calc((100% - 1.066667rem /* 80/75 */)/3);
        float: left;
        img{
            width: 100%;
        }
        &:nth-child(2){
            margin: 0 .266667rem /* 20/75 */;
        }
        &:nth-child(5){
            margin: 0 .266667rem /* 20/75 */;
        }
        p{
            @include text-ell(2);
        }
    }
  }
}
</style>
