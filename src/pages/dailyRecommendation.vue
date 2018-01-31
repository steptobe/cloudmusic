<template>
  <main>
      <h2><span>播放全部</span><span>多选</span></h2>
      <ul>
          <li v-for="item in recommendMusic">
              <img src="" alt="">
              <div>
                  <h5>{{item.name}}<span>{{item.alias[0]}}</span></h5>
                  <p><span>{{item.artists[0].name}}</span></p>
              </div>
              <div></div>
          </li>
      </ul>
  </main>
</template>
<style lang="sass">

</style>
<script>
export default {
    data(){
        return {
            recommendMusic:"",//每日推荐
        }
    },
    created(){
        this.getRecommendMusic();
    },
    methods:{
        callback(res) {
        this.recommendMusic = res.recommend;
       
        },   
        //歌曲推荐
        getRecommendMusic() {
            var self = this;
            self.getData("/recommend/songs", this.callback);
        },
    }
}
</script>


