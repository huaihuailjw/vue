import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import login from '../views/login.vue'
import portal from '../views/portal.vue'
import mall from '../views/mall.vue'
import food from '../views/food.vue'

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }, {
    path: '/portal',
    component: portal
  }, {
    path: '/mall',
    component: mall
  }, {
    path: '/food',
    component: food
  }, {
    path: '*',
    redirect: '/login'
  }]
})
export default router;
