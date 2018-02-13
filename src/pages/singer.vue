<template>
  <main class="singer">
      <header :style="{backgroundImage:'url(' + hotData.artist.picUrl + ')'}">

      </header>
      <section>
          <ul class="tab">
              <li @click="selected = '1'"><span>热门</span></li>
              <li @click="selected = '2'"><span>专辑</span></li>
              <li @click="selected = '3'"><span>视频</span></li>
              <li @click="selected = '4'"><span>歌手信息</span></li>
          </ul>
          <section>
              <div class="hot" v-show="selected == '1'">
                  <ul>
                      <li v-for="(item,index) in hotData.hotSongs">
                          <span class="num">{{index}}</span>
                            <router-link to="">
                            
                                <div>
                                    <h5>{{item.name}}</h5>
                                    <p><span>{{item.al.name}}</span></p>
                                </div>
                                <span></span>
                            </router-link>
                      </li>
                  </ul>
              </div>
              <div class="albums"  v-show="selected == '2'">
                  <p>
                      <span></span>
                      <span>排序</span>
                  </p>
                  <ul>
                      <li v-for="item in albumData.hotAlbums" >
                        <router-link :to="'/albums/'+item.id">
                        <img v-lazy="item.picUrl" alt="">
                        <div>
                            
                
                                <h5  class="h5 single-text">{{item.name}}</h5>
                                <p><span  class="small">{{new Date(item.publishTime).toLocaleString()}}</span><span>{{item.size}}首</span></p>
                           
                        </div>
                        </router-link>              
                    </li>
                  </ul>
              </div>
              <div class="video"  v-show="selected == '3'">
                  <p>
                      <span>全部</span>
                      <span>MV</span>
                  </p>
                  <ul>
                      <li></li>
                  </ul>
              </div>
              <div class="info"  v-show="selected == '4'">

              </div>
          </section>
      </section>
  </main>
</template>
<script>
export default {
  data() {
    return {
      hotData: [], //热门
      albumData: [], //专辑
      videoData: [], //视频
      infoData: [], //歌手信息
      selected: "1"
    };
  },
  created() {
    this.getHot();
    this.getAlbum();
  },
  methods: {
    getHot() {
      var self = this;
      var callback = res => {
        this.hotData = res;
        console.log(this.hotData);
      };
      self.getData("/artists", callback, { id: self.$route.params.id });
    },
    getAlbum() {
      var self = this;
      var callback = res => {
        this.albumData = res;
        console.log(this.hotData);
      };
      self.getData("/artist/album", callback, { id: self.$route.params.id });
    }
  }
};
</script>
<style lang="scss">
.singer {
  header {
    height: 5.333333rem;
    background-size: 100% auto;
    background-position: center center;
  }
  .tab {
    height: 0.933333rem;
    line-height: 0.933333rem;
    li {
      float: left;
      width: 25%;
    }
  }
  .hot {
    li {
      height: 1.52rem;
      display: flex;
      align-items: center;
      text-align: left;
      padding: 0 0.4rem;
      h5 {
        font-size: 0.373333rem;
        margin-bottom: 0.08rem;
      }
      p {
        color: #888;
        font-size: 0.32rem;
      }
      span:first-child {
        margin-right: 0.066667rem;
      }
      span:nth-child(2) {
        margin-left: 0.066667rem;
      }
    }
    .num {
      display: inline-block;
      width: 0.666667rem;
      margin-right: 0.4rem;
      color: #888;
    }
  }
}
</style>


