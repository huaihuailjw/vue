import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import login from '../views/login.vue'
import portal from '../views/portal.vue'
import mall from '../views/mall.vue'
import food from '../views/food.vue'

const router = new VueRouter({
  routes: [{
    path: "/login",
    component: login,
    name: "登陆"
  }, {
    path: "/portal",
    component: portal,
    name: "首页"
  }, {
    path: "/mall",
    component: mall,
    name: "美食"
  }, {
    path: "/food",
    component: food
  }, {
    path: "*",
    redirect: "/login"
  }]
})

export default router;
