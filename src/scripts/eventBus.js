import Vue from 'vue'

const EventBus = new Vue()

EventBus.$on('loadInteractive', id => console.log(`Interactive event: ${id}`))

export default EventBus