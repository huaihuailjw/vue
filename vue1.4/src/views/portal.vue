<template>
  <div class="content">
    <div>
      <div class="nav">
        <nav class="list_item">
          <ul class="clear">
            <li v-for="item in list ">
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
          <li class="active"></li>
          <li></li>
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
  import shop from "../components/shop.vue"
  export default {
    data() {
      return {
        list: ''
      }
    },
    mounted() {
      this.dataList();
    },
    methods: {
      dataList() {
        const _this = this;
        this.axios.get('static/json/nav.json')
          .then(function (list) {
            _this.list = list.data;
          })
          .catch(function (error) {
            _this.$toast('网络不好，请稍后再试');
          });
      }
    },
    components: {
      shop: shop
    }
  }

</script>
