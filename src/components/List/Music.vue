<template>
  <div class="list">
    <div class="all">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playCircle"></use>
        </svg>
        <span class="big">播放全部</span>
        <span class="small">(共{{tracks.length}}首)</span>
      </div>
      <div class="me">+ 收藏 <span>(4323)</span></div>
    </div>
    <div class="playlist">
      <div class="item" v-for="t,i in tracks" :key='i' @click="play(t,i)">
        <div class="left">
          <span class="index">{{i+1}}</span>
          <div class="namelist">
            <div class="name">{{t.name}}</div>
            <div class="autuor">{{t.al.name}}</div>
          </div>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icmore"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { inject,onUpdated,ref } from '@vue/runtime-core';
import {useStore } from 'vuex'
import { saveSong } from '@/js';
export default {
  name:'music',
  props:['tracks'],
  setup(props){
    const store = useStore()
    // let paused = ref(false)
    // onUpdated(()=>{
    //   console.log(props.tracks);
    // })
    function play(t,index){ 
      store.commit('setPlayIndex',index)
      store.commit('setIsPlay',true)
      store.dispatch('getLyricList',t.id)
      saveSong(t.id,t.name,t.al.picUrl)
      store.commit('setPlay',{id:t.id,name:t.name,picUrl:t.al.picUrl})
    }
    return {
      play
    }
  }
};
</script>

<style scoped lang="less">
.list {
  margin-top: 0.3rem;
  // height: 12rem;
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
</style>
