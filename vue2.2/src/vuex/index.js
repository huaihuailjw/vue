/**
 * Created by Administrator on 2016/12/7.
 */
// src/store/index.js 完整代码

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
Vue.use(Vuex);

const state = {
  head: document.location.hash.substring(2),
  shop: [], //店铺
  food: [], //食物
  foodnav: 0, //商品||商店
  typeCode: '', //分类计数
  boughtList: {
    bought: 0,
    num: 0,
    list: []
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
// this.$store.state.xx 获取参数
// this.$store.dispatch('action名', 传值);
