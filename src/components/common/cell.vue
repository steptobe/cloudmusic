<template>
    <mt-cell :title="title" :to="path" is-link class="cell" :value="value||''">
        <span class="tab" :class="icon" slot="icon" ><i :class="img" class="iconfont"></i></span>
    </mt-cell>
</template>
<script>
export default {
    props: ['title', 'path', 'icon', 'value','img']
}
</script>
<style lang="scss">
.cell {
    font-size: 0.32rem;
    color: #666;
    height: 1.1rem;
    line-height: 1.1rem !important;
    display: flex;
    min-height: 0.96rem;
    align-items: center;
    border-bottom: 1px solid #fff;
    &:last-child {
        border-bottom: none;
    }
    .mint-cell-mask::after{
        background-color: transparent;
        border-bottom: 1px solid #eee;
    }
    .iconfont{
        font-size: .533333rem /* 40/75 */;
        color:$main;
    }
    &:before{
        content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    bottom: 0px;
    height: .02rem;
    z-index: 11;
    width: 100%;
    background-color: #f0f0f0;
    }
    .mint-cell-text{
        font-size: 0.32rem;
    }
    .mint-cell-value.is-link {
        margin-right: 0.8rem;
        font-size: 0.32rem;
        color: #999;
    }
    .tab {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .mint-cell-wrapper .mint-cell-title span:first-child {
                width: 0.6rem;
                height: 55px;
                background-color: #fff;
                z-index: 11;
            }  
    .mint-cell-wrapper {
        padding: 0;
        .mint-cell-title {
            display: flex;
            align-items: center;
            span:first-child {
                width: 1.2rem;
            }
        }
    }
}
.mint-cell{
        min-height: 0.96rem;
    }
</style>