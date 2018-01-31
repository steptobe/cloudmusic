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
    <footerCom></footerCom>
    <aplayer></aplayer>       
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
  }
  
}
</script>

<style>
@import './assets/sass/style.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 1.2rem /* 60/75 */;
}
</style>
