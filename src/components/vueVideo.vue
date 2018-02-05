<template>
<div class="video">
        <div class="videoDom">
            <video-player  class="vjs-custom-skin"
                           
                            :options="playerOptions"
                       
                           >
            </video-player>
        </div>
</div>
</template>
 
<script>
  // Similarly, you can also introduce the plugin resource pack you want to use within the component
  // import 'some-videojs-plugin'
  import VueVideoPlayer from 'vue-video-player';
  require('video.js/dist/video-js.css');
  require('vue-video-player/src/custom-theme.css');
  export default {
      props:['id'],
    data() {
      return {
          playerOptions: {
                    muted: false,
                    sources: {
                        type: '',
                        src: '',
                             type: "video/mp4",
                         src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                        withCredentials: false
                    },
                    poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg",
                    language: 'en',
                    live: true,
                    autoplay: false,
                    width: '100%',
                    height: 230
                },
      }
    },
    mounted() {
      console.log('this is current player instance object', this.player)
    },
    computed: {
    
    },
    methods: {
        callback(){

        },
       getMvData(){
           var self = this;
           this.getData('/mv',this.callback,{mvid:self.id});
       }
    }
  }
</script>
<style  lang="scss">
    .video {
        position: relative;
        width: 100%;
        height: 230px;
        // top:.58rem /* 58/100 */;
        margin-bottom:.2rem /* 16/100 */;
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
        .vjs-poster{
            background-size:cover;
        }
        .vjs-custom-skin>.video-js {
            .vjs-play-progress{
                background-color:#c62f2f;
            }
            .vjs-big-play-button{
                border:.06666em solid transparent;
                 background-color: #c13733;
                 background-color: rgba(193,55,51,.65);
                    border-radius: .5em;
                        margin-left: -1.8em;
                font-size: 2em; 
                height: 2.3em !important;
                width: 3.6em;
                line-height: 2.3em !important;
                margin-top: -1em !important;
            }
            .vjs-loading-spinner{
                 background-color: rgba(193,55,51,.65);
            }
           
        }
        
    }
   .vjs-icon-play{
                
                font-size:.7rem /* 50/100 */;
               
            }
</style>
