import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible' // 动态设置rem基准值（html标签字体大小）

import './utils/register-vant' // 注册vant组件

// 加载全局样式
import './styles/index.less'

// 加载表单验证配置项
import './utils/validation'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
