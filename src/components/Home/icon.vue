<template>
  <div class="iconList">
    <div v-for="icon,i in state.icons" :key='i'>
      <img :src="icon.iconUrl">
      <span>{{icon.name}}</span>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/runtime-core';
import {getIconList} from '@/until'
export default {
  name: "icon",
  setup(){
    let state = reactive({
      icons:[]
    })
    onMounted(()=>{
      getIconList().then(res=>{
        state.icons = res.data
      })
    })
    return {
      state
    }
  }
};
</script>

<style scoped lang='less'>
.iconList{
  width: 100%;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  // 隐藏滚轮的样式
      &::-webkit-scrollbar{
        display: none;
      }
  div{
    padding: 0.3rem 0;
    margin-right: 0.43rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      background-color: rgb(244, 29, 0);
      border-radius: 50%;
      width: 1rem;
    }
    span{
      font-size: 0.1rem;
    }
  }
}
</style>
