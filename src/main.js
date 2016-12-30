// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from './router/router.js'
import Mint from 'mint-ui'
import reset from './assets/css/reset.css'
import style from './assets/css/style.css'
import mintUI from 'mint-ui/lib/style.css'
import flexible from './assets/js/flexible.js'

Vue.use(Mint);
Vue.use(VueResource);


new Vue({
  el: "#app",
  router: VueRouter,
  render: h => h(App)
})
