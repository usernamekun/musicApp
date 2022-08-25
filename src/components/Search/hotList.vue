<template>
  <div class="contain">
    <div ref="item" class="item" @click="go(item)" :class="{active:i<=2}" v-for="(item, i) in searchHot" :key="i">
      <span class="index">{{ i + 1 }}</span>
      <span class="name">{{ item.searchWord }}</span>
    </div>
    <div class="containMore">展示更多热搜+</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core';
import {useRouter} from 'vue-router'
defineProps(['searchHot'])
const router = useRouter()
const go = (item) => {
  console.log(item);
  // router.push({name:'search'})
}
</script>

<style scoped lang="less">
.contain {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.2rem 0.1rem;
  .item {
    width: 50%;
    display: flex;
    font-size: 0.26rem;
    padding: 0.2rem 0.1rem;
    .index {
      width: 0.5rem;
      color: #999;
    }
  }
  .containMore{
    text-align: center;
    width: 100%;
  }
}
.active{
  .index{
    color: red!important;
  }
  .name{
    font-weight: bold;
  }
}
</style>
