<template>
  <div>
    <md-dialog
      :md-fullscreen="false"
      :md-active.sync="display"
      :md-backdrop="false"
    >
      <md-dialog-title v-if="data.title">
        {{ data.title }}
      </md-dialog-title>
      <md-dialog-content
        v-if="data.text"
        v-html="data.text"
      />

      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="play()"
        >
          {{ btnText }}
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import EventBus from '../../scripts/eventBus'

import regulate from '../../../regulate'

export default {
	name: 'Alert',
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
		let btnText = 'Ok'
		if (typeof this.data.button !== 'undefined') {
			btnText = this.data.button
		}
		return {
			btnText,
			display: false,
			id: this.data.id
		}
	},
	mounted() {
		regulate.webInfo(`${this.id}: Mounting`)
		EventBus.$on('loadInteractive', this.loadInteractive)
	},
	methods: {
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
