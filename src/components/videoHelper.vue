<template>
    <a-video :id="`videoScreen${index}`" rotation="-90 0 0" :src="'#vid'+videoData.id" autoplay="true" :width="16 / 3" :height="9 / 3"></a-video>
</template>

<script>
export default {
  name: "videoHelper",
  props: ['index', 'videoData'],
  mounted: function()
  {
    AFRAME.registerComponent('vidhandler',
    {
      schema:
      {
        default: 0
      },
      init: function()
      {
        this.vid = document.getElementById(`vid${this.el.attributes.vidhandler.value}`)
        console.log(this.vid)
        this.vid.pause()

        this.tick = AFRAME.utils.throttleTick(this.tick, 200, this);
      },
      tick: function()
      {
        if (this.el.object3D.visible == true)
        {
          if (!this.toggle)
          {
            this.toggle = true
            this.vid.play()
          }
        }
        else
        {
          this.toggle = false
          this.vid.pause()
        }
      }
    })
  }
}
</script>
