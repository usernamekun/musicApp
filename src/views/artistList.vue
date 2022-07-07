<template>
  <div class="contain">
    <div class="top-wrap">
      <svg @click="back" class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhixiangzuo"></use>
      </svg>
      <div class="top-title">歌手分类</div>
    </div>
    <div class="sort-country">
      <div ref="country" class="country" @click="selectCountry">
        <span data-n="1">华语</span>
        <span data-n="2">欧美</span>
        <span data-n="3">日本</span>
        <span data-n="4">韩国</span>
        <span data-n="5">其它</span>
      </div>
      <div @click="selectSex" ref="sex" class="sex">
        <span data-n="1">男</span>
        <span data-n="2">女</span>
        <span data-n="3">乐队/组合</span>
      </div>
    </div>
    <div class="main">
      <div class="title">热门歌手</div>
      <div class="artistList">
        <div class="item" v-for="(item, i) in artists" :key="i">
          <div class="left">
            <img :src="item.img1v1Url" alt="" />
            <span class="name">{{ item.name }}</span>
          </div>
          <div class="right">
            <span class="guanzhu">+&nbsp;关&nbsp;注</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import { getSongerList } from "@/until";
import { useRouter } from "vue-router";
export default {
  name: "artistlist",
  setup() {
    const state = reactive({
      artists: {},
      type: 0,
      area: 0,
    });
    function getArtistList(type = -1, area = -1) {
      getSongerList({ type, area }).then((res) => {
        // console.log(res.artists);
        state.artists = res.artists;
      });
    }
    const router = useRouter();
    function back() {
      router.back();
    }
    onMounted(() => {
      getArtistList();
    });
    const country = ref(null);
    const sex = ref(null);
    function selectCountry(e) {
      // dataset可以取代getAttribute获得元素中自定义的属性
      let { n } = e.target.dataset;
      if (n) {
        let index = parseInt(e.target.getAttribute("data-n"));
        country.value.childNodes.forEach((item, i) => {
          if (index === i + 1) {
            item.classList.add("active");
            if (!state.type) {
              sex.value.children[0].classList.add("active");
            }
          } else {
            item.classList.remove("active");
          }
        });
        if (!state.type) {
          state.type = 1;
        }
        switch (index) {
          case 1:
            state.area = 7;
            break;
          case 2:
            state.area = 96;
            break;
          case 3:
            state.area = 8;
            break;
          case 4:
            state.area = 16;
            break;
          case 5:
            state.area = 0;
            break;
          default:
            break;
        }
      }
      getArtistList(state.type, state.area);
    }
    function selectSex(e) {
      let {n} = e.target.dataset;
      if (n) {
        let index = parseInt(e.target.getAttribute("data-n"));
        sex.value.childNodes.forEach((item, i) => {
          if (index === i+1) {
            item.classList.add("active");
            if (!state.area) {
              country.value.children[0].classList.add("active");
            }
          } else {
            item.classList.remove("active");
          }
        });
        if (!state.area) {
          state.area = 7;
        }
        switch (index) {
          case 0:
            state.type = 1;
            break;
          case 1:
            state.type = 2;
            break;
          case 2:
            state.type = 3;
            break;
          default:
            break;
        }
        getArtistList(state.type, state.area);
      }
    }
    return {
      ...toRefs(state),
      back,
      selectCountry,
      country,
      selectSex,
      sex,
    };
  },
};
</script>

<style scoped lang="less">
.contain {
  .top-wrap {
    display: flex;
    align-items: center;
    padding: 0.2rem;
  }
  .top-title {
    font-size: 0.3rem;
    font-weight: bold;
    margin-left: 0.3rem;
  }
  .sort-country {
    color: #999;
    padding: 0.2rem;
    margin-top: 0.1rem;
    .active {
      color: orangered;
    }
    span {
      margin-right: 0.5rem;
    }
    .sex {
      padding: 0.2rem 0.15rem;
    }
  }
  .main {
    .title {
      color: #999;
      background-color: #ccc;
      padding: 0.1rem 0.2rem;
    }
    .artistList {
      padding: 0 0.2rem;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem 0;
        .left {
          display: flex;
          align-items: center;
          img {
            width: 0.8rem;
            border-radius: 50%;
            margin-right: 0.3rem;
          }
        }
        .right {
          padding: 0.06rem 0.2rem;
          border: 0.03rem solid orangered;
          border-radius: 1rem;
          color: orangered;
        }
      }
    }
  }
}
</style>
