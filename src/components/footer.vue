<template>
  <footer id="footer">
     
         <router-link to="/index" :class="{active:options==1}">
            <span class="tab-icon index-icon"></span>
            <p>发现音乐</p>
        </router-link>
        <router-link to="/myMusic" :class="{active:options==2}">
            <span class="tab-icon my-icon"></span>
            <p>我的音乐</p>
        </router-link>
        <router-link to="" :class="{active:options==3}">
            <span class="tab-icon fri-icon">
              
            </span>
            <p>朋友</p>
        </router-link>
        <router-link to="/user" :class="{active:options==4}">
            <span class="tab-icon account-icon"></span>
            <p>账号</p>
        </router-link>
  </footer>
</template>
<<script>
export default {
  data() {
        return {
            options: 0, //1首页 2我的音乐 3朋友 4我的
        }
    },
    computed: {
        userId() {
            return this.$store.state.userInfo.user_id;
        }
    },
    created() {
        this.judgeRouter(this.$route.path);
    },
    methods: {
        judgeRouter(path) { //判断路径
            if (path.includes('/index') || path === '/') {
                this.options = 1;
            } else if (path === '/myMusic') {
                this.options = 2;
            } else if (path.includes('/friend')) {
                this.options = 3;
            }  else {
                this.options = 4;
            }
        }
    },
    watch: {
        '$route.path'(val) {
            this.judgeRouter(val);
        }
    }
}
</script>

<style lang="scss">
    #footer{
     
    position: fixed;
    bottom: 0;
    // left: 0;
    display: flex;
    width: 100%;
    height: 49px;
    max-width: 750px;
    background-color: #fff;
    box-shadow: 0 0 5px 0px #ebebeb;
    align-items: flex-end;
    z-index:12;
    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        font-size: 11px;
        color: #b2b2b2;
        box-sizing: border-box;
        padding: 8px 0 5px;
    }
    a {
        flex: 1;
        .tab-icon {
            display: block;
        }
        .index-icon {
            width: 20px;
            height: 20px;
            background: url('../assets/100x100.png') no-repeat center/cover;
        }
        .my-icon {
            width: 18px;
            height: 20px;
            background: url('../assets/100x100.png') no-repeat center/cover;
        }
        .fri-icon {
            width: 18px;
            height: 20px;
            background: url('../assets/100x100.png') no-repeat center/cover;
        }
        .account-icon {
            width: 18px;
            height: 19.5px;
            background: url('../assets/100x100.png') no-repeat center/cover;
        }
        &.active {
            color: #c62f2f!important;
            .index-icon {
                background-image: url('../assets/100x100.png');
            }
            .my-icon {
                background-image: url('../assets/100x100.png');
            }
            .fri-icon {
                background-image: url('../assets/100x100.png');
            }
            .account-icon {
                background-image: url('../assets/100x100.png');
            }
        }
    }   

}
</style>

