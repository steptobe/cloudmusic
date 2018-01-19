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
               <div  class="music-item">
                <img  src="../assets/100x100.png">
                <p>
                  <span>听歌排行</span>
                  <span>{{data.listenSongs}}</span>
                </p>
               </div>
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
      profile:{}
    };
  },
  created() {
    this.userId = this.getCookie("userId");
    if (this.userId == null || this.userId == "") {
      this.$router.push("/login");
    } else {
      this.getdata(this.userId);
      this.getSongList(this.userId);
    }
  },
  methods: {
    callback(res) {
      this.data = res;
      console.log(this.data.profile.avatarUrl);
    },
    callback1(res) {
      this.profile = res;
      console.log(this.profile.profile.avatarUrl);
    },
    getdata(id) {
      var self = this;
      self.getData("/user/detail", this.callback, { uid: id });
    },
    getSongList(id){
        var self = this;
      self.getData("/user/playlist", this.callback1, { uid: id });
    }
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


