<template>
  <div>
      <mt-tabbar id="footer" :active="active" >
        <mt-tab-item id="发现音乐"  :class="{active:active==1}">
            <img slot="icon" src="../assets/100x100.png">
            发现音乐
        </mt-tab-item>
        <mt-tab-item id="我的音乐" :class="{active:active==2}">
            <img slot="icon" src="../assets/100x100.png">
            我的音乐
        </mt-tab-item>
        <mt-tab-item id="朋友" :class="{active:active==3}">
            <img slot="icon" src="../assets/100x100.png">
            朋友
        </mt-tab-item>
        <mt-tab-item id="账号" :class="{active:active==4}">
            <img slot="icon" src="../assets/100x100.png">
            账号
        </mt-tab-item>
        </mt-tabbar>
  </div>
</template>
<<script>
export default {
  props:['active']
}
</script>

<style lang="scss">
    #footer{
        position: fixed;
        background-color: rgba(57,57,59, 1);
        color: #b6b6b6;
       
        .mint-tab-item-label{
             font-size: .30rem /* 24/75 */;
              transform: scale(0.95);
        }
        .mint-tab-item-icon{
            width: .533333rem /* 40/75 */;
            height: .533333rem /* 40/75 */;
            margin: 0 auto .08rem /* 6/75 */;
        }
        .mint-tab-item{
            padding: .16rem /* 12/75 */ 0 .133333rem /* 10/75 */;
        }
        img{
            width: .48rem /* 36/75 */;
            height: .48rem /* 36/75 */;
        }
        .active{
            color: #fff;
        }
    }
</style>

