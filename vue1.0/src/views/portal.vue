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
    <section class="store">
      <section v-for="(items,index) in store">
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
                <div>{{items.rateL[0]}}</div>
                <span class="rates">{{items.rateL[1]}}</span>
                <span>{{items.rateL[2]}}</span>
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
  import list from '../json/nav.js'
  import rate from '../json/rate.js'
  export default {
    data() {
      return {
        list: list,
        store: rate
      }
    },
    methods: {

    }
  }

</script>
