<template>
    <div class="music">
      <svg @click="back" class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhixiangzuo"></use>
      </svg>
      <div class="right">
        <input
          v-model="state.searchKw"
          @input="handlerKeyword"
          @focus="handlerKeyword"
          @keydown="goto"
          type="text"
          :placeholder="defaultKeyword"
        />
      </div>
    </div>
    <searchList2 @click1='changeShow' :tracks="state.allMatch" :keyword='state.keyword' v-show="!state.isshow" />
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
import searchList2 from "@/components/searchList2";
import { getKeyWord,getDefaultSearch } from '@/until'
import { onMounted, watch } from '@vue/runtime-core';
import _ from 'lodash'
export default {
  name:'SearchtopNav',
  props:['searchKw','howJamp'],
  emits:['click1'],
  components: {
    searchList2,
  },
  setup(props,context) {
    let state = reactive({
      isshow:true,
      allMatch:[],
      searchKw:'',
      keyword:[],
      defaultKeyword:''
    })
    const router = useRouter()
    const store = useStore()
    function back() {
      if(props.howJamp){
        router.push({name:'search'});
      }else{
        router.push({path:'/'})
      }
    }
    // 按下空格跳转
    function goto(e){
      if(e.keyCode==13){
        if(state.searchKw == ''){
          router.push({path:'/musiclist',query:{keyword:state.defaultKeyword}})
          store.commit('setKeyword',state.defaultKeyword)
          state.keyword.unshift(state.defaultKeyword)
        }else{
          router.push({path:'/musiclist',query:{keyword:state.searchKw}})
          store.commit('setKeyword',state.searchKw)
          state.keyword.unshift(state.searchKw)
        }
        // 对数据去重 和再把set数据转换为数组
        state.keyword = Array.from(new Set(state.keyword));
        localStorage.setItem("keyword", JSON.stringify(state.keyword));
      }
    }
    onMounted(function () {
      state.searchKw = props.searchKw
      state.keyword = localStorage.getItem("keyword")
        ? JSON.parse(localStorage.getItem("keyword"))
        : [];
        getDefaultSearch().then(res=>{
        state.defaultKeyword = res.data.realkeyword
      })
    });
    // 节流操作，优化操作
    const handlerKeyword = _.throttle(function(){
      if (state.searchKw == "") {
        state.isshow = true;
        router.push('/search')
      } else {
        state.isshow = false;
        getKeyWord(state.searchKw).then(function (res) {
          state.allMatch = res.result.allMatch;
        });
      }
      context.emit('click1',state.isshow)
    },500)
    function changeShow(value){
      state.isshow = value
    }
    return {
      state,
      back,
      handlerKeyword,
      changeShow,
      goto,
      ...toRefs(state)
    }
  }
};
</script>

<style scoped lang="less">
  .music {
    // padding: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      border-bottom: 0.03rem solid #999;
      padding: 0.06rem 0;
      input {
        border: none;
        outline: none;
        width: 6rem;
      }
    }
  }
</style>
