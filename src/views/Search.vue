<template>
  <div class="search">
    <div class="top">
      <SearchtopNav :searchKw="searchKw" @click1="search" />
      <div v-show="isshow">
        <div class="history">
          <div class="left">搜索历史</div>
          <div class="right1">
            <svg @click="clear" class="icon" aria-hidden="true">
              <use xlink:href="#icon-lajitong"></use>
            </svg>
          </div>
        </div>
        <div class="wrap-center">
          <div ref="center" class="center">
            <div
              @click="goSearch(key)"
              class="keyword"
              v-for="(key, i) in keyword"
              :key="i"
            >
              {{ key }}
            </div>
            <svg @click="biansheng" v-if="show" class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangxiazhankai-xianxingyuankuang"></use>
            </svg>
            <svg v-else @click="bianxiao" class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangshangshouqi-xianxingyuankuang"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isshow">
      <div class="hot-search">
        <div class="hot-top">
          <div class="left" @click="transition">
            <span class="title1 active" data-n="1">热搜榜</span>
            <span class="title1" data-n="2">话题榜</span>
            <span class="title1" data-n="3">视频榜</span>
          </div>
          <div class="right2">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang3"></use>
            </svg>
            <span>播放全部</span>
          </div>
        </div>
        <div class="wrap">
          <div
            @touchstart="touchStart"
            @touchmove="touchMove"
            @touchend="touchEnd"
            ref="hotContain"
            class="hot-contain"
          >
            <div ref="swiper" class="swiper">
              <hotList :searchHot="searchHot" />
            </div>
            <div class="swiper"><hotList :searchHot="searchHot" /></div>
            <div class="swiper"><hotList :searchHot="searchHot" /></div>
          </div>
          <!-- <div class="moreContain">展示更多热搜+</div> -->
        </div>
      </div>
      <MusicSpecial />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUpdated, reactive, toRefs, ref } from "vue";
import searchList2 from "@/components/searchList2";
import hotList from "@/components/Search/hotList";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onBeforeMount, watch } from "@vue/runtime-core";
import { getSearchHot, getDefaultSearch } from "@/until";
import SearchtopNav from "@/components/Search/Search-topNav";
import MusicSpecial from "@/components/Search/MusicSpecial.vue";
export default {
  name: "search",
  components: {
    searchList2,
    hotList,
    SearchtopNav,
    MusicSpecial,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    let state = reactive({
      isshow: true,
      keyword: [],
      searchKw: "",
      songCount: 0,
      songs: [],
      allMatch: [],
      defaultKeyword: "",
      searchHot: [
        {
          searchWord: "",
        },
      ],
    });
    onBeforeMount(() => {
      state.keyword =
        localStorage.getItem("keyword") &&
        JSON.parse(localStorage.getItem("keyword"));
    });
    onMounted(() => {
      getSearchHot().then((res) => {
        state.searchHot = res.data;
      });
      hide();
    });
    function search(isshow) {
      state.isshow = isshow;
    }
    function goSearch(key) {
      router.push({ path: "/musiclist", query: { keyword: key } });
      state.keyword.unshift(key);
      // 对数据去重 和再把set数据转换为数组
      state.keyword = Array.from(new Set(state.keyword));
      localStorage.setItem("keyword", JSON.stringify(state.keyword));
    }
    function clear() {
      state.keyword = [];
      localStorage.setItem("keyword", "");
    }
    let center = ref(null);
    let show = ref(true);
    const hide = () => {
      let line = 0;
      let offsetLeft = 0;
      let tags = document.querySelectorAll(".center .keyword");
      tags.forEach((item, index) => {
        if (index === 0) {
          line = 1;
          offsetLeft = item?.offsetLeft;
        } else if (item.offsetLeft === offsetLeft) {
          line++;
        }
        if (line > 2) {
          item.style.display = "none";
        }
      });
    };
    const display = () => {
      let tags = document.querySelectorAll(".center .keyword");
      tags.forEach((item) => {
        item.style.display = "block";
      });
    };
    function biansheng() {
      show.value = false;
      display();
    }
    function bianxiao() {
      show.value = true;
      hide();
    }
    let hotContain = ref(null);
    let swiper = ref(null);
    let index = ref(0);
    function changeActive(index) {
      const titles = document.querySelectorAll(".title1");
      titles.forEach((item, i) => {
        if (index === i) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }
    function transition(e) {
      let { n } = e.target.dataset;
      if (n) {
        index.value = parseInt(e.target.getAttribute("data-n")) - 1;
        hotContain.value.style.left =
          (-index.value * (swiper.value.offsetWidth + 10)) / 50 + "rem";
        changeActive(index.value);
      }
    }
    let clickX = 0;
    let currentX = 0;
    let offsetLeft = 0
    function touchStart(e) {
      clickX = e.touches[0].clientX;
      offsetLeft = hotContain.value.offsetLeft
    }
    function touchMove(e) {
      // 移动前一定要关闭过渡效果、在手势离开的时候在开启过度
      hotContain.value.style.transition = 'none'
      let nowX =  e.touches[0].clientX
      let left = (nowX-clickX+offsetLeft)/50
      if((nowX-clickX>=0 && index.value===0)) return
      if((nowX-clickX<=0 && index.value===2)) return
      hotContain.value.style.left = left + 'rem'
    }
    function touchEnd(e) {
      hotContain.value.style.transition = 'all 0.5s'
      currentX = e.changedTouches[0].clientX;
      // 向左滑
      if (clickX - currentX > 0 && clickX - currentX > swiper.value.offsetWidth / 3) {
        index.value++;
        if (index.value >= 3) {
          index.value = 2;
          return;
        }
        hotContain.value.style.left =(-index.value * (swiper.value.offsetWidth + 10)) / 50 + "rem";
      }
      // 向右滑
      if (clickX - currentX < 0 &&currentX - clickX > swiper.value.offsetWidth / 3) {
        index.value--;
        if (index.value < 0) {
          index.value = 0;
          return;
        }
        hotContain.value.style.left = (-index.value * (swiper.value.offsetWidth + 10)) / 50 + "rem";
      }
      if(Math.abs(currentX - clickX) <= swiper.value.offsetWidth / 3){
        hotContain.value.style.left = offsetLeft/50 + 'rem'
      }
    }

    watch(index, (newValue) => {
      changeActive(newValue);
    });
    return {
      ...toRefs(state),
      center,
      // handlerKeyword,
      goSearch,
      clear,
      search,
      // back,
      show,
      biansheng,
      bianxiao,
      hotContain,
      transition,
      swiper,
      touchMove,
      touchStart,
      touchEnd,
    };
  },
};
</script>

<style scoped lang="less">
.search {
  padding: 0.3rem;
  margin-bottom: 1rem;
  .top {
    .music {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right {
        border-bottom: 0.03rem solid #999;
        padding: 0.06rem 0;
        input {
          border: none;
          outline: none;
          width: 6rem;
        }
      }
    }
    .history {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.2rem 0;
      margin-top: 0.1rem;
      .left {
        font-size: 0.27rem;
        font-weight: bold;
      }
      .icon {
        width: 0.4rem;
        height: 0.4rem;
        fill: #999;
      }
    }
    .wrap-center {
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      .center {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        align-items: center;
        // height: 1.6rem;
        overflow: hidden;
        .keyword {
          padding: 0.1rem 0.34rem;
          height: 0.6rem;
          margin: 0.1rem;
          background-color: #efefef;
          border-radius: 0.5rem;
          font-size: 0.27rem;
        }
        .icon {
          float: left;
        }
      }
    }
  }
  .hot-search {
    .hot-top {
      padding: 0.2rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        color: rgba(136, 134, 134, 0.829);
        font-size: 0.24rem;
        span {
          margin-right: 0.35rem;
        }
      }
      .active {
        font-size: 0.24rem;
        color: black;
        font-weight: bold;
      }
      .right2 {
        padding: 0.1rem 0.25rem;
        border: 0.02rem solid #efefef;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        .icon {
          width: 0.2rem;
          height: 0.2rem;
        }
        span {
          margin-left: 0.06rem;
          font-size: 0.25rem;
        }
      }
    }
    .wrap {
      width: 7rem;
      // height: 8.14rem;
      border: none;
      position: relative;
      overflow: hidden;
      &::after {
        content: " _";
        display: block;
        clear: both;
      }
      // 隐藏滚轮的样式
      &::-webkit-scrollbar {
        display: none;
      }
      .hot-contain {
        // display: flex;
        width: 21rem;
        position: relative;
        left: 0;
        transition: all 0.5s;
        .swiper {
          width: 6.8rem;
          margin-right: 0.2rem;
          border: 0.01rem solid #efefef;
          border-radius: 0.2rem;
          box-shadow: 0.01rem 0.01rem 0.2rem #efefef;
          float: left;
        }
      }
    }
  }
}
</style>
