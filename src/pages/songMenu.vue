<template>
  <main class="song-menu">
      <template v-if="!showLoading">
      <header>
          <section>
              <div>
                  <img :src="result.coverImgUrl" alt="" v-if="!albumsBool" >
                  <img :src="songs.album.picUrl" alt="" v-else >
              </div>
              <div>
                  <template  v-if="!albumsBool">
                      <h5>{{result.name}}</h5>
                  </template>
                  <template v-else>
                      <h5 >{{songs.album.name}}</h5>
                      <router-link to="">歌手：{{songs.album.artist.name}}</router-link>
                      <p>发行时间：{{new Date(songs.album.publishTime).toLocaleString()}}</p>
                  </template>
                  
                  
              </div>
          </section>
      </header>
      <article>
          <h5 class="title"><span><i class="iconfont icon-play"></i>播放全部<i></i></span><span><i class="iconfont icon-iconfontcaidan"></i>多选</span></h5>
          <ul>
              <template v-for="(item,index) in result.tracks" v-if="!albumsBool">
                <li>
                    <span class="num">{{index}}</span>
                    <router-link to="">
                       
                        <div>
                            <h5>{{item.name}}</h5>
                            <p><span>{{item.album.name}}</span>-<span>{{item.artists[0].name}}</span></p>
                        </div>
                        <span></span>
                    </router-link>
                    
                </li>
              </template>
              <template v-for="(item,index) in songs.songs" v-if="albumsBool">
                <li>
                    <span class="num">{{index}}</span>
                    <router-link to="">
                       
                        <div>
                            <h5>{{item.name}}</h5>
                            <p><span>{{songs.album.artist.name}}</span></p>
                        </div>
                        <span></span>
                    </router-link>
                    
                </li>
              </template>
          </ul>
      </article>
      </template>
      <loading v-if="showLoading"></loading>
  </main>
</template>
<script>
export default {
   data(){
       return{
           result:{},
           showLoading:true,
           songs:{},
           albumsBool:false,
       }
   },
   created(){
       
       this.$store.commit("showTabber");
       if(this.$route.path.indexOf('albums') != -1){
           this.albumsBool = true;
           this.getAlbums();
       }else{
           this.getSongMenu();
       }
   },
  
   methods:{
       callback(res){
          this.result = res.result;
          console.log(this.result)
          this.showLoading = false;
       },
       callback1(res){
          this.songs = res;
          console.log(this.songs)
          this.showLoading = false;
       },
       //获取歌单
       getSongMenu(){
           var self = this;
           self.getData('/playlist/detail',this.callback,{id:this.$route.params.id})
       },
       //获取专辑
       getAlbums(){
            var self = this;
            self.getData('/album',this.callback1,{id:this.$route.params.id})
       }

   }
}
</script>
<style lang="scss">
    .song-menu{

        header{
            height: 6rem /* 450/75 */;
            background: url('../assets/images/01_bg.png') center center no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            padding: 0 .4rem /* 30/75 */;
            img{
                width: 3.733333rem /* 280/75 */;
                margin-right: .4rem /* 30/75 */;
            }
            section{
                width: 100%;
                @include fj()
                
                align-items:center;
                color:#fff;
                div{
                    display: flex;
                  
                   text-align: left;
                    flex-direction: column;
                    font-size: 12px;
                    &:nth-child(2){
                        flex:1;
                    }
                    h5{
                        margin-bottom: .4rem /* 30/75 */;
                        font-size: .48rem /* 36/75 */;
                    }
                }
            }
        }
        .title{
            height: 1.28rem /* 96/75 */;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: .36rem /* 15/75 */;
            padding: 0 .533333rem /* 40/75 */;
            span{
                @include lh(
                    1rem
                );
                .iconfont{
                    font-size: .48rem /* 36/75 */;
                    margin-right:.133333rem /* 10/75 */;
                }
            }
        }
        article{
            a{
                display: flex;
                text-align: left;
                flex: 1;
                height:100%;
                align-items: center;
                 border-bottom: 1px solid #eee;
            }
            li{
                height: 1.52rem /* 114/75 */;
                display: flex;
                align-items: center;
               
                padding: 0 .4rem /* 30/75 */;
                h5{
                    font-size: .373333rem /* 28/75 */;
                    margin-bottom: .08rem /* 6/75 */;
                }
                p{
                    color:#888;
                    font-size: .32rem /* 24/75 */;
                }
                span:first-child{
                    margin-right: .066667rem /* 5/75 */;
                }
                span:nth-child(2){
                    margin-left: .066667rem /* 5/75 */;
                }
            }
            .num{
                display: inline-block;
                width: .666667rem /* 50/75 */;
                margin-right: .4rem /* 30/75 */;
                color:#888;
            }
        }
    }
</style>


