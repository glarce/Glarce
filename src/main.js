import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

/* import { MdButton } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css' // This line here

Vue.use(MdButton) */

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
