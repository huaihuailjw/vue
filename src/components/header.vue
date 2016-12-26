<template>
  <div class="header">
    <ul>
      <li v-for="item in header">
        <a :href="item.href">{{item.List_nav}}</a>
      </li>
    </ul>
  </div>
</template>
<script>
  import nav from '../json/header.js'
  export default {
    data() {
      return {
        header: nav
      }
    }
  }

</script>
