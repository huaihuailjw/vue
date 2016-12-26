import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import register from '../views/register.vue'
import login from '../views/login.vue'
import form from '../views/form.vue'


const router = new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }, {
    path: '/register',
    component: register
  }, {
    path: '/form',
    component: form
  }, {
    path: '*',
    redirect: '/login'
  }]
})
export default router;