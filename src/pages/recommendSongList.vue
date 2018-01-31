<template>
  <main class="rec-songlist">
      <header></header>
      <h2><span>精品歌单歌单</span><span></span></h2>
      <ul v-if="!showLoading">
          <li v-for="item in recommendMusic">
              <router-link :to="'/songMenu/' + item.id">
                  <img v-lazy="item.coverImgUrl" alt="">
                  <span><i class="iconfont icon-headseterji"></i>{{item.playCount}}</span>
                  <p class="single-text"><i class="iconfont icon-ren"></i>{{item.creator.nickname}}</p>
              </router-link>
            
              <h5>{{item.name}}</h5>              
          </li>
      </ul>
      <loading v-if="showLoading"></loading>
  </main>
</template>
<style lang="scss">
    .rec-songlist{
        header{
            height: 3.866667rem /* 290/75 */;
            background: url('../assets/images/02.jpg') center center no-repeat;
            background-size: 100% 100%;
        }
        h2{
            height: .933333rem /* 70/75 */;
            display: flex;
             align-items: center;
            font-size: .373333rem /* 28/75 */;
            padding: .133333rem /* 10/75 */ .266667rem /* 20/75 */ ;
            span:first-child{
                border:1px solid #c9cacc;
                display: flex;
                align-items: center;
                height: .666667rem /* 50/75 */;
                padding: 0 .266667rem /* 20/75 */;
                justify-content: center;
                border-radius: .333333rem /* 25/75 */;
            }
        }
        ul{
            display:flex;
            flex-wrap:wrap;
            justify-content:space-between;
        }
        li{
            width:calc((100% - .066667rem /* 5/75 */)/2);
            float:left;
            a{
                color:#fff;
                position:relative;
               
                span{
                    display: block;
                    position: absolute;
                    display: flex;
                    align-items: center;
                    right:.266667rem /* 20/75 */;
                    top: .266667rem /* 20/75 */;
                }
                p{
                    position:absolute;
                    bottom:0;
                    color:#fff;
                     padding: 0 .266667rem /* 20/75 */ .1rem;
                }
                i{
                    font-size: .373333rem /* 28/75 */;
                    margin-top:.133333rem /* 10/75 */;
                    margin-right: .066667rem /* 5/75 */;
                }

            }
            h5{
                padding-left:.266667rem /* 20/75 */;
                height: 1.253333rem;
                display: flex;
                align-items: center;
                width: 80%;
                font-size: .373333rem /* 28/75 */;
                margin-bottom: .333333rem /* 25/75 */;
            }
            img{
                width:100%;
            }
        }
    }
</style>
<script>
import { Lazyload } from 'mint-ui';

export default {
    data(){
        return {
            recommendMusic:"",//每日推荐
            showLoading:true,
        }
    },
    
    created(){
        this.getRecommendMusic();
    },
    methods:{
        callback(res) {
        this.recommendMusic = res.playlists;
        this.showLoading = false;
       
        },   
        //歌曲推荐
        getRecommendMusic() {
            var self = this;
            self.getData("/top/playlist", this.callback);
        },
    }
}
</script>


