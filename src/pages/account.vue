<template>
  <div class="avatar">
      <header   :style="{backgroundImage:'url(' + data.profile.backgroundUrl + ')'}">
          <span :style="{backgroundImage:'url(' + data.profile.avatarUrl + ')'}" class="avatar-img"></span>         
          <h5>{{data.profile.nickname}}</h5>
          <p><a href="">关注<span>{{data.profile.follows}}</span></a><a href="">粉丝<span>{{data.profile.followeds}}</span></a></p>
      </header>
      <footerCom active="4"></footerCom>       

  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: "",
      data: []
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
      this.data = res;
      console.log(this.data.profile.avatarUrl);
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
<style lang="scss" scoped>
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


