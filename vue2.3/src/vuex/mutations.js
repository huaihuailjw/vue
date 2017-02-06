/**
 * Created by Administrator on 2017/1/4.
 */
import * as types from './mutation-types'
import Vue from 'vue'

export default {
  [types.HEAD](state, head) {
    state.head = head;
  },
  // 商店
  [types.SHOP](state, shop) {
    state.shop = shop;
  },
  // 食物
  [types.FOOD](state, food) {
    state.food = food;
  },
  //商品||商家
  [types.FOODNAV](state, foodnav) {
    state.foodnav = foodnav;
  },
  //类型 
  [types.TYPECODEADD](state, goodsid) {
    for (let i = 0, len = state.food[0].menu_nav.length; i < len; i++) {
      if (state.food[0].menu_nav[i].goodsid === goodsid) {
        state.food[0].menu_nav[i].num++;
        break;
      };
    };
  },
  [types.TYPECODEMIN](state, goodsid) {
    for (let i = 0, len = state.food[0].menu_nav.length; i < len; i++) {
      if (state.food[0].menu_nav[i].goodsid === goodsid) {
        if (state.food[0].menu_nav[i].num < 0) {
          state.food[0].menu_nav[i].num = 0;
        } else {
          state.food[0].menu_nav[i].num--;
        };
        break;
      };
    };
  },
  [types.TYPELIST](state, typelist) {
    state.typelist = typelist;
  },
  // 购物
  [types.BOUGHTLIST](state, boughtList) {
    if (boughtList.bought == true) {
      state.boughtList.bought += Number(boughtList.money);
      state.boughtList.num++;
      if (state.boughtList.list.length === 0) {
        state.boughtList.list.push(boughtList);
      } else {
        for (let i = 0; i < state.boughtList.list.length; i++) {
          if (state.boughtList.list[i].name === boughtList.name) {
            return false;
          };
        };
        state.boughtList.list.push(boughtList);
      }
    } else {
      state.boughtList.bought -= Number(boughtList.money);
      state.boughtList.num--;
      for (let i = 0; i < state.boughtList.list.length; i++) {
        if (state.boughtList.list[i].name === boughtList.name) {
          if (state.boughtList.list[i].qty === 0) {
            state.boughtList.list.splice(i, 1);
          };
        };
      };
    }
  },
  // //购物修改
  // [types.BOUGHTLIST](state, boughtList) {
  //   if (boughtList.bought == true) {
  //     if (state.boughtList.list.length === 0) {
  //       state.boughtList.list.push(boughtList);
  //     } else {
  //       for (let i = 0; i < state.boughtList.list.length; i++) {
  //         if (state.boughtList.list[i].name === boughtList.name) {
  //           return false;
  //         };
  //       };
  //       state.boughtList.list.push(boughtList);
  //     }
  //   } else {
  //     for (let i = 0; i < state.boughtList.list.length; i++) {
  //       if (state.boughtList.list[i].name === boughtList.name) {
  //         if (state.boughtList.list[i].qty === 0) {
  //           state.boughtList.list.splice(i, 1);
  //         };
  //       };
  //     };
  //   };
  // }
};
