import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import
{
  MdDialog
}
from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(MdDialog)

Vue.config.productionTip = false

new Vue(
{
  render: h => h(App),
}).$mount('#app')