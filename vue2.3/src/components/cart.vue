<template>
  <div class="menu_cart">
    <span @click="view" :attr-quantity="boughtList.num" :class="['carticon',{'empty':boughtList.bought>0?false:true}]"></span>
    <div class="carttotal">
      <p>
        ¥{{boughtList.bought}}
      </p>
    </div>
    <a @click="boughtFn" :class="{'disabled':boughtList.bought>0?false:true}" href="javascript:">去结算</a>
    <div @click="hide" :style="{display:[ bgshow == true?'block':'none' ]}" class="bg"></div>
    <div :style="{display:[ bgshow == true?'block':'none' ]}" class="cart_list">
      <ul>
        <li v-if="cartList" v-for="(item,index) in cartList">
          <span class="name">{{item.name}}</span>
          <span class="qty">X{{item.qty}}</span>
          <span class="money">¥{{item.qty * item.money}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        bgshow: false
      }
    },
    computed: {
      boughtList() {
        return this.$store.state.boughtList
      },
      cartList() {
        return this.$store.state.boughtList.list
      }
    },
    methods: {
      view() {
        if (this.boughtList.num > 0) {
          this.bgshow = true;
        };
      },
      boughtFn() {
        alert('不能跳转，点击蓝色图标可以查看列表');
      },
      hide() {
        this.bgshow = false;
      }
    }
  }

</script>
