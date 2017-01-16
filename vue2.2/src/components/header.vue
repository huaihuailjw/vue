<template>
  <div class="header">
    <mt-header v-if="$route.name" class="header" :title="$route.name">
      <router-link to="portal" slot="left" v-if="$route.name != '首页'">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {
    Header
  } from 'mint-ui'
  Vue.component('mt-header', Header);

</script>
<script>
  export default {
    data() {
      return {}
    }
  }

</script>
