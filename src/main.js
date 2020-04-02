import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueDebounce from 'vue-debounce'

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3333'
Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(vueDebounce, {
  lock: true,
  listenTo: 'click',
  defaultTime: '2000ms',
  fireOnEmpty: false
})
new Vue({
  render: h => h(App),
}).$mount('#app')
