import EventBus from './eventBus'

export default function()
{
  AFRAME.registerComponent('interactivity-helper',
  {
    schema:
    {
      vidId:
      {
        type: 'string'
      },
      interactivity:
      {
        defult:
        {}
      }
    },
    init: function()
    {
      this.el = document.getElementById(`marker${this.data.vidId}`)
      this.toggle = false;

      this.vid = document.getElementById(`vid${this.data.vidId}`)
      this.vid.ontimeupdate = this.timeUpdate
      this.vid.pause()
      this.vid.currentTime = 0

      this.shouldPlay = true

      // bypass schema change lock
      this.interactive = JSON.parse(this.data.interactivity)

      this.tick = AFRAME.utils.throttleTick(this.tick, 200, this)

      let self = this

      let playVid = function(id)
      {
        if (this.data.vidId == id)
        {
          this.shouldPlay = true
          this.toggle = false
        }
      }.bind(this)

      let jump = function(id, time)
      {
        if (this.data.vidId == id)
        {
          this.vid.currentTime = time
        }
      }.bind(this)

      EventBus.$on('play', (id) => playVid(id))
      EventBus.$on('jump', (data) => playVid(data.id, data.sec))
    },
    tick: function()
    {
      if (this.el.object3D.visible == true)
      {
        if (!this.toggle && this.shouldPlay)
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

      const time = Math.floor(this.vid.currentTime)
      const interactiveLength = this.interactive.length

      for (var i = 0; i < interactiveLength; i++)
      {
        if (!this.interactive[i].executed)
        { // don't run if this has already been executed
          if (this.interactive[i].sec == time)
          { // if the time point is within the time specified
            this.vid.pause()
            this.shouldPlay = false

            if (this.interactive[i].type == 'end')
            {
              this.vid.currentTime = this.vid.duration
            }
            else
            {
              EventBus.$emit('loadInteractive', this.interactive[i].id)
            }

            this.interactive[i].executed = true
          }
        }
      }
    }
  })
}