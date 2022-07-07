<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(im, i) in imgs.banners" :key="i">
        <img :src="im.pic" alt="" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
import { onMounted, onUpdated } from "@vue/runtime-core";
export default {
  name: "swiper",
  props: ["imgs"],
  setup() {
    onUpdated(() => {
      var mySwiper = new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
    });
    return {};
  },
};
</script>

<style lang="less">
.swiper-container {
  z-index: 1;
  // width: 6.5rem;
  height: 3rem;
  border-radius: 0.2rem;
  img {
    height: 3rem;
  }
}
</style>
