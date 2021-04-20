import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.less'
// import '@plugins/element'
import myPlugin from '@plugins/myPlugin'
// import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false
Vue.use(myPlugin)
// Vue.use(infiniteScroll)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
