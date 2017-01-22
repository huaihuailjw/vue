<template>
  <div>
    <filterHeader></filterHeader>
    <shop></shop>
  </div>
</template>
<script>
  import filterHeader from "../components/header1.vue"
  import shop from "../components/shop.vue"
  export default {
    components: {
      filterHeader: filterHeader,
      shop: shop
    },
    data() {
      return {}
    },
    methods: {}
  }

</script>
