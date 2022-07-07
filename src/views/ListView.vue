<template>
  <div class="list">
    <img class="bg" :src="playList.coverImgUrl" alt="">
    <div class="header">
      <div class="top">
        <div class="music" @click="$router.back()">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhixiangzuo"></use>
          </svg>
          <span>歌单漫游</span>
        </div>
        <svg class="icon1" aria-hidden="true">
          <use xlink:href="#icon-kongxinwenhao"></use>
        </svg>
      </div>
      <div class="center">
        <div class="avatars">
          <img :src="state.playList.coverImgUrl" alt="" />
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            {{handlerCount(state.playList.playCount)}}
          </span>
        </div>
        <div class="right">
          <div class="title">{{playList.name}}</div>
          <div class="session">
            <img :src="playList.creator.avatarUrl" alt="" />
            <span>你的味道</span>
            <span>></span>
          </div>
          <div class="description">
            <span class="des"
              >{{playList.description}}</span
            >
            <span>></span>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
          </svg>
          <span>{{playList.commentCount}}</span>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>
          <span>{{playList.shareCount}}</span>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
          </svg>
          <span>下载</span>
        </div>
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-w_duoxuanti"></use>
          </svg>
          <span>多选</span>
        </div>
      </div>
    </div>
    <Music :tracks='playList.tracks'/>
  </div>
</template>
<script>
import { onMounted, onUpdated, reactive, toRefs } from '@vue/runtime-core';
import { useRoute } from "vue-router";
import { getMusicDetail } from "../until/index";
import Music from '@/components/List/Music'
import {useStore } from 'vuex'
export default {
  name: "ListView",
  components:{
    Music
  },
  setup() {
    const route = useRoute();
    const store = useStore()
    let state = reactive({
      list:[],
      playList:{
        creator:{},
        tracks:[]
      }
    })
    onMounted(() => {
      getMusicDetail(route.query.id).then((res)=> {
        state.playList = res.playlist
        // console.log(state.playList);
        store.commit('setPlayList',state.playList.tracks)
      });
    });
    function handlerCount(value) {
      if (value >= 100000000) {
        let res = value / 100000000;
        return res.toFixed(2) + "亿";
      } else if (value >= 10000) {
        let res = value/10000
        return res.toFixed(2) + '万'
      }
      else return value
    }
    return {
      state,
      ...toRefs(state),
      handlerCount
    };
  },
};
</script>
<style lang="less" scoped>
.list {
  margin-bottom: 0.45rem;
  .bg{
    width: 100%;
    height: auto;  
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    filter: blur(40px);
  }
  padding: 0.2rem;
  .header {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .music {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: bold;
        font-size: 0.35rem;
        text-decoration: none;
      }
      .icon {
        width: 0.5rem;
        height: 0.6rem;
        margin-right: 0.2rem;
        fill: #fff;
      }
      .icon1 {
        width: 0.4rem;
        height: 0.4rem;
        fill: #fff;
      }
    }
    .center {
      margin-top: 0.7rem;
      display: flex;
      justify-content: space-between;
      .avatars {
        position: relative;
        img {
          width: 2.3rem;
          // height: 2.3rem;
          border-radius: 0.1rem;
        }
        span{
          .icon{
            height: 0.25rem;
            width: 0.25rem;
            margin-right: 0.05rem;
          }
          position: absolute;
          top: 0;
          right: 0.1rem;
          color: #e6e6e6;
          font-size: 0.1rem;
          display: flex;
          align-items: center;
        }
      }
      .right {
        width: 4.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          color: #fff;
          font-size: 0.3rem;
          font-weight: bold;
        }
        .session {
          font-size: 0.24rem;
          color: #ccc;
          display: flex;
          align-items: center;
          padding: 0.06rem 0;
          img{
            width: 0.6rem;
            border-radius: 50%;
            margin-right: 0.15rem;
          };
          span{
            margin-right: 0.1rem;
          }
        }
        .description {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.4rem;
          color: #ccc;
          .des{
            font-size: 0.1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      
    }
    .bottom{
        margin-top: 0.4rem;
        display: flex;
        justify-content: space-around;
        div{
          display: flex;
          flex-direction: column;
          align-items: center;
          .icon{
          height: 0.5rem;
          fill:white
        }
        span{
          font-size: 0.2rem;
          color: #fff;
        }
        }
        
      }
  }
}
</style>
