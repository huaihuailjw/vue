/**
 * Created by Administrator on 2017/1/4.
 */

import * as types from './mutation-types'

export default {
  changeHead({commit}, head) {
    commit(types.head, head)
  },
  changeShop({commit}, shop) {
    commit(types.SHOP, shop)
  },
  changeFood({commit}, food) {
    commit(types.FOOD, food)
  },
  changeFoodNav({commit},foodnav){
    commit(types.FOODNAV,foodnav)
  },
  //分类总计
  typeCodeAdd({commit},typecode){
    commit(types.TYPECODEADD,typecode)
  },
  typeCodeMin({commit},typecode){
    commit(types.TYPECODEMIN,typecode)
  },
  //分类数组
  typeList({commit},typelist){
    commit(types.TYPELIST,typelist)
  },
  boughtList({commit},boughtList){
    commit(types.BOUGHTLIST,boughtList)
  }
};
