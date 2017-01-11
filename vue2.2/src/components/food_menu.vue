<template>
  <div class="menu" v-if="food">
    <div v-if="foodnav == 0 && food.menu_list == undefined" class="menu-nodata">
      <p>没有商品</p>
      <p>该商家还未上传商品</p>
    </div>
    <!-- 商品 -->
    <div v-else-if="foodnav == 0 && food.menu_list" class="menu_main" :style="{height:menuHeight}">
      <div class="menu_nav">
        <ul>
          <li @click="menu_navFn(item.name,index)" :class="[menuClass == index ? 'active' : '']" v-for="(item,index) in food.menu_nav"
            v-if="item.name == '热销榜'">
            <img src="static/images/fire.jpeg" />
            <span>{{item.name}}</span>
          </li>
          <li @click="menu_navFn(item.name,index)" :class="[menuClass == index ? 'active' : '']" v-else>
            <span v-if="item.num != 0" class="num">{{item.num}}</span>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="menu_list">
        <dl v-for="(item,index) in food.menu_list">
          <dt>
            <div class="title">
              <strong>{{item.title[0]}}</strong>
              <span>{{item.title[1]}}</span>
            </div>
          </dt>
          <dd v-for="(item,index) in item.food">
            <div class="img">
              <img :src="'static/images/'+item.img" />
            </div>
            <section>
              <div class="head">
                {{item.name}}
              </div>
              <p>
                <span>月售{{item.sales}}份</span>
                <span>好评率{{item.score}}%</span>
              </p>
              <strong>{{item.money}}</strong>
              <div class="entitybutton">
                <a @click="min(item,index)" v-show="(item.qty>0)" class="red" href="javascript:">
                  <img src="static/images/red.png" />
                </a>
                <span v-show="(item.qty>0)">{{item.qty}}</span>
                <a @click="add(item,index,$event)" class="add" href="javascript:">
                  <img src="static/images/add.png" />
                </a>
              </div>
            </section>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 商家 -->
    <div v-else="foodnav == 1" class="merchants">
      这里是商家
    </div>
  </div>
</template>
<script>
  function htmlHeight() {
    return document.documentElement.clientHeight -
      document.querySelector('.shopheader').clientHeight -
      document.querySelector('.menu_cart').clientHeight + "px";
  }
  import cart from '../components/cart.vue'
  export default {
    data() {
      return {
        menuClass: 0,
        menuHeight: 0,
        cache: true
      }
    },
    components: {
      cart: cart
    },
    computed: {
      food() {
        return this.$store.state.food[0];
      },
      foodnav() {
        return this.$store.state.foodnav;
      },
      menuHeight() {
        return htmlHeight();
      }
    },
    // directives: {
    //   scroll(that, definition) {
    //     definition.value = 1;
    //     that.addEventListener('scroll', function (event) {
    //       const scrollTop = that.scrollTop;
    //       switch (true) {
    //         case scrollTop > that.children[0].clientHeight:
    //           this.menuClass = 1;
    //           break;
    //         case scrollTop > that.children[1].clientHeight + that.children[0].clientHeight:
    //           this.menuClass = 2;
    //           break;
    //       }
    //     }, false);
    //   }
    // },
    methods: {
      menu_navFn(name, index) {
        //点击类型
        this.menuClass = this.menuClass == index ? index : index;

      },
      add(item, index, event) {
        const _this = this;
        if (this.cache) {
          _this.cache = false;
          const div = document.createElement('div');
          const i = document.createElement('i');
          const height = document.documentElement.clientHeight;
          div.className = "flyball";
          i.className = "inner";
          i.style.transform = " translate3d(0px," + event.clientY + "px,8px)";
          div.style.transform = "translate3d(" + event.clientX + "px,0px,0px)";
          div.appendChild(i);
          document.body.appendChild(div);
          setTimeout(function () {
            item.qty++;
            item.bought = true;
            _this.$store.dispatch('boughtList', item);
            _this.$store.dispatch('typeCodeAdd', item.goodsid);
            div.style.transform = "translate3d(40px,0px,0px)";
            i.style.transform = " translate3d(0px," + height + "px,8px)";
            setTimeout(function () {
              _this.cache = true;
              div.remove();
            }, 700);
          }, 0);
        };
      },
      min(item, index) {
        const _this = this;
        item.qty--;
        item.bought = false;
        _this.$store.dispatch('boughtList', item);
        _this.$store.dispatch('typeCodeMin', item.goodsid);
      }
    }
  }

</script>
