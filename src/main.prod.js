// 导入 Vue.js 和相关模块
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局 CSS 样式
import './assets/css/global.less'

// 导入自定义插件
import myPlugin from '@plugins/myPlugin'

// 导入 font-awesome 字体图标的 CSS 样式
import 'font-awesome/css/font-awesome.css'

// 配置 Vue.js
Vue.config.productionTip = false
Vue.use(myPlugin)

// 创建 Vue.js 实例
new Vue({
router,
store,
render: h => h(App)
}).$mount('#app')