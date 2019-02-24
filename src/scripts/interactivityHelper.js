export default function
{
  AFRAME.registerComponent('interactivityHelper',
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
      this.vid.ontimeupdate = this.ontimeupdate

      // bypass schema change lock
      this.interactive = this.data.interactivity

      this.tick = AFRAME.utils.throttleTick(this.tick, 200, this)
    },
    timeUpdate: function()
    {
      const time = this.vid.currentTime
      const interactiveLength = this.interactive.length

      for (var i = 0; i < interactiveLength; i++)
      {
        if (!this.interactive.executed)
        { // don't run if this has already been executed
          if (this.interactive.sec > time && this.interactive.sec + 1 > time)
          { // if the time point is within the time specified


            this.executed = true
          }
        }
      }
    },
    tick: function() {

    }
  })
}