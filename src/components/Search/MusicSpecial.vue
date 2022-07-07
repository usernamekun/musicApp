<template>
  <div>
    <span class="title">音乐专区</span>
    <div class="sort-contain" >
      <small-card
        v-for="(item, index) in scliceCard"
        @click="gotoArtistList(index)"
        :key="index"
        :title="item.title"
        :icon="item.icon"
        :content="item.content"
        :type="item.type"
      ></small-card>
    </div>
    <div class="more-btn">
      <div @click="showMore" v-show="isshowMore" class="more">展开更多专区+</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import SmallCard from "@/components/Search/smallCard";
import { onMounted } from "vue";
import { useRouter } from 'vue-router';
export default {
  components: {
    SmallCard,
  },
  setup() {
    let state = reactive({
      smallCard: [
        {
          title: "歌手分类",
          icon: "icon-touxiang",
          content: "",
          type: "bgray",
        },
        {
          title: "曲风分类",
          icon: "icon-icon",
          content: "查查你的专属曲风偏好",
          type: "borangered",
        },
        {
          title: "影视原声专区",
          icon: "icon-shipin",
          content: "听歌追剧好时光",
          type: "sbrown",
        },
        {
          title: "电音专区",
          icon: "icon-ziyuan43",
          content: "全球热门电音嗨翻现场",
          type: "bblue",
        },
        {
          title: "说唱专区",
          icon: "icon-huaban",
          content: "说唱人物志Vol 6 Travis Scott",
          type: "borange",
        },
        {
          title: "摇滚专区",
          icon: "icon-mianxingyaoguntubiao",
          content: "国摇新生势力等你来听",
          type: "bpurple",
        },
        {
          title: "古典专区",
          icon: "icon-piano",
          content: "大咖来了Vol 2:古典VS流行",
          type: "bbrown",
        },
        {
          title: "ACG专区",
          icon: "icon-16gl-A",
          content: "测测你是ACG大粉头吗",
          type: "sred",
        },
        {
          title: "DJ专区",
          icon: "icon-chaoliunengguancedian",
          content: "潮流网络热歌一网打尽",
          type: "spurple",
        },
        {
          title: "亲自专区",
          icon: "icon-haizi",
          content: "陪伴宝贝快乐成长",
          type: "syellow",
        },
        {
          title: "中国特色专区",
          icon: "icon-ziyuan9",
          content: "了解中国传统音乐文化",
          type: "bred",
        },
        {
          title: "经典专区",
          icon: "icon-jingdianbiaoge",
          content: "致敬时代 留住经典",
          type: "sgload",
        },
      ],
      scliceCard: [],
      isshowMore: true
    });
    onMounted(() => {
      state.scliceCard = state.smallCard.slice(0, 6);
    });
    function showMore() {
      state.scliceCard = state.smallCard
      state.isshowMore = false
    }
    const router = useRouter()
    function gotoArtistList(i){
      if(i===0){
        router.push('/artistlist')
      }
    }
    return {
      ...toRefs(state),
      showMore,
      gotoArtistList
    };
  },
};
</script>

<style scoped lang="less">
.title {
  font-weight: bold;
}
.sort-contain {
  width: 100%;
  display: flex;
  justify-content: space-between;
  transition: all 500;
  flex-wrap: wrap;
  .sort-item {
    margin-top: 0.2rem;
    width: 48%;
    padding: 0.4rem 0.2rem;
    color: #fff;
    font-weight: bold;
    background-color: aqua;
    border-radius: 0.2rem;
  }
}
.more-btn {
  width: 100%;
  .more {
    width: 100%;
    text-align: center;
    padding: 0.07rem 0;
    color: #999;
  }
}
</style>
