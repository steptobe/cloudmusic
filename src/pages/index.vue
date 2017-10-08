<template>
  <div class="hello">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in data" :key="item.encodeId">
          <a href="javascript:;">
            <img :src="item.pic" :alt="item.pic">
          </a>
      </mt-swipe-item>
    </mt-swipe>

    <div><i class="iconfont icon-search_light" ></i></div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: ''
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    callback(res) {
      this.data = res.banners

    },
    getdata() {
      var self = this
      self.getData('/banner', this.callback)

      console.log('data' + self.msg)
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1,
h2 {
  font-weight: normal;
}
.indexicon {
      font-size: 22px;
      color: #26a2ff;
      display: inline-block;
      width: 30px;
      vertical-align: middle;
}
.mint-swipe-item a {
  display: block;
  height: 5.6rem/* 420/75 */;
  width: 100vw;
}
.mint-swipe-item img{
  width: 100%;
  height: 5.6rem;
}
.mint-swipe-items-wrap>div {
    position: absolute;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    width: 100%;
    height: 100%;
    display: none;
}
.mint-swipe-items-wrap>div.is-active {
    display: block;
    -webkit-transform: none;
    transform: none;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
