<template>
  <div>
    <foodhead></foodhead>
    <foodmenu></foodmenu>
    <cart></cart>
  </div>
</template>
<script>
  import foodhead from "../components/food_head.vue"
  import foodmenu from "../components/food_menu.vue"
  import cart from "../components/cart.vue"
  export default {
    data() {
      return {}
    },
    components: {
      foodhead: foodhead,
      foodmenu: foodmenu,
      cart: cart
    }
  }

</script>
