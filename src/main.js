import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import
{
  MdButton,
  MdDialog
}
from './lib/material/components'
import './lib/material/vue-material.css'
import './lib/material/theme/default-dark.css'

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