<template>
   <main>
       <!-- 搜索页 -->
       <form v-on:submit.prevent ="getSearchFinal">
        <mt-search
            v-model="keywords"
            cancel-text="取消"
            placeholder="搜索">
        </mt-search>
       </form>
        <section>
            <ul>
                <li>
                    <div>单曲</div>
                    <div>
                        <template v-for="item in adviceData.songs">
                            <router-link to="">{{item.name}}</router-link>
                        </template>
                    </div>
                </li>
                <li>
                    <div>专辑</div>
                    <div>
                        <template v-for="item in adviceData.albums">
                            <router-link to="">{{item.name}}</router-link>
                        </template>
                    </div>
                </li>
                <li>
                    <div>歌手</div>
                    <div>
                        <template v-for="item in adviceData.artists">
                            <router-link to="">{{item.name}}</router-link>
                        </template>
                    </div>
                </li>
                <li>
                    <div>MV</div>
                    <div>
                        <template v-for="item in adviceData.mvs">
                            <router-link to="">{{item.name}}</router-link>
                        </template>
                    </div>
                </li>
                <li>
                    <div>歌单</div>
                    <div>
                        <template v-for="item in adviceData.playlists">
                            <router-link to="">{{item.name}}</router-link>
                        </template>
                    </div>
                </li>
            </ul>
        </section>
   </main>
</template>
<script>
export default {
    data(){
        return {
            keywords:"",//搜索词
            adviceData:"", //搜索建议
            finalData:"",//最终搜索得到的内容
        }
    },
    created(){
    //    this.getSearch()
    },
    methods:{
        //获取建议数据
        callback(res){
            this.adviceData = res.result;
        },
        getSearchAdvice(){
            var self = this;
             self.getData('/search/suggest',this.callback,{keywords:this.keywords})
        },
        //获取最终数据
        callback1(res){
            this.finalData = res.result;
        },
        getSearchFinal(){
            var self = this;
             self.getData('/search',this.callback1,{keywords:this.keywords})
        }
    },
    watch:{
        keywords(val){
            if(val.trim() != ""){
                     this.getSearchAdvice()
            }
           
        }
    }
}
</script>
<style lang="scss">
   .mint-search{
       height: auto;
   }
</style>


