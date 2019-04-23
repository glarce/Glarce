import Vue from 'vue'

import regulate from '../../regulate'

const EventBus = new Vue()

EventBus.$on('loadInteractive', id => regulate.webInfo(`Interactive event: ${id}`))

export default EventBus