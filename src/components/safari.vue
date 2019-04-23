<template>
  <div>
    <md-dialog
      :md-fullscreen="false"
      :md-active.sync="display"
      :md-backdrop="false"
    >
      <md-dialog-title>Play Video</md-dialog-title>
      <md-dialog-content>Tap the screen to play the video</md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import EventBus from '../scripts/eventBus.js'

import regulate from '../../regulate'

export default {
	name: 'Safari',
	data() {
		return {
			display: false,
			currentId: 0
		}
	},
	mounted() {
		EventBus.$on('safari', this.start)
		window.addEventListener('click', this.tap)
	},
	methods: {
		start(id) {
			regulate.webInfo(`Safari Handeler Frontend: Changing to ${id}`)
			this.currentId = id
			this.display = true
		},
		tap() {
			if (this.display) {
				this.display = false
				regulate.webInfo('Safari Handeler Frontend: Sending safari done event')
				EventBus.$emit('safariDone', this.currentId)
			}
		}
	}
}
</script>
