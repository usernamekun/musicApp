<template>
  <!-- {{$refs.audio.paused}} -->
  <router-view />
  <bottom v-show="$route.meta.showFoot != false" />
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import { mapState, useStore } from "vuex";
import { computed, onMounted, onUpdated, provide, watch } from "@vue/runtime-core";
import playMusic from "@/components/playMusic.vue";
import bottom from '@/components/bottom'
import Bottom from './components/bottom.vue';
export default {
  components: {
    playMusic,
    bottom,
    Bottom
  },
  setup() {
    return {
    };
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "微软雅黑";
}
.icon {
  width: 0.45rem;
  height: 0.45rem;
}
// .action {
//   width: 100%;
//   position: fixed;
//   height: 1.2rem;
//   bottom: 0;
//   border-top: 0.01rem solid #efefef;
//   background-color: #fff;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   .name {
//     font-size: 0.28rem;
//     display: flex;
//     align-items: center;
//     img {
//       width: 0.8rem;
//       height: 0.8rem;
//       border-radius: 50%;
//       margin-right: 0.2rem;
//     }
//   }
//   .font {
//     padding: 0.17rem 0;
//     display: flex;
//     span {
//       margin-right: 0.47rem;

//     }
//     #icon1{
//       fill: black;
//     }
//   }
// }
</style>
