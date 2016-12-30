<template>
  <div>
    <div class="header1">
      <div class="filter-header">
        <a :class="[header_Active == index ? 'active' :'']" v-for="(item,index) in filter" @click="filterFn(index,$event)" href="javascript:"
          :data-code="index" :id="'item_'+index ">
          <span>{{item}}</span>
          <i></i>
        </a>
      </div>
      <section :class="['section','section_food',header_Active == 0 ? 'active' :'']">
        <ul :data-num="foodNum">
          <li :class="[foodLeft_class == index ? 'active' : '']" @click="food_nav(index)" v-for="(item,index) in food">
            <img v-if="item.src !==''" :src="'static/images/'+item.src" />
            <span>{{item.name}}</span>
            <span class="count">{{item.count}}</span>
            <i class="triangle triangle-right"></i>
          </li>
        </ul>
        <ul>
          <li :class="[foodRight_class == item.name ? 'active' : '' ]" @click="filterName(item.name,index)" v-for="(item,index) in foodRight">
            <span>{{item.name}}</span>
            <span class="count">{{item.count}}</span>
          </li>
        </ul>
      </section>
      <section :class="['section','section_food',header_Active == 1 ? 'active' :'']">
        2
      </section>
      <section :class="['section','section_food',header_Active == 2 ? 'active' :'']">
        3
      </section>
      <div @click="header_hide" :class="['section_bg',header_Active !== '-1' ? 'active' :'' ]"></div>
    </div>
    <div class="content">
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
  </div>
</template>
<script>
  import rate from '../json/rate.js'
  import section_food from '../json/section_food.js'
  export default {
    data() {
      return {
        store: rate, // 获取店铺数据
        food: section_food, //获取数据
        header_Active: '-1', //点击当前头部是否加class
        foodLeft_class: '-1', //点击头部 左菜单的是否加class
        foodRight_class: '-1', //点击右菜单是否加class
        foodRight: '', //点击头部 左菜单右侧是否有内容
        foodNum: "-1", //获取右侧值
        filter: [ //头部数据
          '美食',
          '排序',
          '筛选'
        ]
      }
    },
    methods: {
      filterFn(index, event) {
        // this.header_Active = this.header_Active == index ? '-1' : index;
        if (this.header_Active == index) {
          document.body.style = 'overflow:auto;';
          this.header_Active = '-1';
        } else {
          document.body.style = 'overflow:hidden;';
          this.header_Active = index;
        };
        //获取当前数据
        const len = this.food.length;
        if (this.foodRight == '') {
          for (let i = 0; i < len; i++) {
            if (this.food[i].food != '') {
              this.foodLeft_class = i;
              this.foodRight_class = this.food[i].food[0].name;
              this.foodRight = this.food[i].food;
              break;
            };
          };
        };
        //点击header后，文字改变。
        if (this.header_Active == 0) {
          this.filter[0] = '分类';
        } else {
          this.filter[0] = '美食';
        };
        if (this.foodNum != '-1') {
          if (this.header_Active == '-1') {
            this.filter[0] = this.foodRight[this.foodNum].name;
          };
        }
      },
      food_nav(index) {
        //切换右菜单数据
        this.foodLeft_class = this.foodLeft_class == index ? '-1' : index;
        if (this.food[index].food == '') {
          this.foodRight = '';
          this.header_Active = '-1';
          this.foodNum = '-1';
        } else {
          this.foodRight = this.food[index].food;
        };
      },
      filterName(itemName, index) {
        //右侧菜单点击
        this.header_Active = '-1';
        this.foodRight_class = this.foodRight_class == itemName ? '-1' : itemName;
        this.filter[0] = this.foodRight[index].name;
        this.foodNum = index;
      },
      header_hide() {
        this.header_Active = '-1';
        document.body.style = 'overflow:auto;';
      }
    }
  }

</script>
