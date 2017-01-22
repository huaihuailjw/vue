<template>
  <div class="header1">
    <div class="filter-header">
      <a :class="[header_Active == index ? 'active' :'']" v-for="(item,index) in filter" @click="filterFn(index,$event)" href="javascript:"
        :data-code="index" :id="'item_'+index ">
        <span>{{item}}</span>
        <i></i>
      </a>
    </div>
    <section :class="['filter','filter_shop','filter_flex',header_Active == 0 ? 'active' :'']">
      <ul :data-num="shopNum">
        <li :class="[shopLeft_class == index ? 'active' : '']" @click="shop_nav(index)" v-for="(item,index) in shop">
          <img v-if="item.src !==''" :src="'static/images/'+item.src" />
          <span>{{item.name}}</span>
          <span class="count">{{item.count}}</span>
          <i class="triangle triangle-right"></i>
        </li>
      </ul>
      <ul>
        <li :class="[shopRight_class == item.name ? 'active' : '' ]" @click="filterName(item.name,index)" v-for="(item,index) in shopRight">
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
</template>
<script>
  export default {
    data() {
      return {
        shop: '', //获取数据
        header_Active: '-1', //点击当前头部是否加class
        shopLeft_class: '-1', //点击头部 左菜单的是否加class
        shopRight_class: '-1', //点击右菜单是否加class
        shopRight: '', //左菜单右侧是否有内容
        shopNum: "-1", //获取右侧值
        filter: [ //头部数据
          '美食',
          '排序',
          '筛选'
        ],
        sort: ['智能排序', '距离最近', '销量最高', '起送价最低', '配送速度最快', '评分最高'],
        sortClass: '-1',
        filter_extend: [{
          "name": "配送方式",
          "list": ["不限", "蜂鸟专送"]
        }, {
          "name": "商家属性 (可多选)",
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
    mounted() {
      this.dataList();
    },
    methods: {
      dataList() {
        const _this = this;
        this.axios.get('static/json/header1.json')
          .then(function (shop) {
            _this.shop = shop.data;
          })
          .catch(function (error) {
            _this.$toast('网络不好，请稍后再试');
          });
      },
      filterFn(index, event) {
        if (this.header_Active == index) {
          document.body.style = 'overflow:auto;';
          this.header_Active = '-1';
        } else {
          document.body.style = 'overflow:hidden;';
          this.header_Active = index;
        };
        //获取当前数据
        const len = this.shop.length;
        if (this.shopRight == '') {
          for (let i = 0; i < len; i++) {
            if (this.shop[i].shop != '') {
              this.shopLeft_class = i;
              this.shopRight_class = this.shop[i].shop[0].name;
              this.shopRight = this.shop[i].shop;
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
        if (this.shopNum != '-1') {
          if (this.header_Active == '-1') {
            this.filter[0] = this.shopRight[this.shopNum].name;
          };
        }
      },
      shop_nav(index) {
        //左侧高亮切换数据
        this.shopLeft_class = this.shopLeft_class == index ? index : index;
        if (this.shop[index].shop == '') {
          this.shopRight = '';
          this.header_Active = '-1';
          this.shopNum = '-1';
        } else {
          this.shopRight = this.shop[index].shop;
        };
      },
      filterName(itemName, index) {
        //右侧菜单点击 选择食品隐藏
        this.header_Active = '-1';
        this.shopRight_class = this.shopRight_class == itemName ? '-1' : itemName;
        this.filter[0] = this.shopRight[index].name;
        this.shopNum = index;
      },
      header_hide() {
        //隐藏头部内容
        this.header_Active = '-1';
        document.body.style = 'overflow:auto;';
      },
      sortFn(itemName, index) {
        const _this = this;
        this.sortClass = this.sortClass == index ? '-1' : index;
        this.filter[1] = itemName;
        this.header_hide();
        const sortNum = this.sortClass;
        const rate = this.$store.state.shop;
        const rateLen = this.$store.state.shop.length;
        switch (true) {
          case sortNum == 1:
            // 距离最近
            alert('功能未开发，请待续。');
            break;
          case sortNum == 2:
            // 计算销售最高
            const sales = [];
            for (let i = 0; i < rateLen; i++) {
              sales.push(rate[i]);
              sales.sort(function (a, b) {
                return b.rateL[2].slice(b.rateL[2].indexOf('售') + 1, b.rateL[2].length - 1) - a.rateL[2].slice(
                  a.rateL[
                    2].indexOf('售') + 1, a.rateL[2].length - 1);
              });
            };
            this.$store.dispatch('changeShop', sales);
            break;
          case sortNum == 3:
            // 起送价最低
            const send = [];
            for (let i = 0; i < rateLen; i++) {
              send.push(rate[i]);
              send.sort(function (a, b) {
                return a.limitL[0].slice(a.limitL[0].indexOf('¥') + 1, a.limitL[0].length - 2) - b.limitL[0]
                  .slice(
                    b.limitL[0].indexOf('¥') + 1, b.limitL[0].length - 2);
              });
            };
            this.$store.dispatch('changeShop', send);
            break;
          case sortNum == 4:
            // 配送速度最快
            const time = [];
            for (let i = 0; i < rateLen; i++) {
              time.push(rate[i]);
              time.sort(function (a, b) {
                return a.limitR[1].slice(0, a.limitR[1].length - 2) - b.limitR[1].slice(0, b.limitR[1].length -
                  2);
              });
            };
            this.$store.dispatch('changeShop', time);
            break;
          case sortNum == 5:
            // 评分最高
            const score = [];
            for (let i = 0; i < rateLen; i++) {
              score.push(rate[i]);
              score.sort(function (a, b) {
                return b.rateL[1] - a.rateL[1];
              });
            };
            this.$store.dispatch('changeShop', score);
            break;
          default:
            this.axios.get('static/json/rate.json')
              .then(function (json) {
                _this.$store.dispatch('changeShop', json.data);
              });
            break;
        };
      }
    }
  }

</script>
