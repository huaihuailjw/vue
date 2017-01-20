<template>
  <div class="menu_cart">
    <span :attr-quantity="boughtList.num" :class="['carticon',{'empty':boughtList.bought>0?false:true}]"></span>
    <div class="carttotal">
      <p>
        ¥{{boughtList.bought}}
      </p>
    </div>
    <a @click="boughtFn" :class="{'disabled':boughtList.bought>0?false:true}" href="javascript:">去结算</a>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    computed: {
      boughtList() {
        return this.$store.state.boughtList
      }
    },
    methods: {
      boughtFn() {
        if (this.boughtList.num > 0) {
          alert('跳不出去的,2333');
        };
      }
    }
  }

</script>
