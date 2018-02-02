<template>
    <div class="clound">
        <!-- 头部 -->
        <header>
            <router-link to="/search">
               
                    <i class="iconfont icon-search_light"></i>
               
            </router-link>
        </header>
        <!-- 音乐、视频、电台 -->
        <div class="header">
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
        <main v-if="!showLoading">
            <!-- 轮播图 -->
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in banners" :key="item.encodeId">
                    <a href="javascript:;">
                        <img v-lazy="getImgPath(item.pic)" :alt="item.pic">
                    </a>
                </mt-swipe-item>
            </mt-swipe>
            <!-- 私人FM、每日推荐、歌单、排行榜 -->
            <div class="flex sort">
                <router-link to="/user">私人FM</router-link>
                <router-link to="/dailyRecommendation">每日推荐</router-link>
                <router-link to="/recommendSongList">歌单</router-link>
                <router-link to="">排行榜</router-link>
            </div>
            <!-- 推荐歌单 -->
            <div class="recommend">
                <mt-cell
                    title="推荐歌单"
                    to="/recommendSongList"
                    is-link
                    value="">
                    </mt-cell>
                <ul class="clearfix">
                    <li v-for="item in recommendSong.slice(0,6)">
                        <router-link to="">
                            <img v-lazy="item.picUrl" alt="">
                            <p>{{item.name}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- 独家放送 -->
            <div class="recommend recommend-pri">
                <mt-cell
                    title="独家放送"
                    to=""
                    is-link
                    value="">
                    </mt-cell>
                <div class="item">
                    <router-link to="" v-for="item in privatecontent.slice(1,3)">
                        <img v-lazy="item.picUrl" alt="">
                        <p>{{item.name}}</p>
                    </router-link>
                </div>
                <router-link to="" class="item-b" v-for="item in privatecontent.slice(0,1)">
                    <img v-lazy="item.picUrl" alt="">
                        <p>{{item.name}}</p>
                </router-link>
                
            </div>
            <!-- 最新音乐 -->
            <div class="recommend recommend-song">
                <mt-cell
                    title="最新音乐"
                    to=""
                    is-link
                    value="">
                    </mt-cell>
                <ul class="clearfix">
                    <li v-for="item in newSong">
                        <router-link :to="'/play/' + item.id">
                            <img v-lazy="getImgPath(item.song.album.picUrl)" alt="">
                            <h5>{{item.name}}</h5>
                            <p>{{item.song.artists[0].name}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- 推荐MV -->
            <div class="recommend recommend-mv">
                <mt-cell
                    title="推荐MV"
                    to=""
                    is-link
                    value="">
                    </mt-cell>
                <div class="item">
                    <router-link to="/user" v-for="item in recommendMV">
                        <img v-lazy="item.picUrl" alt="">
                        <h5>{{item.name}}</h5>
                        <p>{{item.artistName}}</p>
                    </router-link>
                </div>
            </div>
            <!-- 精选专栏 -->
            <!-- <div>
            </div> -->
            <!-- 主播电台 -->
            <div class="recommend recommend-col">
            <mt-cell
                    title="主播电台"
                    to=""
                    is-link
                    value="">
                    </mt-cell> 
                <ul class="clearfix">
                    <li v-for="item in column">
                        <router-link to="">
                            <img v-lazy="item.picUrl" alt="">
                            <p>{{item.name}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </main>
        <loading v-if="showLoading"></loading>
    </div>
</template>

<script>
import { Lazyload } from 'mint-ui';
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      banners: "", //轮播图
      recommendSong: "", //推荐歌单
      showLoading:true,
      newSong: "", //最新音乐
      privatecontent: "", //独家放送
      recommendMV:"",//推荐MV
      column:"",//专栏
      isFirstEnter:false
    };
  },
  created() {
     
    this.isFirstEnter=true;
    console.log('index')
    
    // if(this.getCookie("Hm_lvt_922f54e4a07a9c9fb447fe59cefe7486")){
        //  this.getRecommendMusic();
    // }
  },
  activated() {
    console.log("我是index activated 方法");
    if(!this.$route.meta.isBack || this.isFirstEnter){
       console.log('index加载')
        this.getbanner();
        this.getRecommendSong();
        this.getNewSong();
        this.getPrivate();
        this.getMV();
        this.getColumn();
       
    }
   
            
      
    this.$route.meta.isBack=false
    this.isFirstEnter=false;
  },
  beforeRouteEnter(to, from, next){
      console.log('我是index beforeRouteEnter方法')
      if(from.name=='account'){
        to.meta.isBack=true;
       
    }
      next()
  },
  methods: {
    callback(res) {
      this.banners = res.banners;
    },
    callback1(res) {
      this.recommendSong = res.result;
       this.showLoading = false;
    },
    callback2(res) {
      this.newSong = res.result.slice(0, 6);
    },
    callback3(res) {
      this.privatecontent = res.result;
    },
    callback4(res) {
      this.recommendMV = res.result;
      console.log(this.recommendMV);
    },
    callback5(res) {
      this.column = res.result;
      console.log(this.column);
      
    },
    
    getbanner() {
      var self = this;
      self.getData("/banner", this.callback);
      console.log("data" + self.msg);
    },
    

    //推荐歌单
    getRecommendSong() {
      var self = this;
      self.getData("/personalized", this.callback1);
     
    },

    //最新歌曲
    getNewSong() {
      var self = this;
      self.getData("/personalized/newsong", this.callback2);
    },

    //独家放送

    getPrivate() {
      var self = this;
      self.getData("/personalized/privatecontent", this.callback3);
    },

    //推荐MV

    getMV(){
        var self = this;
        self.getData("/personalized/mv", this.callback4);
    },

    //推荐节目
    getColumn(){
        var self = this;
        self.getData("/personalized/djprogram", this.callback5);
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
// @import '../assets/sass/mixin.scss';
// @import "../assets/sass/style.scss";
.clound {
    main{
        margin: 0 0 0;
    }
  .header{
    //   position: fixed;
    //   top: 0;
      width: 100vw;
      background-color:#fff;
      z-index: 101;
      

  }
  header {
    display: flex;
    align-items: center;
    margin: 0 auto;
    @include lh(1.5rem);
    background-color: $main;
    justify-content: center;
    a {
      @include lh(0.8rem);
          width: 80%;
        border: 1px solid #fff;
        background-color: #fff;
        border-radius: .533333rem /* 40/75 */;
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
  .mint-cell{
      min-height: .7rem /* 70/100 */;
      height: 50px;
      .mint-cell-wrapper{
        height: 50px;
        align-content: center;
        align-items: baseline;
      }
  }
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
      width: 0.08rem;
      height: 0.5rem;
      background-color: $main;
    }
    .mint-cell-text{
         font-size: .373333rem /* 28/75 */;
    }
  }
  .mint-cell-allow-right::after {
    left: 1.8rem /* 150/75 */;
    border: solid 1px #999;
    width: 0.226667rem;
    height: 0.226667rem;
    border-bottom-width: 0;
    border-left-width: 0;
  }
  //独家放送
  .recommend-pri {
    
    .item {
      display: flex;
      padding: 0 ;
      margin-bottom: .266667rem /* 20/75 */;
      a {
        font-size: 0.32rem;
        width: calc((100% - .133333rem /* 10/75 */)/2);
        &:first-child {
          margin-right: .133333rem /* 10/75 */;
        }
        p {
          line-height: 0.5rem;
          margin-top: 0.133333rem;
          padding: 0 .133333rem /* 10/75 */;
          text-align: left;
        }
      }
      img {
        width: 100%;
       
      }
    }
    .item-b {
      width: 100%;
    }
  }

  //推荐歌单
  .recommend {
    &.recommend-col{
        padding-bottom: .4rem /* 30/75 */;
        border-bottom: 1px solid $br;
    }
    &.recommend-song {
      h5 {
        @include lh(0.6rem);
      }
      p {
        @include lh(0.3rem);
        min-height: 0.3rem;
      }
    }
    ul {
      width: 100vw;
      padding: 0 ;
    }
    li {
      width: calc((100% - .266667rem /* 20/75 */)/3);
      float: left;
      margin-bottom: 0.266667rem;
      img {
        width: 100%;
        height: 2.666667rem;
      }
      &:nth-child(2) {
        margin: 0 .133333rem  .133333rem ;
      }
      &:nth-child(5) {
        margin: 0 .133333rem  .133333rem ;
      }
      p {
        font-size: 0.346667rem;
        padding: 0 .133333rem /* 10/75 */;
        min-height: .906667rem /* 68/75 */;
        @include text-ell(2);
      }
    }
  }

  //推荐MV
  .recommend-mv{
     
      .item{
          display: flex;
          flex-wrap: wrap ;
           padding: 0 ;
          h5{
             @include text-ell(1);
             margin-top: .093333rem /* 7/75 */; 
          }
          a{
               width: calc((100% - .133333rem /* 10/75 */)/2);
               margin-bottom: .2rem /* 15/75 */;
               &:nth-child(2n){
                   margin-left: .133333rem /* 10/75 */;
               }
          }
      }
  }
}
</style>
