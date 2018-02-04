<template>
   <div class="music-com" v-if="loaded">
       <a  href="javascript:;">
            <audio class="audio">
                                        <source :src="src" type="audio/ogg">
                                        <source :src="src" type="audio/mpeg">
                                    Your browser does not support the audio tag.
            </audio>
       </a>
   </div>
</template>
<script>
    import Aplayer from 'vue-aplayer'
    export default {
       props:['id','playa'],
       data(){
           return {
               src:"",
               loaded:false,
           }
       },
       mounted(){
           this.getmusic()
       },
       methods:{
           callback(res) {
              
             this.src = res.data[0].url;
             this.loaded = true;
            },
            getmusic() {
              
                var self = this;
                self.getData("/music/url", this.callback, { id: self.id });
            },
            // controller() {
            //     const $audios = document.getElementsByTagName(audio);
            //     if (this.audioState == 'unplay' || this.audioState == 'to-play' || this.audioState == 'played') {
            //         this.audioState = 'to-pause'
            //         for (let i = 0; i < $audios.length; i++) {
            //             if ($audios[i] != this.$refs.audio) {
            //                 $audios[i].pause()
            //                 $audios[i].currentTime = 0
            //             }
            //         }
            //     } else if (this.audioState == 'to-pause') {
            //         this.isPause = true
            //         this.audioState = 'to-play'
            //     }
            // },
       }
    }
</script>
<style lang="sass">
   .music-com{
       height:100%;
       a{
           
           display:block;
           width:100%;
           height:100%;
       }
       
   }
</style>
