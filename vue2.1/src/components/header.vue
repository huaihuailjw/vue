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
  } from 'mint-ui';
  Vue.component('mt-header', Header);

</script>
<style lang="scss">
  $browser-default-font-size: 64px !default;
  @function pxTorem($px) {
    @return $px / $browser-default-font-size * 1rem;
  }
  
  @mixin px2px($px) {
    [data-dpr="1"] & {
      font-size: ($px / 2) * 1px !important;
    }
    [data-dpr="2"] & {
      font-size: $px * 1px !important;
    }
    [data-dpr="3"] & {
      font-size: ($px / 2 * 3) * 1px !important;
    }
  }
  
  @mixin marginLeft($width:100) {
    margin-left: -$width / 2;
  }
  
  @mixin marginTop($height:100) {
    margin-top: -$height / 2;
  }
  
  @mixin marginCen {
    margin-left: auto;
    margin-right: auto;
  }
  
  //透明度
  @mixin opacity( $opacity:50) {
    opacity: $opacity / 100;
    filter: alpha(opacity=$opacity);
  }
  
  .mint-header.header {
    width: 100%;
    height:pxTorem(85px);
    line-height:pxTorem(85px);
    .mint-header-title{
      @include px2px(34);
    }
    .mint-button{
      height:auto;
      .mintui{
        @include px2px(34);
      }
    }
  }

</style>
