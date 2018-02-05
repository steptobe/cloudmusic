<template>
   <main class="mv-detail">
     <template v-if="!showLoading">
       <div class="video">
        <div class="videoDom" v-if="loaded">
            <video-player  class="vjs-custom-skin"
                           
                            :options="playerOptions"
                       
                           >
            </video-player>
        </div>
       </div>
       <section class="intro">
           <h5><span>mv</span>{{mvData.name}}</h5>
           <p class="musician">歌手
               <router-link to="">{{mvData.artistName}}</router-link>
           </p>
           <div class="play">
               <p>
                    放行<span>{{mvData.publishTime}}</span>
                </p>
               <p>
                   播放<span>{{mvData.playCount}}</span>
               </p>
           </div>
           
           <ul class="clearfix">
               <li>
                   <span><i class="iconfont icon-dianzan"></i></span>
                   <p>{{mvData.likeCount}}</p>
               </li>
               <li>
                   <span><i class="iconfont icon-shoucang"></i></span>
                   <p>{{mvData.subCount}}</p>
               </li>
               <li>
                   <span><i class="iconfont icon-buoumaotubiao48"></i></span>
                   <p>{{mvData.commentCount}}</p>
               </li>
               <li>
                   <span><i class="iconfont icon-fenxiang"></i></span>
                   <p>{{mvData.shareCount}}</p>
               </li>
           </ul>
       </section>
       <section class="hot-c" v-if="hotComments.length != 0">
           <h5 class="h5">精彩评论</h5>
           <ul>
               <li v-for="item  in  hotComments">
                   <div :style="{backgroundImage:'url(' + item.user.avatarUrl + ')'}" class="avatar">

                   </div>
                    <div class="other">
                        <h5>
                            <span>{{item.user.nickname}}</span>
                            <span>{{item.time}}</span>
                            <span class="ab">{{item.likedCount}}<i class="iconfont icon-dianzan"></i></span>
                        </h5>
                        <p>{{item.content}}</p>
                    </div>
               </li>
           </ul>
       </section>
       <section class="hot-c" v-if="mvComment.length != 0">
           <h5 class="h5">最新评论</h5>
           <ul>
               <li v-for="item  in  mvComment">
                   <div :style="{backgroundImage:'url(' + item.user.avatarUrl + ')'}" class="avatar">

                   </div>
                    <div class="other">
                        <h5>
                            <span>{{item.user.nickname}}</span>
                            <span>{{item.time}}</span>
                            <span class="ab">{{item.likedCount}}<i class="iconfont icon-dianzan"></i></span>
                        </h5>
                        <p>{{item.content}}</p>
                    </div>
               </li>
           </ul>
       </section>
     </template>
     <loading v-if="showLoading"></loading>
  </main>
</template>
<script>
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
import VueVideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
export default {
  props: ["id"],
  data() {
    return {
      playerOptions: {
        muted: false,
        sources: {
          type: "",
          src: "",
          type: "video/mp4",
          src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          withCredentials: false
        },
        poster:
          "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg",
        language: "en",
        live: true,
        autoplay: false,
        width: "100%",
        height: 230
      },
      mvData: "",
      loaded: false,
      hotComments: [],
      mvComment: [],
      showLoading:true,
    };
  },
  created() {
    this.getMvData();
    this.getMvComment();
     this.$store.commit("hideTabber");
  },
  computed: {},
  methods: {
    callback(res) {
      this.mvData = res.data;
      this.playerOptions.poster = res.data.cover;
      this.playerOptions.sources.src =
        "http://localhost:3000/mv/url?url=" + res.data.brs["720"];
      console.log(res.data.brs["720"]);
      this.loaded = true;
    },
    callback1(res) {
    
      for(var j = 0;j < res.hotComments.length ; j++){
          res.hotComments[j].time = new Date(res.hotComments[j].time).toLocaleString()
      }
      for(var i = 0;i <  res.comments.length ; i++){
           res.comments[i].time = new Date(res.comments[i].time).toLocaleString()
      }
      this.hotComments = res.hotComments;
      this.mvComment = res.comments;
      this.showLoading = false;
    },
    getMvData() {
      var self = this;
      this.getData("/mv", this.callback, { mvid: this.$route.params.id });
    },
    getMvComment() {
      var self = this;
      this.getData("/comment/mv", this.callback1, {
        id: this.$route.params.id
      });
    }
  }
};
</script>
<style  lang="scss">
.video {
  position: relative;
  width: 100%;
  height: 230px;
  // top:.58rem /* 58/100 */;
  margin-bottom: 0.2rem;
  img {
    width: 100%;
  }
  .videoDom {
    position: absolute;
    z-index: 0;
    left: 0;
    // top: .6rem;
    width: 100%;
    display: block;
  }
  .live-lock {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 24px;
    height: 24px;
    z-index: 999;
  }
  .vjs-poster {
    background-size: cover;
  }
  .vjs-custom-skin > .video-js {
    .vjs-play-progress {
      background-color: #c62f2f;
    }
    .vjs-big-play-button {
      border: 0.06666em solid transparent;
      background-color: #c13733;
      background-color: rgba(193, 55, 51, 0.65);
      border-radius: 0.5em;
      margin-left: -1.8em;
      font-size: 2em;
      height: 2.3em !important;
      width: 3.6em;
      line-height: 2.3em !important;
      margin-top: -1em !important;
    }
    .vjs-loading-spinner {
      background-color: rgba(193, 55, 51, 0.65);
    }
  }
}
.vjs-icon-play {
  font-size: 0.7rem;
}
.mv-detail{
    
    .intro{
        padding: .4rem /* 40/75 */;
        text-align: left;
        h5{
            height: .933333rem /* 70/75 */;
            display: flex;
            align-items: center;
            font-size: .426667rem /* 32/75 */;
            span{
                color:$main;
                border:1px solid $main;
                height: .4rem /* 30/75 */;
                font-size: 12px;
                line-height: .4rem /* 40/75 */;
                margin-right: .133333rem /* 10/75 */;
                padding: 0 .08rem /* 6/75 */;
            }
        }
        a{
            display: inline;
        }
        .play{
            margin-bottom: .4rem /* 30/75 */;
            p{
                display: inline-block;
                span{
                    margin-left: .266667rem /* 20/75 */;
                }
            }
        }
        .musician{
            color:#333;
            a{
                color:#57799f;
            }
        }
        p{
            height: .666667rem /* 50/75 */;
            color:#888;
            span{
                margin-right: .266667rem /* 20/75 */;
            }
        }
        li{
            width: 25%;
            float: left;
            text-align: center;
            .iconfont{
                font-size: .666667rem /* 50/75 */;
            }
        }

    }
    //精彩评论
    .hot-c{
        .h5{
            width:100%;
            text-align: left;
            height: .666667rem /* 50/75 */;
            line-height: .666667rem /* 50/75 */;
            padding-left: .4rem /* 40/75 */;
            background-color: #eff0f2;
        }
        li{
            display: flex;
            width: 100%;
            padding: .4rem /* 40/75 */ 0 0 .4rem;
            
            box-sizing: border-box;
            justify-content: space-between;
             text-align: left;
            .avatar{
                width: .853333rem /* 64/75 */;
                height: .853333rem /* 64/75 */;
                border-radius: 100%;
                background-position: center center;
                background-size: 100% auto;
                margin-right: .4rem /* 40/75 */;
               
            }
            .other{

                flex:1;
                border-bottom:1px solid #eee;
                padding-bottom: .4rem /* 40/75 */;
                 .ab{
                    position: absolute;
                    right:.4rem /* 40/75 */;
                    top: 30%;
                }
                p{
                    padding-top: .4rem /* 30/75 */;
                }
                h5{
                   
                     position: relative;
                     span{
                         color: #999;
                        display: block;
                        &:first-child{
                            font-size: .373333rem /* 28/75 */;
                            color:#333;
                            margin-bottom: .133333rem /* 10/75 */;
                        }
                        &:nth-child(2){
                            color: #999;
                        }
                    }
                }
            }
        }
    }
}
</style>
