<template>
  <div v-drag class="contain"></div>
</template>

<script>
export default {
    data() {
      return {
      }
    },
};
</script>

<style scoped lang="less">
.contain{
  width: 2rem;
  height: 2rem;
  background-color: aqua;
  margin: 2rem auto;
}
</style>
