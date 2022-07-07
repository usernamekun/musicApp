<template>
  <div class="songList">
    <div class="title">
      <div class="niceSong">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="container">
      <div @click="gotoList(img.id)" class="imgsList" v-for="(img, i) in state.songList" :key="i">
        <div>
          <img :src="img.picUrl" />
          <div class="count">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            <span>{{ handlerCount(img.playCount) }}</span>
          </div>
        </div>
        <span>{{ img.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/runtime-core";
import { getSongList } from "../../until";
import {useRouter} from 'vue-router'
export default {
  name: "songList",
  setup() {
    let state = reactive({
      songList: [],
    });
    let router = useRouter()
    onMounted(async () => {
      let result = await getSongList(10);
      state.songList = result.result;
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
    function gotoList(id){
      router.push({path:'/ListView',query:{id:id}})
    }
    return {
      state,
      handlerCount,
      gotoList
    };
  },
};
</script>

<style lang="less" scoped>
.songList {
  .title {
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-between;
    .niceSong {
      font-size: 0.33rem;
      font-weight: bold;
    }
    .more {
      padding: 0.1rem 0.2rem;
      border: 0.03rem solid #efefef;
      border-radius: 0.4rem;
      font-size: 0.25rem;
    }
  }
  .container {
    width: 100%;
    overflow: auto;
    margin-top: 0.25rem;
    display: flex;
    justify-content: space-between;
    // 隐藏滚轮的样式
      &::-webkit-scrollbar{
        display: none;
      }
    .imgsList {
      display: flex;
      flex-direction: column;
      margin-right: 0.3rem;
      width: 2rem;
      position: relative;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 0.2rem;
        background-color: aqua;
      }
      span {
        font-size: 0.26rem;
      }
      .count {
        position: absolute;
        top: 0;
        right: 0.1rem;
        color: #e6e6e6;
        font-size: 0.15rem;
        display: flex;
        align-items: center;
        .icon {
          width: 0.25rem;
          height: 0.25rem;
          fill: #e6e6e6;
        }
      }
    }
  }
}
</style>
