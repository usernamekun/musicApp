<template>
  <div class="playMusic">
    <div class="bg"><img :src="state.picUrl" alt="" /></div>
    <div class="top">
      <div class="left">
        <svg @click="$emit('back')" class="icon" id="icon1" aria-hidden="true">
          <use xlink:href="#icon-zhixiangzuo"></use>
        </svg>
        <div class="title">
          <!-- <marquee>{{ playDetail.al.name }}</marquee> -->
          <span>{{ state.name }}</span>
        </div>
      </div>
      <div class="right">
        <svg class="icon" id="icon1" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="center" v-if='false'>
      <img class="wrap" src="@/assets/disc-plus.png" />
      <img class="bgimg" :src="playDetail.al.picUrl" />
    </div>
    <div v-else class="center2" ref="p">
      <div class="lyric" v-for="item,i in ly" :key="i">
        <p :class="{active:currentTime*1000>=item.time&&currentTime*1000<item.pre}">{{item.lyric}}</p>
      </div>
    </div>
  <!-- 播放器 -->
    <div class="container">
      <div class="controls">
        <span class="currentTime">{{formatTime(currentTime)}}</span>
        <div class="totalProgress" @click="handlerProgress">
          <div ref="currentProgress" class="currentProgress">
            <div v-drag="{totalTime,changeTime}" class="point"></div>
          </div>
        </div>
        <span class="totalTime">{{formatTime(totalTime)}}</span>
      </div>
    </div>
    <div class="bottom">
      <div class="top1"></div>
      <div class="bottom1">
        <div class="left">  
          <svg class="icon" id="icon1" aria-hidden="true">
            <use xlink:href="#icon-xunhuan"></use>
          </svg>
        </div>
        <div class="point">
          <svg class="icon" id="icon1" aria-hidden="true" @click="goPlay(-1)">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
          <svg v-if="paused" class="icon" id="icon2" aria-hidden="true" @click="play">
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <svg v-else class="icon" id="icon2" aria-hidden="true" @click="play">
            <use xlink:href="#icon-zanting"></use>
          </svg>
          <svg class="icon" id="icon1" aria-hidden="true" @click="goPlay(1)">
            <use xlink:href="#icon-xiayigexiayishou"></use>
          </svg>
        </div>
        <div class="right">
          <svg class="icon" id="icon1" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { computed, inject, nextTick, onMounted, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import {saveSong,formatTime} from '@/js'
import usePercent from '@/js/usePercent'
export default {
  name: "playMusic",
  props: ["playDetail",'paused','play','saveSong','totalTime'],
  emits:['changeCurrentTime','back'],
  setup(props,context) {
    const store = useStore()
    // 获得歌词
    let ly = computed(()=>{
      return store.getters.getLyric
    })
    // 获取当前的时间
    let currentTime = computed(()=>{
      return store.state.currentTime
    })
    // 获取当前音乐播放状态
    let state = computed(()=>{
      return store.state.play
    })
    let p = ref(null)
    onMounted(()=>{
      store.dispatch('getLyricList',props.playDetail.id)
      // 开始监听歌词变化
      closeW()
    })
    let totalTime = props.totalTime
    let playList = computed(()=>{
      return store.state.playList
    })
    let index = computed(()=>{
      return store.state.playCurrentIndex
    })
    let list = computed(function () {
      return store.state.playList || [];
    });
    // 按顺序切换歌曲的方法
    function changeMusic(n){
      if(index.value+n<0){
          store.commit('setPlayIndex',playList.value.length-1)
        }else if(index.value+n > playList.value.length-1){
          store.commit('setPlayIndex',0)
        }else{
          store.commit('setPlayIndex',index.value+n)
        }
        store.commit('setIsPlay',true)
        // 这里得到的index.value已经是更新后的了  不需要再+n了 记住这个坑
        // let item = list.value[index.value+n]
        let item = list.value[index.value]
        store.dispatch('getLyricList',item.id)
        console.log(item);
        saveSong(item.id,item.name,item.al.picUrl)
        store.commit('setPlay',{id:item.id,name:item.name,picUrl:item.al.picUrl})
    }
    // 切换歌曲
    function goPlay(n){
      changeMusic(n)
    }
    
    let currentProgress = ref(null)
    watch(currentTime,(newValue)=>{
      let bili = newValue/props.totalTime*100
      currentProgress.value.style.width = bili + '%'
      if(formatTime(newValue) == formatTime(props.totalTime)){
        // 播放完了 切换歌曲
        changeMusic(1)
      }
    }) 
    
    let index1 = ref(0)
    let unWatch = null
    // 监听播放时间方便处理歌词
    const closeW = () => {
      unWatch = watch(currentTime,(newValue)=>{
      // 处理歌词
      // 后面加个’‘为了防止没有歌词的而报错找不到clientHeight
      // let p1 = document.querySelector('p.active')||''
      for(let i=0;i<ly.value.length;i++){
        if(newValue*1000>=ly.value[i].time&&newValue*1000<ly.value[i].pre){
          index1.value = i
        }
      }
      // let a = p1.clientHeight?p1.clientHeight:0 //44
      p.value.scrollTop = 44*(index1.value-3)
    })
    }
    // 保证在DOM挂载好，在执行才能获取到p实例
    // 实现触摸滚动时，停止歌词的自动滚动，在停止滚动时继续开启触摸滚动
    nextTick(()=>{
      p.value.ontouchstart = () => {
        document.ontouchmove = (e) => {
          unWatch()
        }
        document.ontouchend = (e)=>{
          // 晚一点开启，更加流畅点
          setTimeout(()=>{
            closeW()
          },500)
          document.ontouchmove = null
          document.ontouchend = null
        }
      }
    })
    // 处理进度条
    function handlerProgress(event){
      // 获得百分比
      const percent = usePercent(event)
      // 修改当前进度条的宽度
      currentProgress.value.style.width = percent*100+'%'
      // 修改当前播放的时间 
      context.emit('changeCurrentTime',props.totalTime*percent)
    }
    // 给自定义指令传递参数
    function changeTime(time){
      context.emit('changeCurrentTime',time)
    }
    
    return {
      p,
      ly,
      currentTime,
      goPlay,
      state,
      formatTime,
      handlerProgress,
      currentProgress,
      changeTime,
    }
  },
};
</script>

<style scoped lang="less">
.playMusic {
  padding: 0.2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
  z-index: 99;
  .bg {
    img {
      position: absolute;
      width: 100vw;
      height: 100vh;
      filter: blur(60px);
      z-index: -1;
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      font-size: 0.25rem;
      color: white;
      marquee {
        width: 4rem;
        margin-left: 0.2rem;
      }
      .icon {
        fill: #fff;
      }
    }
  }
  .center {
    position: relative;
    padding: 2rem 0;
    text-align: center;
    .wrap {
      width: 4rem;
    }
    .bgimg {
      position: absolute;
      width: 2.7rem;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-radius: 50%;
      z-index: -1;
    }
  }
  .center2{
    margin-top: 1rem;
    height: 8.9rem;
    overflow: scroll;
    text-align: center;
    color: #fff;
    font-size: 0.3rem;
    padding-bottom: 4rem;
    p{
      padding: 0.18rem 0;
      height: 0.88rem;
    }
    .active{
      color: red;
      font-size: 0.4rem;
    }
  }
  .container{
    padding: 0.2rem 0.1rem;
    margin-top: 0.5rem;
    .controls{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .totalProgress{
        width: 5.5rem;
        height: 0.03rem;
        background-color: rgba(204, 204, 204, 0.788);
        .currentProgress{
          width: 0%;
          height: 100%;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: right;
          .point{
            width: 0.12rem;
            height: 0.12rem;
            border-radius: 50%;
            background-color: #fff;
            transform:translateX(0.06rem)
          }
        }
      }
      .currentTime{
        color: #efefef;
      }
      .totalTime{
        color: #999;
      }
    }
  }
  .bottom {
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    width: 100%;
    padding: 0 0.2rem;
    .bottom1 {
      display: flex;
      padding: 0.3rem 0.6rem;
      justify-content: space-between;
      align-items: center;
      .point{
        display: flex;
        align-items: center;
      }
      .icon {
        fill: #fff;
        width: 0.4rem;
        height: 0.4rem;
      }
      #icon2 {
        fill: black;
        height: 0.8rem;
        width: 0.8rem;
        margin: 0 0.3rem;
      }
    }
  }
}
</style>
