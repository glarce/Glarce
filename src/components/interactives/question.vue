<template>
  <div>
    <md-dialog
      :md-active.sync="display"
      :md-backdrop="false"
    >
      <md-dialog-title>{{ data.title }}</md-dialog-title>

      <md-dialog-content
        v-if="data.text"
        v-html="data.text"
      />

      <md-dialog-actions>
        <md-button
          v-for="(button, index) in data.buttons"
          :key="index"
          class="md-dense md-primary"
          @click="click(index)"
        >
          {{ button.text }}
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import EventBus from '../../scripts/eventBus'

export default {
	name: 'Question',
	props: ['vidId', 'data'],
	data() {
		return {
			display: false,
			id: this.data.id
		}
	},
	mounted() {
		console.log(`${this.id}: Mounting`)
		EventBus.$on('loadInteractive', this.loadInteractive)
	},
	methods: {
		click(index) {
			console.log(index)
			console.log(this)
			const button = this.data.buttons[index]
			if (typeof button.jumpTo !== 'undefined') {
				console.log(`${this.id}: Jumping to ${button.jumpTo} seconds`)
				EventBus.$emit('jump', {
					id: this.vidId,
					sec: button.jumpTo
				})
			}
			this.play()
		},
		play() {
			console.log(`${this.id}: Playing video`)
			this.display = false
			// Start A-scene
			document.querySelector('a-scene').play()
			EventBus.$emit('play', this.vidId)
		},
		loadInteractive(id) {
			if (id === this.id) {
				console.log(`${this.id}: Triggured`)
				this.display = true
			}
		}
	}
}
</script>
