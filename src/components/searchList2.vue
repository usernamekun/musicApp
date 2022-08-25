<template>
  <div class="list">
    <div class="all">
    </div>
    <div class="playlist">
      <div class="item" v-for="t,i in tracks" :key='i' @click="play(t,i)">
        <div class="left">
          <span class="index">{{i+1}}</span>        
          <div class="namelist">
            <div class="name">{{t.keyword}}</div>
            <!-- <div class="autuor">
              <span>{{t.name}}、</span>          
            </div> -->
          </div>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore } from 'vuex'
import { onMounted, onUpdated, reactive } from '@vue/runtime-core';
import { saveSong } from '@/js';
import { useRouter } from 'vue-router';
    const props = defineProps(['tracks','keyword'])
    const emit = defineEmits(['click1'])
    const store = useStore()
    const router = useRouter()
    let state = reactive({
      keyword:[],
      songs:[],
      songCount:0
    })
    function play(item,index){
      emit('click1',true)
      store.commit('setShow',true)
      router.push({path:'/musiclist',query:{keyword:item.keyword}})
      store.commit('setKeyword',item.keyword)
      state.keyword = props.keyword
      state.keyword.unshift(item.keyword)
      // 对数据去重 和再把set数据转换为数组
      state.keyword = Array.from(new Set(state.keyword));
      localStorage.setItem("keyword", JSON.stringify(state.keyword));
    }
    
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
        width: 0.4rem;
        height: 0.4rem;
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
        width: 0.35rem;
        height: 0.35rem;
        fill: #999;
      }
    }
  }
}
</style>
