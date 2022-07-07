<template>
  
</template>

<script>
import { computed, onBeforeMount, onMounted, reactive } from '@vue/runtime-core'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
  name:'me',
  setup() {
    const store = useStore()
      const route = useRoute()
    let userInfo = computed(()=>{
      return store.state.userInfo
    })
    
    onBeforeMount(()=>{
      store.dispatch('getUserInfo',route.query.id)
    })
    return {
      userInfo
    }
  }
}
</script>

<style>

</style>