<template>
<div class="wrap">
  <SearchtopNav :howJamp='true' :searchKw='$route.query.keyword' @click1="search"/>
  <div class="list" v-show="isshow">
    <div class="all">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playCircle"></use>
        </svg>
        <span class="big">播放全部</span>
        <span class="small">(共{{tracks.length}}首)</span>
      </div>  
    </div>
    <div class="playlist">
      <div class="item" v-for="t,i in tracks" :key='i' @click="play(t,i)">
        <div class="left">
          <span class="index">{{i+1}}</span>
          <div class="namelist">
            <div class="name">{{t.name}}</div>
            <div class="autuor">
              <span>{{t.name}}</span>          
            </div>
          </div>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icmore"></use>
        </svg>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {useStore } from 'vuex'
import { computed, nextTick, onBeforeUpdate, onMounted, onUpdated, reactive, toRefs, watch } from '@vue/runtime-core';
import { saveSong } from '@/js';
import { getSearchContain } from '@/until'
import { useRoute } from 'vue-router';
import SearchtopNav from '@/components/Search/Search-topNav'
export default {
  name:'music',
  components:{
    SearchtopNav
  },
  setup(props){
    const store = useStore()
    const route = useRoute()
    let state = reactive({
      keyword:[],
      tracks:[],
      songCount:0,
      // isshow:true
    })  
    onMounted(()=>{
      getSearch()
    })
    let keyword = computed(()=>{
      return store.state.keyword ||route.query.keyword
    })
    function getSearch(){
      getSearchContain(keyword.value).then((res) => {
        state.songCount = res.result.songCount;
        state.tracks = res.result.songs;
        // console.log(state.tracks);
        store.commit("setPlayList", state.tracks);
      });
    }
    function play(item,index){
      store.commit('setPlayIndex',index)
       store.commit('setIsPlay',true)
      store.dispatch('getLyricList',item.id)
      saveSong(item.id,item.name,item.al.picUrl)
      store.commit('setPlay',{id:item.id,name:item.name,picUrl:item.al.picUrl})
    }
    let isshow = computed(()=>{
      return store.state.isshow
    })
    watch(isshow,()=>{
      if(isshow.value){
        getSearch()
      }
    })
    function search(isshow){
      // state.isshow = isshow
      store.commit('setShow',false)
    }
    // 下次使用生命周期要三思，会不会导致别的属性无了
    // onBeforeUpdate(()=>{
    //   // console.log('111');
    //   // store.commit('setPlayList',props.tracks)
    //   getSearch()
    // })
    return {
      play,
      search,
      isshow,
      ...toRefs(state)
    }
  }
};
</script>

<style scoped lang="less">
.wrap{
  padding: 0.3rem;
.list {
  // padding: 0.1rem 0.3rem;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.1rem;
  .all {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 0.45rem;
        height: 0.45rem;
        margin-right: 0.2rem;
      }
      span{
        font-size: 0.33rem;
      }
      .small{
          font-size: 0.25rem;
          color: #ccc;
        }
    }
    .me{
      background-color: orangered;
      padding:0.2rem 0.25rem;
      color: #e6e6e6;
      font-size: 0.23rem;
      border-radius: 0.45rem;
    }
  }
  .playlist{
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 0;
      .left{
        display: flex;
        align-items: center;
        .index{
          color: #999;
          text-align: center;
          width: 0.3rem;
        }
        .namelist{
          font-size: 0.3rem;
          width: 5.5rem;
          margin-left: 0.15rem;
          .autuor{
            font-size: 0.1rem;
            color: #999;
            padding: 0.05rem 0;
          }
        }
      }
      .icon{
        width: 0.45rem;
        height: 0.45rem;
        fill: #999;
      }
    }
  }
}
}
</style>
