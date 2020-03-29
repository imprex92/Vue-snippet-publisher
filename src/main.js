import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3333'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
