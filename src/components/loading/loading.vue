<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在跳转...'
      }
    }
  }
</script>
<style scoped lang="scss">
  .loading {
    width: 100%;
    text-align: center;
    margin-top: rem(250px);
    .desc {
      line-height: rem(20px);
      font-size: rem($font-size-small);
      color: $main-text-color;
    }
  }   
</style>
