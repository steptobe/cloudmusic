<template>
  <div class="avatar">
      <header   :style="{backgroundImage:'url(' + data.profile.backgroundUrl + ')'}">
          <span :style="{backgroundImage:'url(' + data.profile.avatarUrl + ')'}" class="avatar-img"></span>         
          <h5>{{data.profile.nickname}}</h5>
          <p><a href="">关注<span>{{data.profile.follows}}</span></a><a href="">粉丝<span>{{data.profile.followeds}}</span></a></p>
      </header>
      <div>
         <mt-navbar v-model="selected">
          <mt-tab-item id="1">音乐</mt-tab-item>
          <mt-tab-item id="2">动态<span>{{data.profile.eventCount}}</span></mt-tab-item>
          <mt-tab-item id="3">关于我</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
              <p>歌单</p>
               <div  class="music-item">
                <img  :src="playlist[0].coverImgUrl">
                <p>
                  <span @click="goBack">听歌排行</span>
                  <span>{{data.listenSongs}}</span>
                </p>
               </div>
               <template v-for=" item  in playlist">
                <div  class="music-item" v-if="item.ordered == false">
                  <img  :src="item.coverImgUrl">
                  <p>
                    <span>{{item.name}}</span>
                    <span>{{item.trackCount}}首，播放{{item.playCount}}</span>
                  </p>
               </div>
               </template>
                <p>收藏的歌单</p>
                <template v-for=" item  in playlist">
                <router-link to="/index" class="music-item"  v-if="item.ordered">
                  <img  :src="item.coverImgUrl">
                  <p>
                    <span>{{item.name}}</span>
                    <span>{{item.trackCount}}首，播放{{item.playCount}}</span>
                  </p>
               </router-link>
               </template>

            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell title="标题文字" icon="more" value="带 icon" ></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
             
            </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <footerCom active="4"></footerCom>       

  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: "",
      data: {},
      selected:"1",
      playlist:[],
      events:[],
      isFirstEnter:false,
    };
  },
  created() {
      this.isFirstEnter=true;
   
      console.log('user')
    
  },
  activated() {
    console.log("我是user activated 方法");
    if(!this.$route.meta.isBack || this.isFirstEnter){
       
        this.userId = this.getCookie("userId");
        if (this.userId == null || this.userId == "") {
          this.$router.push("/login");
        } else {
          this.getdata(this.userId);
          this.getSongList(this.userId);
          this.getEvent(this.userId);
            console.log('user加载')
        }
    }
    this.$route.meta.isBack=false
    this.isFirstEnter=false;
  },
  beforeRouteEnter(to, from, next){
      console.log('我是user的beforeRouteEnter方法')
      if(from.name=='index'){
        to.meta.isBack=true;
        
    }
      next()
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    callback(res) {
      this.data = res;
      console.log(this.data.profile.avatarUrl);
    },
    callback1(res) {
      this.playlist = res.playlist
      console.log(this.profile);
    },
    callback2(res) {
      this.events = res.events
      console.log(this.events);
    },
    getdata(id) {
      var self = this;
      self.getData("/user/detail", this.callback, { uid: id });
    },
    //获取用户歌单
    getSongList(id){
        var self = this;
      self.getData("/user/playlist", this.callback1, { uid: id });
    },
    //获取用户动态
    getEvent(id){
        var self = this;
      self.getData("/user/event", this.callback2, { uid: id });
    },
  }
};
</script>
<style lang="scss">
.avatar {
  header {
    height: 5.333333rem;
    padding: 0.266667rem 0.266667rem;
    border-bottom: 1px solid $br;
    background-color: rgba(0, 0, 0, 0.4);
    background-position: center center;
    background-size: 100% 100%;
   
    h5 {
      height: 1rem;
      line-height: 1rem;
      font-size: .533333rem /* 40/75 */;
      color: #fff;
    }
    p{
        display: flex;
        flex-direction: row;
        justify-content: center;
        a{
            color:#fff;
            height: .4rem /* 30/75 */;
            line-height: .4rem /* 30/75 */;
            &:first-child{
                padding-right: .133333rem /* 10/75 */;
                border-right:1px solid #fff;
            }
            &:nth-child(2){
                padding-left: .133333rem /* 10/75 */;

            }

        }
        span{
            margin-left: .133333rem /* 10/75 */;
        }
    }
  }
  .mint-cell-wrapper{
    text-align: left;
  }
   .music-item{
     display: flex;
     align-items:center;
     height: 1.2rem /* 75/75 */;
     span{
       display: block;
     }
      img{
        width: .8rem /* 48/100 */;
        height: .8rem;
      }
    }
}
.avatar-img {
  height: 2rem;
  width: 2rem;
  display: inline-block;
  background-position: center center;
  background-size: 100% 100%;
  border-radius: 100%;
}
</style>


