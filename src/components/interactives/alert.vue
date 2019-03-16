<template>
<div>
  <md-dialog :md-fullscreen="false" :md-active.sync="display" :md-backdrop="false">
    <md-dialog-title v-if="data.title">{{ data.title }}</md-dialog-title>
    <md-dialog-content v-if="data.text" v-html="data.text" />

    <md-dialog-actions>
      <md-button class="md-primary" @click="play()">{{ btnText }}</md-button>
    </md-dialog-actions>
  </md-dialog>
</div>
</template>

<script>
import EventBus from '../../scripts/eventBus'

export default
{
  name: 'alert',
  props: ['vidId', 'data'],
  data()
  {
    let data = this.data

    let btnText = 'Ok'

    if (typeof this.data.button !== 'undefined')
    {
      btnText = this.data.button
    }

    return {
      btnText,
      display: false,
      id: this.data.id
    }
  },
  methods:
  {
    play()
    {
      console.log(`${this.id}: Playing video`)

      this.display = false

      // Start A-scene
      document.querySelector('a-scene').play()

      EventBus.$emit('play', this.vidId)
    },
    loadInteractive(id)
    {
      if (id === this.id)
      {
        console.log(`${this.id}: Triggured`)

        this.display = true
      }
    }
  },
  mounted()
  {
    console.log(`${this.id}: Mounting`)

    EventBus.$on('loadInteractive', this.loadInteractive)
  }
}
</script>
