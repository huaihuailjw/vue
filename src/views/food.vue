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
      <section :class="['filter','filter_food','filter_flex',header_Active == 0 ? 'active' :'']">
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
      <section :class="['filter','filter_sort',header_Active == 1 ? 'active' :'']">
        <ul>
          <li :class="[sortClass == index ? 'active' : '']" v-for="(item,index) in sort" @click="sortFn(item,index)">
            <span>{{item}}</span>
          </li>
        </ul>
      </section>
      <section :class="['filter','filter_extend',header_Active == 2 ? 'active' :'']">
        <dl v-for="(item,index) in filter_extend">
          <dt>{{item.name}}</dt>
          <dd v-if="item1.icon === undefined" v-for="(item1,index) in item.list">{{item1}}</dd>
          <dd v-else>
            <i :style="{color:item1.rgb}">{{item1.icon}}</i>{{item1.name}}
          </dd>
        </dl>
        <div class="filter-btn">
          <a href="javascript:;">清空</a>
          <a href="javascript:;">确定</a>
        </div>
        <div class="undeveloped">
          此处功能未开发
        </div>
      </section>
      <div @click="header_hide" :class="['filter_bg',header_Active !== '-1' ? 'active' :'' ]"></div>
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
        filter: [ //头部数据
          '美食',
          '排序',
          '筛选'
        ],
        foodRight_class: '-1', //点击右菜单是否加class
        foodRight: '', //点击头部 左菜单右侧是否有内容
        foodNum: "-1", //获取右侧值
        sort: ['智能排序', '距离最近', '销量最高', '起送价最低', '配送速度最快', '评分最高'],
        sortClass: '-1',
        filter_extend: [{
          "name": "配送方式",
          "radio": true,
          "list": ["不限", "蜂鸟专送"]
        }, {
          "name": "商家属性 (可多选)",
          "radio": false,
          "list": [{
            "name": "品牌商家",
            "icon": "品",
            "rgb": "rgb(63, 189, 230)"
          }, {
            "name": "外卖保",
            "icon": "保",
            "rgb": "rgb(153, 153, 153)"
          }, {
            "name": "新店",
            "icon": "新",
            "rgb": "rgb(232, 132, 45)"
          }, {
            "name": "开发票",
            "icon": "票",
            "rgb": "rgb(153, 153, 153)"
          }, {
            "name": "在线支付",
            "icon": "付",
            "rgb": "rgb(255, 78, 0)"
          }, {
            "name": "准时达",
            "icon": "准",
            "rgb": "rgb(87, 169, 255)"
          }]
        }]
      }
    },
    methods: {
      filterFn(index, event) {
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
        //判断第一次点击是否选择别的食物
        //隐藏变成当前选择的食物
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
        //左侧高亮切换数据
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
        //右侧菜单点击 选择食品隐藏
        this.header_Active = '-1';
        this.foodRight_class = this.foodRight_class == itemName ? '-1' : itemName;
        this.filter[0] = this.foodRight[index].name;
        this.foodNum = index;
      },
      header_hide() {
        //隐藏头部内容
        this.header_Active = '-1';
        document.body.style = 'overflow:auto;';
      },
      sortFn(itemName, index) {
        this.sortClass = this.sortClass == index ? '-1' : index;
        this.filter[1] = itemName;
        this.header_hide();
        const sortNum = this.sortClass;
        switch (true) {
          case sortNum == 1:
            // 距离最近
            alert('功能未开发，请待续。');
            break;
          case sortNum == 2:
            // 计算销售最高
            const sales = [];
            const salesLen = rate.length;
            for (let i = 0; i < salesLen; i++) {
              sales.push(rate[i]);
              sales.sort(function (a, b) {
                return b.rateL[2].slice(b.rateL[2].indexOf('售') + 1, b.rateL[2].length - 1) - a.rateL[2].slice(
                  a.rateL[
                    2].indexOf('售') + 1, a.rateL[2].length - 1);
              });
            };
            this.store = sales;
            break;
          case sortNum == 3:
            // 起送价最低
            const send = [];
            const sendLen = rate.length;
            for (let i = 0; i < sendLen; i++) {
              send.push(rate[i]);
              send.sort(function (a, b) {
                return a.limitL[0].slice(a.limitL[0].indexOf('¥') + 1, a.limitL[0].length - 2) - b.limitL[0]
                  .slice(
                    b.limitL[0].indexOf('¥') + 1, b.limitL[0].length - 2);
              });
            };
            this.store = send;
            break;
          case sortNum == 4:
            // 配送速度最快
            const time = [];
            const timeLen = rate.length;
            for (let i = 0; i < timeLen; i++) {
              time.push(rate[i]);
              time.sort(function (a, b) {
                return a.limitR[1].slice(0, a.limitR[1].length - 2) - b.limitR[1].slice(0, b.limitR[1].length -
                  2);
              });
            };
            this.store = time;
            break;
          case sortNum == 5:
            // 评分最高
            const score = [];
            const scoreLen = rate.length;
            for (let i = 0; i < scoreLen; i++) {
              score.push(rate[i]);
              score.sort(function (a, b) {
                return b.rateL[1] - a.rateL[1];
              });
            };
            this.store = score;
            break;
          default:
            this.store = rate;
            break;
        };
      }
    }
  }

</script>
