<template>
   <div>
       <aplayer  :music="musicData"></aplayer>
   </div>
</template>
<script>
    import Aplayer from 'vue-aplayer'
    export default {
    props:['title'],
     components: {
        Aplayer
     },
     computed:{
         musicData(){
             return this.$store.state.musicData;
         }
     }
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
