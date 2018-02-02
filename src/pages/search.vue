<template>
   <main>
       <!-- 搜索页 -->
       <mt-search
        v-model="keywords"
        cancel-text="取消"
        placeholder="搜索">
        </mt-search>
        <section>
            <ul>
                <li>
                    <div></div>
                    <div></div>
                </li>
            </ul>
        </section>
   </main>
</template>
<script>
export default {
    data(){
        return {
            keywords:""
        }
    },
    created(){
    //    this.getSearch()
    },
    methods:{
        callback(res){

        },
        getSearch(){
            var self = this;
             self.getData('/search/suggest',this.callback,{keywords:this.keywords})
        }
    },
    watch:{
        keywords(val){
            if(val.trim() != ""){
                     this.getSearch()
            }
           
        }
    }
}
</script>

