<template>
  <main class="song-menu">
      <template v-if="!showLoading">
      <header>
          <section>
              <div>
                  <img :src="result.coverImgUrl" alt="">
              </div>
              <div>
                  <h5>{{result.name}}</h5>

              </div>
          </section>
      </header>
      <article>
          <h5 class="title"><span>播放全部<i></i></span><span>多选</span></h5>
          <ul>
              <template v-for="(item,index) in result.tracks">
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
       }
   },
   created(){
       this.getData1()
   },
  
   methods:{
       callback(res){
          this.result = res.result;
          console.log(this.result)
          this.showLoading = false;
       },
       getData1(){
           var self = this;
           self.getData('/playlist/detail',this.callback,{id:this.$route.params.id})
       }
   }
}
</script>
<style lang="scss">
    .song-menu{

        header{
            height: 6rem /* 450/75 */;
            background-color: #8a8d96;
            display: flex;
            align-items: center;
            padding: 0 .4rem /* 30/75 */;
            img{
                width: 3.733333rem /* 280/75 */;
                margin-right: .4rem /* 30/75 */;
            }
            section{
                @include fj()
                color:#fff;
                div{
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                }
            }
        }
        .title{
            height: 1.28rem /* 96/75 */;
            border-bottom: 1px solid #eee;
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


