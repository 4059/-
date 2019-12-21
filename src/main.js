import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.css'
import axios from './utils/requst'
import Component from './components'
Vue.use(ElementUi)
Vue.use(Component)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
