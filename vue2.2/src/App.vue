<template>
  <div class="wrap">
    <myheader></myheader>
    <router-view keep-alive></router-view>
  </div>
</template>
<script>
  import myheader from "components/header.vue"
  export default {
    data() {
      return {
        head: this.$store.state.head
      }
    },
    components: {
      myheader: myheader
    }
  }

</script>
