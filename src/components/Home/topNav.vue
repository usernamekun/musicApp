import { useRouter } from 'vue-router';
<template>
  <div class="topBar">
    <div class="left"><i class="iconfont icon-31liebiao"></i></div>
    <div class="center">
      <span @click="gotoMe">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="right" @click="gotoSearch">
      <i class="iconfont icon-sousuo"></i>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name:'topNav',
  setup() {
    const router = useRouter()
    function gotoSearch(){
      router.push({name:'search'})
    }
    function gotoMe(){
      router.push({name:'me'})
    }
    return {
      gotoSearch,
      gotoMe
  }
}
}
</script>

<style scoped lang="less">
.topBar {
  padding: 0.2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .center {
    color: #999;
    width: 5rem;
    display: flex;
    justify-content: space-around;
    .active {
      color: black;
      font-weight: bold;
    }
  }
}
</style>
