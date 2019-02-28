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
      this.vid = document.getElementById(`vid${this.data.vidId}`)
      console.log(this.vid);
      this.vid.ontimeupdate = this.timeUpdate

      // bypass schema change lock
      this.interactive = JSON.parse(this.data.interactivity)

      this.tick = AFRAME.utils.throttleTick(this.tick, 200, this)
    },
    timeUpdate: function() {

    },
    tick: function()
    {
      const time = this.vid.currentTime
      const interactiveLength = this.interactive.length

      for (var i = 0; i < interactiveLength; i++)
      {
        if (!this.interactive[i].executed)
        { // don't run if this has already been executed
          if (this.interactive[i].sec > time && this.interactive[i].sec + 1 > time)
          { // if the time point is within the time specified
            this.vid.pause()

            if (this.interactive[i].type == end)
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