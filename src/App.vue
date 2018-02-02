<template>
  <div id="app">
    
       <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件 -->
        </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件 -->
    </router-view>
    <!-- <footerCom></footerCom> -->
    <aplayer></aplayer> 
    <mt-palette-button content="+" :radius="60" ref="target"
      style="right:20px;">
      <div class="my-icon-button indexicon icon-popup" @click="sub_log(1)"><i class="iconfont icon-index"></i></div>
      <div class="my-icon-button indexicon icon-popup" @click="sub_log(2)"><i class="iconfont icon-music"></i></div>
      <div class="my-icon-button indexicon icon-popup" @click="sub_log(3)"><i class="iconfont icon-wode"></i></div>
    </mt-palette-button>      
  </div>
</template>

<script>
import footerCom from './components/footer.vue';
import aplayer from './components/aplayer.vue';
export default {
 
  name: 'app',
  created(){
    this.initRem();
   
  },
  components:{
    footerCom,
    aplayer,
  },
  methods:{
      sub_log(type){
        if(type == 1){
            this.$router.push('/index');
        } else if(type == 2){
            this.$router.push('/user');
        } else{
            this.$router.push('/myMusic');
        }
        this.$refs.target.collapse();
      }
  }

  
}
</script>

<style>
@import './assets/sass/style.scss';

.my-icon-button{
    width:.6rem /* 45/75 */;
    height:.6rem /* 45/75 */;
    border-radius:50%;
    background-color: #c94143;
    color: #fff;
    line-height:.6rem;
    text-align:center;
  }
  .mint-palette-button{
    position: fixed;
    bottom: 2rem /* 150/75 */;
    width: 1.066667rem /* 80/75 */;
    height: 1.066667rem /* 80/75 */;
    line-height: 1.066667rem /* 80/75 */;
    
  }
  .mint-main-button{
    background-color: yellowgreen;
    color:#c94143;
  }
  
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 1.2rem /* 60/75 */;
}
</style>
