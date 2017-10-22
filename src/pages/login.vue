<template>
  <div class="login">
      <mt-header fixed title="登陆"></mt-header>
      <main>
      <mt-field label="手机号" placeholder="输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field label="密码" placeholder="输入密码" type="password" v-model="password"></mt-field>
      <mt-button type="default" @click="getlogin">登录</mt-button>

      </main>
  </div>
</template>
<<script>
export default {
 data(){
     return{
         phone: '',
         password: '',
     }
 },
  created(){
  },
  methods:{
      getlogin(){
            this.$http.get('http://localhost:3000' + '/login/cellphone', {params :{ phone: this.phone, password: this.password }}).then(res => {
                 if (res.body.code == 200) {
                      var userId = res.body.account.id
                      //设置userid
                      this.setCookie('userId',userId,30)
                 }
            })
      }

  }
}
</script>

<style lang="scss" scoped>
.login {
  .mint-header {
    background-color: #fff;
    color: $main;
  }
  main {
    margin-top: 40px;
    .mint-button {
      margin-top: 0.4rem;
      width: 80%;
      color: #fff;
      border-radius: 0.533333rem;
      background-color: $main;
    }
  }
}
</style>
