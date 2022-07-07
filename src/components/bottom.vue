<template>
  <div v-show="$store.state.play.id">
    <div v-show="isshow" class="action" @click="isshow = !isshow">
      <div class="name">
        <img :src="$store.state.play.picUrl" alt="" />
        <span>{{ $store.state.play.name }}</span>
        <!-- <img :src="list[playCurrentIndex].al.picUrl" alt="" />
        <span>{{ list[playCurrentIndex].name }}</span> -->
      </div>
      <div class="font">
        <span @click.stop="changeBandler">
          <svg v-if="paused" class="icon" id="icon1" aria-hidden="true">
            <use xlink:href="#icon-bofang2"></use>
          </svg>
          <svg v-else class="icon" id="icon1" aria-hidden="true">
            <use xlink:href="#icon-zanting"></use>
          </svg>
        </span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
    </div>
    <play-music
      :play="changeBandler"
      @back="isshow = !isshow"
      v-show="!isshow"
      :paused="paused"
      :playDetail="list[playCurrentIndex]"
      :totalTime="$refs.audio && $refs.audio.duration"
      @changeCurrentTime="changeCurrentTime"
    />
    <!-- 33894312 -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${$store.state.play.id}.mp3 `"
    ></audio>
  </div>
</template>
<script>
import { saveSong } from "@/js";
import { reactive, ref } from "@vue/reactivity";
import { mapState, useStore } from "vuex";
import {
  computed,
  onMounted,
  onUpdated,
  provide,
  watch,
} from "@vue/runtime-core";
import playMusic from "@/components/playMusic.vue";
export default {
  components: {
    playMusic,
  },
  setup() {
    const store = useStore();
    let isshow = ref(true);
    let list = computed(function () {
      return store.state.playList || [];
    });
    let playCurrentIndex = computed(function () {
      return store.state.playCurrentIndex;
    });
    // 获取ref标签的方法
    let audio = ref(null);
    let paused = ref(true);
    function changeBandler() {
      if (paused.value) {
        audio.value.play();
        // 设置音量
        audio.value.volume = 0.06;
        saveSong(
          list.value[playCurrentIndex.value].id,
          list.value[playCurrentIndex.value].name,
          list.value[playCurrentIndex.value].al.picUrl
        );
        // saveSong()
        clearInterval(store.state.intervaledId);
        updateTime();
        paused.value = false;
        store.commit("setIsPlay", true);
      } else {
        audio.value.pause();
        paused.value = true;
        store.commit("setIsPlay", false);
        // 暂停定时器
        clearInterval(store.state.intervaledId);
      }
    }
    let isPlay = computed(() => {
      return store.state.isPlay;
    });
    let id = computed(() => {
      return store.state.play.id;
    });
    watch([playCurrentIndex, id], (newValue) => {
      if (isPlay.value) {
        setTimeout(() => {
          // 开启定时器之前关掉之前的定时器
          clearInterval(store.state.intervaledId);
          audio.value.play();
          audio.value.volume = 0.06;
          updateTime();
          paused.value = false;
        }, 0);
      }
    });
    function changeCurrentTime(time) {
      // 开启定时器之前关掉之前的定时器
      clearInterval(store.state.intervaledId);
      audio.value.currentTime = time;
      updateTime();
    }
    // 更新开始播放时的时间
    // 注意定时器一个坑每次开启下一个定时器之前必须关掉上一个定时器，不然光频
    //    暂停定关闭时器是不够的，定时器不关闭的话会一直叠加
    function updateTime() {
      store.state.intervaledId = setInterval(() => {
        store.commit("UPDATETIME", audio.value.currentTime);
      }, 100);
    }
    provide("audio", audio);
    return {
      playCurrentIndex,
      list,
      paused,
      changeBandler,
      audio,
      isshow,
      saveSong,
      changeCurrentTime,
    };
  },
};
</script>
<style lang="less">
.action {
  width: 100%;
  position: fixed;
  height: 1.2rem;
  bottom: 0;
  border-top: 0.01rem solid #efefef;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    font-size: 0.28rem;
    display: flex;
    align-items: center;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin-right: 0.2rem;
    }
  }
  .font {
    padding: 0.17rem 0;
    display: flex;
    span {
      margin-right: 0.47rem;
    }
    #icon1 {
      fill: black;
    }
  }
}
</style>
