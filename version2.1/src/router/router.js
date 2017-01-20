import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import portal from '../views/portal.vue'
import food from '../views/food.vue'
import login from '../views/login.vue'

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }, {
    path: '/portal',
    component: portal
  }, {
    path: '/food',
    component: food
  }, {
    path: '*',
    redirect: '/login'
  }]
})
export default router;
