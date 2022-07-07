<template>
  
  俺是全局组件
</template>

<script>
export default {
  name:'all',
  props:['l'],
  mounted(){
    console.log(this.l);
  }
}
</script>

<style>

</style>