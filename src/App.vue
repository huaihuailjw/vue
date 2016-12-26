<template>
  <div class="wrap">
    <wrapHeader></wrapHeader>
    <router-view keep-alive></router-view>
  </div>
</template>
<script>
  import wrapHeader from './components/header.vue'
  export default {
    data() {
      return {}
    },
    components: {
      wrapHeader: wrapHeader
    }
  }

</script>
<style>
  .wrap {
    width: 800px;
    margin: 0 auto;
  }
  
  .header {
    width: 100%;
    height: 60px;
  }
  
  li {
    float: left;
    list-style: none;
    line-height: 60px;
    font-size: 14px;
    color: #ccc;
    margin-right: 20px;
  }

</style>
