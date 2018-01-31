<template>
   <div>
       <aplayer  :music="{
                  title: title,
                  author: 'Hans Zimmer/Richard Harvey',
                  url: 'https://p2.music.126.net/Ah9t98gNkEvh_D9_mLwOWw==/2946691245626258.mp3',
                  pic: 'http://devtest.qiniudn.com/Preparation.jpg',
                  lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                }"></aplayer>
   </div>
</template>
<script>
    import Aplayer from 'vue-aplayer'
    export default {
    props:['title'],
     components: {
        Aplayer
     },
    }
</script>
<style lang="scss">
    .aplayer{
        position: fixed;
        bottom:0;
        z-index: 111111;
        background-color: $main;
        width:100%;
        margin: 0 !important;
        .aplayer-music{
            color: #fff;
        }
        .aplayer-author{
            color:#fff !important;
        }
        .aplayer-time{
            color:#fff !important;
        }
    }
</style>
