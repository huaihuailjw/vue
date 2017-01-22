<template>
  <div class="content">
    <div>
      <div class="nav">
        <nav v-touch="list_num" class="list_item clear">
          <ul :class="{active: index == list_num ? true : false}" v-for="(item,index) in list">
            <li v-for="item in list[index]">
              <a :href="item.href">
                <div class="container">
                  <img :src="'static/images/'+item.img" />
                </div>
                <span class="title">{{item.name}}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <nav class="list">
        <ul>
          <li :class="{active: index == list_num ? true : false}" v-for="(item,index) in list"></li>
        </ul>
      </nav>
    </div>
    <h3 class="title1">
      <span><img src="static/images/icon1.png" /></span> 附近商家
    </h3>
    <shop></shop>
  </div>
</template>
<script>
  import shop from "../components/shop.vue";
  export default {
    data() {
      return {
        list: '',
        list_num: 0
      }
    },
    components: {
      shop: shop
    },
    mounted() {
      this.dataList();
    },
    methods: {
      dataList() {
        const _this = this;
        this.axios.get('static/json/nav.json')
          .then(function (json) {
            _this.list = json.data;
          })
          .catch(function (error) {
            _this.$toast('网络不好，请稍后再试');
          });
      }
    },
    directives: {
      touch(dom, binding, vnode) {
        let _dom = dom;
        let moveX, moveY, domW;
        let num = !vnode.context.list_num ? num = 1 : num = 0;
        let touchFirst_obj = {};
        _dom.ontouchstart = function (e) {
          touchFirst_obj = {
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY
          };
        };
        _dom.ontouchmove = function (e) {
          e.preventDefault();
          moveX = e.touches[0].clientX - touchFirst_obj.startX;
          moveY = e.touches[0].clientY - touchFirst_obj.startY;
          _dom.children[vnode.context.list_num].style.transform = "translate3d(" + moveX + "px, 0px, 0px)";
          _dom.children[num].style.display = "block";
          if (moveX > 50) {
            domW = _dom.children[vnode.context.list_num].clientWidth - moveX;
            _dom.children[num].style.transform = "translate3d(-" + domW + "px, 0px, 0px)";
          };
          if (moveX < -50) {
            domW = _dom.children[vnode.context.list_num].clientWidth + moveX;
            _dom.children[num].style.transform = "translate3d(" + domW + "px, 0px, 0px)";
          };
        };
        _dom.ontouchend = function (e) {
          if (!moveX || !moveY) return;
          if (moveX >= 250 || moveX <= -250) {
            vnode.context.list_num >= 1 ? vnode.context.list_num = 0 : vnode.context.list_num++;
            _dom.children[num].style.transition = '-webkit-transform 300ms ease-in-out';
            _dom.children[num].style.transform = "translate3d(0px, 0px, 0px)";
          } else {
            _dom.children[vnode.context.list_num].style.transition = '-webkit-transform 300ms ease-in-out';
            _dom.children[vnode.context.list_num].style.transform = "translate3d(0px, 0px, 0px)";
            _dom.children[num].style.transition = '-webkit-transform 300ms ease-in-out';
            if (moveX < 250 && moveX > 0) {
              _dom.children[num].style.transform = "translate3d(-" + _dom.children[num].clientWidth + "px, 0px, 0px)";
            };
            if (moveX > -250 && moveX < 0) {
              _dom.children[num].style.transform = "translate3d(" + _dom.children[num].clientWidth + "px, 0px, 0px)";
            };
          };
          setTimeout(function () {
            _dom.children[0].removeAttribute('style');
            _dom.children[1].removeAttribute('style');
          }, 300);
        };
      }
    }
  }

</script>
