<template>
  <div class="avatar">
      <header   :style="{backgroundImage:'url(' + data.profile.backgroundUrl + ')'}">
          <span :style="{backgroundImage:'url(' + data.profile.avatarUrl + ')'}" class="avatar-img"></span>         
          <h5>{{data.profile.nickname}}</h5>
          <p><a href="">关注<span>{{data.profile.follows}}</span></a><a href="">粉丝<span>{{data.profile.followeds}}</span></a></p>
      </header>
      <div>
         <mt-navbar v-model="selected">
          <mt-tab-item id="1">音乐 <span>{{playlist.length}}</span></mt-tab-item>
          <mt-tab-item id="2">动态<span>{{events.length}}</span></mt-tab-item>
          <mt-tab-item id="3">关于我</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1" class="music-box">
               <h5>歌单</h5>
               <div  class="music-item">
                <img  src="../assets/images/01.png">
                <p>
                  <span @click="goBack">听歌排行</span>
                  <span>{{data.listenSongs}}</span>
                </p>
               </div>
               <template v-for=" item  in playlist">
                <router-link :to="'/songMenu/'+ item.id"  class="music-item" v-if="item.ordered == false">
                  <img  :src="item.coverImgUrl">
                  <p>
                    <span>{{item.name}}</span>
                    <span>{{item.trackCount}}首，播放{{item.playCount}}</span>
                  </p>
               </router-link>
               </template>
                <h5>收藏的歌单</h5>
                <template v-for=" item  in playlist">
                <router-link :to="'/songMenu/'+ item.id" class="music-item"  v-if="item.ordered">
                  <img  :src="item.coverImgUrl">
                  <p>
                    <span>{{item.name}}</span>
                    <span>{{item.trackCount}}首，播放{{item.playCount}}</span>
                  </p>
               </router-link>
               </template>

            </mt-tab-container-item>
            <mt-tab-container-item id="2" class="music-box2">
                 <ul>
                     <li v-for="item in events" :key="item.info.id">
                       <div class="item-l">
                            <img :src="data.profile.avatarUrl" alt="">
                       </div>
                       <div class="item-r">
                           <h3><span>{{data.profile.nickname}}</span>分享单曲</h3>
                           <h4>{{item.info.time}}</h4>
                           <h5>{{item.info.msg}}</h5>
                           <div class="item-b"   @click="audioFun">
                              <div class="item-info">
                                  <p class="cover-img" :style="{backgroundImage:'url(' + item.info.bgSrc + ')'}">
                                    <music :id="item.info.id" v-if="item.info.type == 18"></music>
                                  </p>
                                  
                                  <p>
                                    <span>{{item.info.name}}</span>
                                    <span><small>{{item.info.actName}}</small></span>
                                  </p>
                              </div>
                           </div>
                       </div>
                     </li>
                 </ul>
            </mt-tab-container-item>
            <mt-tab-container-item  id="3" class="music-box3">
               <section>
                 <h5>个人信息</h5>
                
                   <p><span>等级:</span><span class="small"><i>Lv.8</i></span></p>
                   <p><span>性别:</span><span>{{gender}}</span></p>
                    <p><span>年龄:</span><span>{{age}}{{Astro}}</span></p>
                    <p>
                      <span>社交账号:</span>
                      <a :href="item.url" v-for="item in data.bindings" v-if="item.url != '' " >
                        <i class="iconfont icon-weibo" v-if="item.url.indexOf('weibo') != -1"></i>
                        <i class="iconfont icon-douban" v-if="item.url.indexOf('douban') != -1"></i>
                      </a>
                    </p>
              
               </section>
               <section>
                  <h5>个人简介</h5>
                  <p>{{data.profile.signature}}</p>
               </section>
            </mt-tab-container-item>
        </mt-tab-container>
      </div>
    

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
      Astro:"",
      age:"",
      gender:"",
    };
  },
  created() {
      this.isFirstEnter=true;
      this.$store.commit("hideTabber");
      console.log('user')
    
    
  },
  
  activated() {
    console.log("我是user activated 方法");
    if(!this.$route.meta.isBack || this.isFirstEnter){
        if(this.$route.params.id == 0){
           this.userId = this.getCookie("userId");
          if (this.userId == null || this.userId == "") {
            this.$router.push("/login");
          } 
        }else{
          this.userId = this.$route.params.id;
        }
       
        if(this.userId){
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
      var xingz = new Date(this.data.profile.birthday);         
      this.age = new Date().getFullYear() - xingz.getFullYear();
      var m = xingz.getMonth();
      var d = xingz.getDate();
      this.Astro = this.getAstro(m,d);
      this.gender = this.data.profile.gender == 1?"男":"女";
      console.log(this.gender)
      
    },
    callback1(res) {
      this.playlist = res.playlist
      console.log(this.profile);

    },
    callback2(res) {
      this.events = [];
      var j = -1;
      for(var i = 0;i <  res.events.length;i++){
        if(res.events[i].type == 18 || res.events[i].type == 13){
           j++;
           this.events[j] = [];
           this.events[j].info = {};
         
           this.events[j].info.type = res.events[i].type;
           if(res.events[j].type == 18){
             this.events[j].info.id = JSON.parse(res.events[i].json).song.id;
             this.events[j].info.bgSrc = JSON.parse(res.events[i].json).song.album.img80x80;
             this.events[j].info.actName = JSON.parse(res.events[i].json).song.album.artist.name;
             this.events[j].info.name = JSON.parse(res.events[i].json).song.name;
           } else if(res.events[i].type == 13){
             this.events[j].info.id = JSON.parse(res.events[i].json).playlist.id;
             this.events[j].info.bgSrc = JSON.parse(res.events[i].json).playlist.img80x80;
             this.events[j].info.actName = JSON.parse(res.events[i].json).playlist.creator.nickname;
             this.events[j].info.name = JSON.parse(res.events[i].json).playlist.name;
           }
          //  this.store.commit('setmusicData',{title,})
           this.events[j].info.msg = JSON.parse(res.events[i].json).msg;
           this.events[j].info.time =  new Date(res.events[i].showTime).toLocaleString();
           
          //  console.log(this.events[i].info.type)
        }

      }
       
      // console.log(this.events.length);

    },
    audioFun(e){
        this.$nextTick(()=>{
          let matches = document.querySelectorAll('audio');
          for(var i = 0; i < matches.length;i++){
              matches[i].pause();
          }
          e.target.getElementsByTagName('audio')[0].play();

        })
//getElementsByClassName
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
  //tab
  .mint-navbar .mint-tab-item {
    font-size: .4rem /* 30/75 */;
    &.is-selected{
      border-bottom: none;
      position: relative;
      color: $main;
      margin-bottom: 0;
      &::before{
        content: "";
        width: 50%;
        left: 25%;
        height: 2px;
        position: absolute;
        bottom: 0;
        background:$main;

    }
    }
    
  }

  // 音乐
  .music-box{
      h5{
        border-top: 1px solid $br;
        height: .666667rem /* 50/75 */;
        display: flex;
        align-items: center;
        background: #eeeff1;
        text-align: left;
        padding-left: .4rem /* 40/75 */;
        font-size: .373333rem /* 28/75 */;
      }
  }
  .music-item{
     display: flex;
     align-items:center;
     height: 1.466667rem  /* 75/75 */;
     padding: 0.1rem;
     span{
       display: block;
       &:nth-child(1){
          font-size: .426667rem /* 32/75 */;
          margin-bottom: .133333rem /* 10/75 */;
       }
       &:nth-child(2){
          font-size: .32rem /* 24/75 */;
          color:#999;
       }
     }
     img{
        width: 1.466667rem /* 110/75 */;
        height: 1.466667rem /* 110/75 */;
        margin-right: .333333rem /* 25/75 */;
     }
     p{
        flex:1;
        text-align: left;
      }
     }
  }

  //音乐 end

  //动态
  .music-box2{
     li{
       display: flex;
       padding: .533333rem /* 40/75 */ .266667rem /* 20/75 */;
       border-top:1px solid $br;

     }
     .item-l{
        width: 1.066667rem /* 80/75 */;
        height: 1.066667rem /* 80/75 */;
        margin-right: .266667rem;
        img{
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
     }
     .item-r{
       flex:1;
       text-align: left;
       h3{
         font-size: .4rem /* 32/75 */;
         span{
            color: #658196;
            margin-right: .15rem /* 6/75 */;
         }

       }
       h4{
         font-size: 10px;
       }
       h5{
         margin-top: .4rem /* 35/75 */;
         line-height: .6rem /* 50/75 */;
         font-size: .373333rem /* 28/75 */;
       }
       .item-b{
         display: flex;
         align-items: center;
         height: 1.546667rem /* 116/75 */;
         background: #f1f2f4;
         padding-left: .2rem /* 15/75 */;
         .item-info{
           display: flex;
           height: 1.066667rem /* 80/75 */;
         }
         span{
           font-size: .4rem /* 30/75 */;
           display: block;
           &:nth-child(2){
             margin-top: .1rem /* 10/75 */;
             font-size: 10px;
             transform: scale(.9);
           }
           small{
             font-size: 80%;
           }
         }
         
       }
       .cover-img{
         display: inline-block;
         width:1.066667rem /* 60/75 */;
         height: 1.066667rem;
         background-size: 100% 100%;
         margin-right: .266667rem /* 20/75 */;
       }
     }
  }

  //动态 end

  .music-box3{
    text-align: left;
    padding:.266667rem /* 20/75 */ 0;
    h5{
      border-left:2px solid $main;
      padding-left:.24rem /* 18/75 */;
      margin: .266667rem /* 20/75 */ 0;
    }
    p{
      padding: 0 .266667rem /* 20/75 */;
     
      height: .666667rem /* 50/75 */;
      line-height: .666667rem /* 50/75 */;
      font-size: .32rem /* 24/75 */;
      a{
        display: inline-block;
        width: .666667rem /* 50/75 */;
        .icon-weibo{
           color:#f05b5d;
        }
        .icon-douban{
          color:#2aa515;
        }
       

      }
      .small{
        border: 1px solid #ccc;
        height: .4rem /* 30/75 */;
        line-height: .4rem;
        border-radius: .16rem /* 12/75 */;
        padding: 0 .08rem /* 6/75 */;
      }
      span{
         color: #888;
        &:first-child{
             margin-right: .266667rem /* 20/75 */;
             font-size: .2rem /* 15/75 */;
        }
       
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


