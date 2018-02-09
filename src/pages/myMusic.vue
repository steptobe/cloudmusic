<template>
  <div class="myMusic">
      <header> 
           <cell title="我的电台" path="" icon="icon-enshrine" img="icon-diantai" :value="station.length"></cell>
           <cell title="最近播放" path="" icon="" img="icon-zuijinbofang" :value="recentPlay.length"></cell>
      </header>
      
      <div class="music-box">
            <h5>歌单</h5>
            <template v-for=" item  in playlist">
                <div  class="music-item" v-if="item.ordered == false">
                    <img  :src="item.coverImgUrl">
                    <p>
                    <span>{{item.name}}</span>
                    <span>{{item.trackCount}}首，播放{{item.playCount}}</span>
                    </p>
                </div>
            </template>
            <h5>收藏的歌单</h5>
            <template v-for=" item  in playlist">
                <router-link to="/index" class="music-item"  v-if="item.ordered">
                    <img  :src="item.coverImgUrl">
                    <p>
                    <span>{{item.name}}</span>
                    <span>{{item.trackCount}}首，播放{{item.playCount}}</span>
                    </p>
                </router-link>
            </template>

        </div>
  </div>
</template>
<script>

import cell from "../components/common/cell.vue";
export default {
  data() {
    return {
      userId: "",
      station: {},
      selected:"1",
      playlist:[],
      events:[],
      Astro:"",
      age:"",
      gender:"",
      recentPlay:{}
    };
  },
  components:{
      cell
  },
  created() {
      this.userId = this.getCookie("userId");
        if (this.userId == null || this.userId == "") {
          this.$router.push("/login");
        } 
        if(this.userId){
           this.getStation(this.userId);
          this.getSongList(this.userId);
          this.getEvent(this.userId);
          this.getRecentPlay(this.userId);
            console.log('user加载')
        }
     this.$store.commit("showTabber");
  },
  methods: {
   
    callback(res) {
      this.station = res.programs;
     
    },
    callback1(res) {
      this.playlist = res.playlist
      console.log(this.profile);

    },
    callback2(res) {
      
      for(var i = 0;i <  res.events.length;i++){
           this.events[i] = [];
           this.events[i].info = {};
         
           this.events[i].info.type = res.events[i].type;
           if(res.events[i].type == 18){
             this.events[i].info.id = JSON.parse(res.events[i].json).song.id;
             this.events[i].info.bgSrc = JSON.parse(res.events[i].json).song.album.img80x80;
             this.events[i].info.actName = JSON.parse(res.events[i].json).song.album.artist.name;
             this.events[i].info.name = JSON.parse(res.events[i].json).song.name;
           } else{
             this.events[i].info.id = JSON.parse(res.events[i].json).playlist.id;
             this.events[i].info.bgSrc = JSON.parse(res.events[i].json).playlist.img80x80;
             this.events[i].info.actName = JSON.parse(res.events[i].json).playlist.creator.nickname;
             this.events[i].info.name = JSON.parse(res.events[i].json).playlist.name;
           }
           
           this.events[i].info.msg = JSON.parse(res.events[i].json).msg;
           this.events[i].info.time =  new Date(res.events[i].showTime).toLocaleString();
           
           console.log(this.events[i].info.type)
      }
       
      console.log(this.events);

    },
    callback3(res){
        this.recentPlay = res.weekData;
    },
    //获取电台
    getStation(id) {
      var self = this;
      self.getData("/user/dj", this.callback, { uid: id });
    },
    getRecentPlay(id){
      var self = this;
      self.getData("/user/record", this.callback3, { uid: id,type:1 });
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
.myMusic {
  header {
    
   
   
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


