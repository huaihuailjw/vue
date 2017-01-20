<template>
  <div class="content">
    <section class="store">
      <section v-for="(items,index) in shop" @click="href(items.ID)">
        <dl>
          <dt>
            <img :src="'static/images/'+items.img" />
            <div v-if="items.news === true" class="logo-decoration">
              <span>新店</span>
            </div>
          </dt>
          <dd>
            <div class="title">
              <h3 :class="{premium:items.premium}">{{items.name}}</h3>
              <div class="support-wrap">
                <i v-for="support in items.support ">{{support}}</i>
              </div>
            </div>
            <div class="rate">
              <div class="rate-left">
                <div class="star">
                  <p>
                    <span v-for="q in 5"><img src="static/images/star_off.png"/></span>
                  </p>
                  <p :style="{width:items.rateL[0]*2*10+'%'}" class="star_on">
                    <span v-for="q in 5"><img src="static/images/star_on.png"/></span>
                  </p>
                </div>
                <span class="rates">{{items.rateL[0]}}</span>
                <span>{{items.rateL[1]}}</span>
              </div>
              <div class="rate-right">
                <span class="blue" v-if="items.rateR[0] === '蜂鸟专送'">{{items.rateR[0]}}</span>
                <span v-else-if="items.rateR[0]==='准时达'">{{items.rateR[0]}}</span>
                <span v-if="items.rateR[1] ==='准时达'">{{items.rateR[1]}}</span>
              </div>
            </div>
            <div class="limit">
              <div class="limit-left">
                <span>{{items.limitL[0]}}</span>
                <span>{{items.limitL[1]}}</span>
              </div>
              <div class="limit-right">
                <span>{{items.limitR[0]}}</span>
                <span>{{items.limitR[1]}}</span>
              </div>
            </div>
          </dd>
        </dl>
      </section>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    computed: { //返回列表
      shop() {
        return this.$store.state.shop;
      }
    },
    mounted() { //安装
      this.$nextTick(function () {
        const _this = this;
        this.getShop();
      })
    },
    methods: {
      getShop() { // 请求并替换数据
        const _this = this;
        _this.$store.dispatch('changeShop', []);
        if (this.$store.state.shop.length == 0) {
          this.axios.get('static/json/rate.json')
            .then(function (json) {
              _this.$store.dispatch('changeShop', json.data);
            })
            .catch(function (error) {
              _this.$toast('网络不好，请稍后再试');
            });
        };
      },
      href(index) {
        this.$store.dispatch('changeFoodNav', 0);
        this.$store.dispatch('changeFood', '');
        this.$router.push('food?id=' + index);
        // window.location = '#food?id=' + index;
      }
    }
  }

</script>
