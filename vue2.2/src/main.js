// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Mint from 'mint-ui'
import VueResource from 'vue-resource'

import axios from 'axios'
import Vueaxios from 'vue-axios'
import store from './vuex/index.js'
import VueRouter from './router/router.js'
import flexible from './assets/js/flexible.js'

import reset from './assets/css/reset.css'
import style from './assets/css/style.css'
import mintUI from 'mint-ui/lib/style.css'

Vue.use(VueResource);
Vue.use(Mint);
Vue.use(Vueaxios,axios);

new Vue({
  el: "#app",
  store: store,
  router: VueRouter,
  render: h => h(App)
});
