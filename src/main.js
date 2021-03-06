import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugin/vant'
import '@/assets/css/overirride.css'
import Api from './api/index.js';
Vue.prototype.$api = Api;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
