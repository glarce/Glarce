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
      // Grab marker element
      this.el = document.getElementById(`marker${this.data.vidId}`)

      // set toggle to false
      this.toggle = false;

      // Grab the video
      this.vid = document.getElementById(`vid${this.data.vidId}`)
      this.vid.ontimeupdate = this.timeUpdate
      this.vid.pause()
      this.vid.currentTime = 0

      // bypass schema change lock
      this.interactive = JSON.parse(this.data.interactivity)

      // Set tick time
      this.tick = AFRAME.utils.throttleTick(this.tick, 200, this)

      // Safari handeler and setting shouldPlay
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
      {
        this.shouldPlay = false

        EventBus.$emit('safari', this.data.vidId)
      }
      else
      {
        this.shouldPlay = true
      }

      // Play vidoo after event is triggured
      let playVid = function(id)
      {
        if (this.data.vidId == id)
        {
          this.shouldPlay = true
          this.toggle = false
        }
      }.bind(this)

      // Jump while in event
      let jump = function(id, time)
      {
        if (this.data.vidId == id)
        {
          this.vid.currentTime = time
        }
      }.bind(this)

      // Play / pause the video on tap
      let tap = function()
      {
        if (this.shouldPlay)
        {
          this.shouldPlay = false
          this.toggle = true
        }
        else
        {
          this.shouldPlay = true
          this.toggle = false
        }
      }.bind(this)

      // Add tap handeler
      window.addEventListener('click', tap)

      // === EventBus ===
      // On play triggure play
      EventBus.$on('play', (id) => playVid(id))
      // Jump to second
      EventBus.$on('jump', (data) => jump(data.id, data.sec))
    },
    tick: function()
    {
      // If the object is visible
      if (this.el.object3D.visible == true)
      {
        // If it should play and hasn't toggled
        if (!this.toggle && this.shouldPlay)
        {
          // Set toggle to true
          this.toggle = true

          // Play video
          this.vid.play()
        }
      }
      // If it is not visible
      else
      {
        // Only truggure if toggle hasn't been triggered on pause cycle (potential speed improvments)
        if (this.toggle)
        {
          this.toggle = false
          this.vid.pause()
        }
      }

      // Get the video time in seconds
      const time = Math.floor(this.vid.currentTime)
      // Get the amount of interactives that exist
      const interactiveLength = this.interactive.length

      // list interactives
      for (var i = 0; i < interactiveLength; i++)
      {
        // don't run if this has already been executed
        if (!this.interactive[i].executed)
        {
          // if the time point is within the time specified
          if (this.interactive[i].sec == time)
          {
            // Pause the video
            this.vid.pause()
            // set should play to false
            this.shouldPlay = false

            // Type end
            if (this.interactive[i].type == 'end')
            {
              // Jump to end
              this.vid.currentTime = this.vid.duration
            }
            // If it is something else
            else
            {
              // Send it to interactive components
              EventBus.$emit('loadInteractive', this.interactive[i].id)
            }

            // Set it to have executed
            this.interactive[i].executed = true
          }
        }
      }
    }
  })
}