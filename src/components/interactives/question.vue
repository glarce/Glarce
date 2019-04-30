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

import regulate from '../../../regulate'

export default {
	name: 'Question',
	props: {
		vidId: {
			type: Number,
			required: true
		},
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			display: false,
			id: this.data.id
		}
	},
	mounted() {
		regulate.webInfo(`${this.id}: Mounting`)
		EventBus.$on('loadInteractive', this.loadInteractive)
	},
	methods: {
		click(index) {
			regulate.webInfo(index)
			regulate.webInfo(this)
			const button = this.data.buttons[index]
			if (typeof button.jumpTo !== 'undefined') {
				regulate.webInfo(`${this.id}: Jumping to ${button.jumpTo} seconds`)
				EventBus.$emit('jump', {
					id: this.vidId,
					sec: button.jumpTo
				})
			}
			this.play()
		},
		play() {
			regulate.webInfo(`${this.id}: Playing video`)
			this.display = false
			// Start A-scene
			document.querySelector('a-scene').play()
			EventBus.$emit('play', this.vidId)
		},
		loadInteractive(id) {
			if (id === this.id) {
				regulate.webInfo(`${this.id}: Triggured`)
				this.display = true
			}
		}
	}
}
</script>
