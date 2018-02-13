<template>
   <main class="search-p">
       <!-- 搜索页 -->
       <form v-on:submit.prevent ="getSearchFinal(1,$event,0)" >
        <mt-search
            v-model="keywords"
            cancel-text="取消"
            placeholder="搜索">
        </mt-search>
       </form>
        <section class="advice" v-if="toggleBth==1">
            <ul>
                <li>
                    <div><i class="iconfont icon-headseterji"></i>单曲</div>
                    <div>
                        <template v-for="item in adviceData.songs">
                            <router-link to="">{{item.name}}</router-link>
                        </template>
                    </div>
                </li>
                <li>
                    <div><i class="iconfont icon-zhuanjiguangpan"></i>专辑</div>
                    <div>
                        <template v-for="item in adviceData.albums">
                            <router-link to="">{{item.name}}</router-link>
                        </template>
                    </div>
                </li>
                <li>
                    <div><i class="iconfont icon-geshou"></i>歌手</div>
                    <div>
                        <template v-for="item in adviceData.artists">
                            <router-link to="">{{item.name}}</router-link>
                        </template>
                    </div>
                </li>
                <li>
                    <div><i class="iconfont icon-MV"></i>mv</div>
                    <div>
                        <template v-for="item in adviceData.mvs">
                            <router-link :to="'/mvDetail/'+item.id">{{item.name}}</router-link>
                        </template>
                    </div>
                </li>
                <li>
                    <div><i class="iconfont icon-icon-"></i>歌单</div>
                    <div>
                        <template v-for="item in adviceData.playlists">
                            <router-link :to="'/songMenu/'+item.id">{{item.name}}</router-link>
                        </template>
                    </div>
                </li>
            </ul>
        </section>
        <section class="final" v-show="toggleBth == 2">
              <swiper :options="swiperOption" ref="mySwiper1">
                  <swiper-slide v-for="(item,index) in finalTab">
                      <span @click="getSearchFinal(item.type,$event,index)"  >{{item.value}}</span>
                  </swiper-slide>
                  <div class="active" :style="{'left':left}">
                        <span></span>
                  </div>
              </swiper>
              <div class="song" v-if="selected == 1">
                <template  v-if="finalData.songCount != 0">
                  <p v-for="item in finalData.songs">
                      <span>{{item.name}}</span>
                      <span class="small">{{item.artists[0].name}}</span>
                  </p>
                </template>
                  <p class="nodata" v-else>没有数据呢</p>
              </div>
              <ul class="artists" v-if="selected == 100">
                <template  v-if="finalData.artistCount != 0">
                  <li v-for="item in finalData.artists" >
                    <router-link :to="'/singer/' + item.id">
                      <img v-lazy="item.img1v1Url" alt="">
                      <p>{{item.name}}</p>
                    </router-link>
                  </li>
                </template>
                  <p class="nodata" v-else>没有数据呢</p>
              </ul>
              <ul class="albums" v-if="selected == 10">
                <template  v-if="finalData.albumCount != 0">
                  <li v-for="item in finalData.albums" >
                    <router-link :to="'/albums/'+item.id">
                      <img v-lazy="item.blurPicUrl" alt="">
                      <div>
                          
                          <template v-if="item.containedSong != ''">
                              <h5 class="single-text">{{item.name}}</h5>
                              <p ><span class="small">{{item.artist.name}}</span><span class="small">包含单曲：</span> <span class="a  small">{{item.containedSong}}</span></p>
                          </template>
                          <template v-else>
                              <h5  class="h5 single-text">{{item.name}}</h5>
                              <p><span  class="small">{{item.artist.name}}</span><span>{{new Date(item.publishTime).toLocaleString()}}</span></p>
                          </template>
                      </div>
                    </router-link>              
                  </li>
                </template>
                  <p class="nodata" v-else>没有数据呢</p>
              </ul>
              <ul class="albums" v-if="selected == 1000">
                <template  v-if="finalData.playlistCount != 0">
                  <li v-for="item in finalData.playlists" >
                    <router-link :to="'/songMenu/'+item.id">
                      <img v-lazy="item.coverImgUrl" alt="">
                      <div>
                           <h5>{{item.name}}</h5>
                           <p><span class="small">{{item.trackCount}}首音乐</span><span>by{{item.nickname}}</span><span>播放{{item.playCount | bofang}}次</span></p>
                      </div>
                    </router-link>                   
                  </li>
                </template>
                  <p class="nodata" v-else>没有数据呢</p>
              </ul>
              <div class="userprofiles" v-if="selected == 1002">
                <template  v-if="finalData.userprofileCount != 0">
                  <div v-for="item in finalData.userprofiles" >
                      <router-link :to="'/user/'+item.userId">
                        <img v-lazy="item.avatarUrl" alt="">
                        <h5>{{item.nickname}}
                            <i class="iconfont icon-nv" v-if="item.gender == 2"></i>
                            <i class="iconfont icon-nan" v-if="item.gender == 1"></i>
                        </h5>
                      </router-link>                      
                  </div>
                </template>
                  <p class="nodata" v-else>没有数据呢</p>
              </div>
              <ul class="albums" v-if="selected == 1004">
                <template  v-if="finalData.mvs != undefined">
                  <li v-for="item in finalData.mvs" >
                     <router-link :to="'/mvDetail/'+item.id">
                      <img v-lazy="item.cover" alt="">
                      <div>
                          <h5>{{item.name}}</h5>
                          <p><span>{{item.artistName}}</span><span>播放{{item.playCount | bofang}}次</span></p>
                      </div> 
                     </router-link>                     
                  </li>
                </template>
                  <p class="nodata" v-else>没有数据呢</p>
              </ul>
              <div class="song" v-if="selected == 1006">
                <template  v-if="finalData.songCount != 0">
                  <p v-for="item in finalData.songs" >
                      <span>{{item.name}}</span>
                      <span class="small">{{item.name}}</span>
                  </p>
                </template>
                  <p class="nodata" v-else>没有数据呢</p>
              </div>
              <div class="song" v-if="selected == 1009">
                <template  v-if="finalData.djRadios != undefined">
                  <p v-for="item in finalData.djRadios" >
                      <span>{{item.name}}</span>
                      <span class="small">{{item.name}}</span>
                  </p>
                </template>
                  <p class="nodata" v-else>没有数据呢</p>
              </div>
        </section>
   </main>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { Lazyload } from "mint-ui";
require("swiper/dist/css/swiper.min.css");
export default {
  data() {
    return {
      keywords: "", //搜索词
      adviceData: "", //搜索建议
      finalData: "", //最终搜索得到的内容
      selected: 1,
      swiperOption: {
        // 所有配置均为可选（同Swiper配置）
        NextTick: true,
        // spaceBetween: 20,
        // initialSlide: 1,
        // autoplay: 3000,
        // width: window.innerWidth,
        // speed: 600,

        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        loop: false,
        // slideToClickedSlide:true,
        // freeMode: true,
        // effect: 'coverflow',
        slidesPerView: 5,
        // centeredSlides: true,
        pagination: ".swiper-pagination"
        // autoplayDisableOnInteraction: false,
        // coverflow: {
        //     rotate: 0,// 旋转的角度
        //     stretch: 50,// 拉伸   图片间左右的间距和密集度
        //     depth: 150,// 深度   切换图片间上下的间距和密集度
        //     modifier: 1,// 修正值 该值越大前面的效果越明显
        //     slideShadows: false// 页面阴影效果
        // }
      },
      left: "",
      finalTab: [
        { type: 1, value: "单曲" },
        { type: 100, value: "歌手" },
        { type: 10, value: "专辑" },
        { type: 1000, value: "歌单" },
        { type: 1002, value: "用户" },
        { type: 1004, value: "MV" },
        { type: 1006, value: "歌词" },
        { type: 1009, value: "电台" }
      ],
      toggleBth:0,
      isFirstEnter:false,
    };
  },
  created() {
    this.$store.commit("hideTabber");
     this.isFirstEnter=true;
  },
  activated() {
    console.log("我是user activated 方法");
 
    // this.$route.meta.isBack=false
    // this.isFirstEnter=false;
  },
  beforeRouteEnter(to, from, next){
      console.log('我是user的beforeRouteEnter方法')
    //   if(from.name=='index'){
    //     to.meta.isBack=true;        
    // }
      next()
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper1.swiper;
    }
  },
  filters: {
    //播放次数用万
    bofang(str) {
      let num;
      if (str > 10000) {
        num = (str / 10000).toFixed(2) + "万";
      } else {
        num = str;
      }
      return num;
    }
  },
  methods: {
    //获取建议数据
    callback(res) {
      this.adviceData = res.result;
    },
    getSearchAdvice() {
      var self = this;
      self.toggleBth = 1;
      self.getData("/search/suggest", this.callback, {
        keywords: this.keywords
      });
    },
    //获取最终数据
    callback1(res) {
      this.finalData = res.result;
    },
    getSearchFinal(type, event, index) {
      var self = this;
      this.selected = type;
      self.toggleBth = 2;
      //  this.swiper.init()
      //  this.$nextTick(()=>{
      //      event.target.parentNode.parentNode.style.transform = 'translate3d(-' + (index-1)*75 + 'px, 0px, 0px)';
      //      event.target.parentNode.parentNode.style.transition = '300ms';

      //  })
      if (index != undefined) {
        this.swiper.slideTo(index - 2, 1000, false);
        this.left = index / 5 * 100 + "%";
      } else {
        this.swiper.slideTo(0, 1000, false);
        this.left = 0;
      }
    
      //  if(index > 2 && this.swiper.activeIndex < 3){
      //       this.swiper.slideTo((this.swiper.activeIndex+1), 1000, false);
      //       alert(1)
      //  } else if(index > 2 && this.swiper.activeIndex > 2){
      //       this.swiper.slideTo((this.swiper.activeIndex - 1), 1000, false);
      //       alert(2)
      //  }

      self.getData("/search", this.callback1, {
        keywords: this.keywords,
        type: type
      });
    }
  },
  components: {
    swiper,
    swiperSlide,
    Lazyload
  },
  watch: {
    keywords(val) {
      if (val.trim() != "") {
        this.getSearchAdvice();
      }
    }
  }
};
</script>
<style lang="scss">
.search-p {
  .advice {
    padding: 0.4rem;
    li {
      display: flex;
      //    justify-content: space-between;
      text-align: left;
      padding: 0.4rem 0;
      border-bottom: 1px solid #eee;
      div {
        &:nth-child(1) {
          width: 30%;
          font-size: 0.426667rem;

          i {
            margin-right: 0.266667rem;
          }
        }
        &:nth-child(2) {
          flex:1;
          a {
            height: 0.666667rem;
            line-height: 0.666667rem;
            color: #747474;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
          }
        }
      }
    }
  }
  .final {
    img[lazy="loading"] {
      padding: 10px;
    }
    .nodata{
      display: flex;
      align-items: center;
      text-align: center;
      border-bottom: none !important;
      justify-content: center;
      width:100% !important;
      height: 1.333333rem /* 100/75 */;
      font-size: .426667rem /* 32/75 */ !important;
      color:#888;
    }
    .song {
      text-align: left;
      padding: 0 0.4rem;
      p {
        height: 1.333333rem;
        padding: 0.133333rem 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
      }
      span {
        line-height: 0.533333rem;
        &:nth-child(1) {
          font-size: 0.373333rem;
          display: block;
          color: $a;
          overflow: hidden;
          /* white-space: nowrap; */
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        &:nth-child(2) {
          font-size: 12px;
        }
      }
    }
    .userprofiles {
      padding: 0.133333rem 0.4rem;
      a {
        display: flex;
        padding: 0.133333rem 0;
        border-bottom: 1px solid #eee;
        align-items: center;
        font-size: 0.373333rem;
        height: 1.333333rem;
        img {
          width: 1.333333rem;
          height: 1.333333rem;
          margin-right: 0.4rem;
          border-radius: 100%;
        }
        h5 {
          color: $a;
          overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
        }
        .iconfont {
          font-size: 0.373333rem;
        }
        .icon-nv {
          color: #df5396;
        }
        .icon-nan {
          color: #569bc0;
        }
      }
    }
    .artists {
      padding: 0.133333rem 0.4rem;
      a {
        display: flex;
        padding: 0.133333rem 0;
        border-bottom: 1px solid #eee;
        align-items: center;
        font-size: 0.373333rem;
        height: 1.333333rem;
        img {
          width: 1.333333rem;
          height: 1.333333rem;
          margin-right: 0.4rem;
        }
      }

      p {
        //    flex:1;
        width: 250px;
        text-align: left;
      }
    }
    .albums {
      padding: 0.133333rem 0.4rem;
      li {
        display: flex;
        padding: 0.133333rem 0;
        border-bottom: 1px solid #eee;
        align-items: center;
        font-size: 0.426667rem;
        height: 1.333333rem;
        img {
          width: 1.333333rem;
          height: 1.333333rem;
          margin-right: 0.4rem;
        }
      }
      a{
         display: flex;      
        align-items: center;
      }
      div {
        text-align: left;
        .a {
          display: inline-block;
          color: $a;
          overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
        }
      }
      span {
        margin-right: 0.133333rem;
      }
      h5,
      .h5 {
        margin-bottom: 0.133333rem;
        text-align: left;
        overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
      }
      img[lazy="loading"] {
        padding: 10px;
      }
      p {
        //    flex:1;
        width: 250px;
        font-size: 12px;
        text-align: left;
      }
    }
  }

  .swiper-container {
    height: 0.933333rem;
    line-height: 0.933333rem;
    position: relative;
    border-bottom: 1px solid #eee;
    .active {
      display: flex;
      width: 20%;
      justify-content: center;
      text-align: center;
      transition-duration: 0.3s;
      position: absolute;
      z-index: 1;
      bottom: 0;
      background-color: transparent;
      left: 0;
      span {
        display: inline-block;
        width: 20px;
        border-radius: 2px;
        background-color: $main;
        height: 0.06rem;
      }
    }
  }
}
.mint-search-list {
  bottom: auto;
}
.mint-search {
  height: auto;
}
.mint-searchbar {
  background-color: $main;
}
.mint-searchbar-inner {
  border-radius: 0.533333rem;
}
.mint-searchbar-cancel {
  color: #fff;
}
</style>


