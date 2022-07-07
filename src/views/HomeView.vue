<template>
  <div class="home">
    <topNav/>
    <swiper :imgs='imgs'/>
    <icon/>
    <song-list/>
  </div>
</template>

<script>
import topNav from '@/components/Home/topNav'
import swiper from '@/components/Home/swiper'
import icon from '@/components/Home/icon.vue'
import songList from '@/components/Home/songList'
import { onMounted, reactive } from '@vue/runtime-core'
import {getBanners} from '../until/index'
import SongList from '@/components/Home/songList.vue'
import axios from 'axios'
export default {
  name: 'HomeView',
  components: {
    topNav,
    swiper,
    icon,
    SongList
  },
  setup(){
    let imgs = reactive({
      banners:[]
    })
    onMounted(async ()=>{
      axios.get(' http://localhost:3000/banner?type=1').then(res=>{
        // console.log(res.data);
        imgs.banners = res.data.banners
      })
      let result = await getBanners(1)
      if(result.code == 200){
        imgs.banners = result.banners
      }
    })
    return{
      imgs
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  padding: 0.2rem;
  img {
    height: 3rem;
  }
}
</style>
