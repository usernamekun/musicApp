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
    </div>
    <div class="playlist">
      <div class="item" v-for="t,i in tracks" :key='i' @click="play(t,i)">
        <div class="left">
          <span class="index">{{i+1}}</span>
          <div class="namelist">
            <div class="name">{{t.name}}</div>
            <div class="autuor">
              <span v-for="a,i in t.artists" :key="i">{{a.name}}、</span>          
            </div>
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
import {useStore } from 'vuex'
import { onMounted, onUpdated } from '@vue/runtime-core';
import { saveSong } from '@/js';
export default {
  name:'music',
  props:['tracks'],
  setup(props){
    const store = useStore()
    function play(item,index){
      store.commit('setPlayIndex',index)
      store.dispatch('getLyricList',item.id)
      saveSong(item.id,item.name,item.al.picUrl)
      store.commit('setPlay',{id:item.id,name:item.name,picUrl:item.al.picUrl})
    }
    // 下次使用生命周期要三思，会不会导致别的属性无了
    onUpdated(()=>{
      // store.commit('setPlayList',props.tracks)
    })
    return {
      play
    }
  }
};
</script>

<style scoped lang="less">
.list {
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
</style>
