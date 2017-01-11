<template>
  <mt-header class="header" title="登录">
    <router-link to="/portal" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
</template>
<script>
  import Vue from 'vue'
  import {
    Header
  } from 'mint-ui'
  Vue.component('mt-header', Header);

</script>
