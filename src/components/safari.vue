<template>
<div>
  <md-dialog :md-fullscreen="false" :md-active.sync="display" :md-backdrop="false">
    <md-dialog-title>Play Video</md-dialog-title>
    <md-dialog-content>Tap the screen to play the video</md-dialog-content>
  </md-dialog>
</div>
</template>

<script>
import EventBus from '../scripts/eventBus.js'

export default
{
  name: 'safari',
  data: () =>
  {
    return {
      display: false,
      currentId: 0
    }
  },
  methods:
  {
    start: function(id)
    {
      this.currentId = id

      this.display = true
    },
    tap: function()
    {
      if (this.display)
      {
        let vid = document.getElementById(`vid${this.currentId}`)
        vid.play()
        vid.pause()

        this.display = false
      }
    }
  },
  mounted: function()
  {
    EventBus.$on('safari', this.start)

    window.addEventListener('click', this.tap)
  }
}
</script>
