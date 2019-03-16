import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import
{
  MdButton,
  MdDialog
}
from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.use(MdButton)
Vue.use(MdDialog)

Vue.config.productionTip = false


Vue.config.ignoredElements = [
  'a-scene',
  'a-assets',
  'a-marker',
  'a-video',
  'a-entity'
]

new Vue(
{
  render: h => h(App),
}).$mount('#app')