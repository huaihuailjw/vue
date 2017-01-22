<template>
  <div class="menu" v-if="food">
    <div v-if="foodnav == 0 && food.menu_list.length == 0" class="menu-nodata">
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
        <dl v-for="(item,index) in menuList">
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
              <div v-for="ball in balls">
                <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                  <div v-show="ball.show" class="ball">
                    <div class="inner inner-hook">
                    </div>
                  </div>
                </transition>
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
  function GetQueryString(str, name) {
    str = decodeURIComponent(str);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = str.substr(str.indexOf("?") + 1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  function getUrlQueryString(name) {
    return GetQueryString(window.location.href, name);
  }

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
        foodNum: getUrlQueryString("id"),
        menuList: [],
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: []
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
    mounted() {
      this.$nextTick(function () {
        const _this = this;
        this.getList();
      })
    },
    methods: {
      getList() {
        const _this = this;
        if (_this.menuList.length == 0) {
          this.axios.get('static/json/food.json')
            .then(function (json) {
              _this.menuList.push(json.data[_this.foodNum][0].menu_list[_this.menuClass]);
            });
        };
      },
      menu_navFn(name, index) {
        //点击类型
        this.menuList = [];
        this.menuClass = this.menuClass == index ? index : index;
        this.menuList.push(this.food.menu_list[this.menuClass]);
      },
      add(item, index, event) {
        const _this = this;
        item.qty++;
        item.bought = true;
        _this.$store.dispatch('boughtList', item);
        _this.$store.dispatch('typeCodeAdd', item.goodsid);
        _this.drop(event.target);
      },
      min(item, index) {
        const _this = this;
        item.qty--;
        item.bought = false;
        _this.$store.dispatch('boughtList', item);
        _this.$store.dispatch('typeCodeMin', item.goodsid);
      },
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el) {
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  }

</script>
