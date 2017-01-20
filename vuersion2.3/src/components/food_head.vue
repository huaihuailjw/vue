<template>
  <div class="shopheader">
    <div v-for="(item,index) in food" :style="{background:item.background}">
      <div class="head">
        <dl>
          <dt>
            <img :src="'static/images/'+item.img" />
          </dt>
          <dd>
            <h2>{{item.name}}</h2>
            <p>
              <span v-for="server in item.server">{{server}}</span>
            </p>
            <div class="user">
              <i>{{item.user[0]}}</i>
              <span>{{item.user[1]}}</span>
            </div>
            <div class="activity">
              {{item.activity}}
              <i class="triangle triangle-right"></i>
            </div>
          </dd>
        </dl>
      </div>
      <div class="annc">
        {{item.annc}}
      </div>
      <div class="foodnav" v-if="item.foodnav">
        <div @click="FoodNav(index)" v-for="(foodnav,index) in item.foodnav" :class="['name',foodnavIndex == index ? 'active' : '']">
          <span>{{foodnav}}</span>
        </div>
      </div>
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
  export default {
    data() {
      return {
        foodNum: getUrlQueryString("id")
      }
    },
    computed: {
      food() {
        return this.$store.state.food;
      },
      foodnavIndex() {
        return this.$store.state.foodnav;
      }
    },
    mounted() {
      this.$nextTick(function () {
        const _this = this;
        this.getFood();
      })
    },
    methods: {
      getFood() {
        const _this = this;
        this.axios.get('static/json/food.json')
          .then(function (json) {
            if (_this.$store.state.food.length == 0) {
              _this.$store.dispatch('changeFood', json.data[_this.foodNum]);
            }
          })
          .catch(function (error) {
            _this.$toast('网络不好，请稍后再试');
          });
      },
      FoodNav(index) {
        const _this = this;
        _this.$store.dispatch('changeFoodNav', index);
      }
    }
  }

</script>
