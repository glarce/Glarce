/* global AFRAME */
import EventBus from './eventBus'

export default function () {
  AFRAME.registerComponent('interactivity-helper', {
    schema: {
      vidId: {
        type: 'string'
      },
      interactivity: {
        defult: {}
      }
    },
    init() {
      // =============================
      // === Variable declarations ===
      // =============================

      // Grab marker element
      this.el = document.getElementById(`marker${this.data.vidId}`)

      // set toggle to false
      this.toggle = false
      // set should play to true
      this.shouldPlay = true

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
      if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        // Safari wait
        this.safariWait = true
        // Safari event sent
        this.safariEvent = false
      }

      // =======================
      // === Event Functions ===
      // =======================

      // Play vidoo after event is triggured
      let playVid = function (id) {
        if (this.data.vidId === id) {
          // Toggle play state with hacky event code
          const event = document.createEvent('HTMLEvents')
          event.initEvent('change', true, false)
          window.dispatchEvent(event)
        }
      }.bind(this)

      // Jump while in event
      let jump = function (id, time) {
        if (this.data.vidId === id) {
          this.vid.currentTime = time
        }
      }.bind(this)

      // Play / pause the video on tap
      let tap = function () {
        this.shouldPlay = !this.shouldPlay
        this.toggle = !this.shouldPlay
      }.bind(this)

      // Safari event
      let safariDone = function (id) {
        if (this.data.vidId === id) {
          console.info(`${this.data.vidId} handeler: Enabling video for safari`)

          // Tell program that safari is dealt with
          this.safariWait = false

          tap()
        }
      }.bind(this)

      // Add tap handeler
      window.addEventListener('click', tap)

      // === EventBus ===
      // On play triggure play
      EventBus.$on('play', (id) => playVid(id))
      // Jump to second
      EventBus.$on('jump', (data) => jump(data.id, data.sec))
      // Safari done
      EventBus.$on('safariDone', (id) => safariDone(id))
    },
    tick() {
      // Visibility manager
      this.objectVisibility()

      // Manage interactive systems
      this.interactiveManager()
    },
    objectVisibility() {
      // If it is visible
      if (this.el.object3D.visible === true) {
        // If it should play and hasn't toggled and safari wait
        if (!this.toggle && !this.safariWait && this.shouldPlay) {
          // Set toggle to true
          this.toggle = true

          // Play video
          this.vid.play()
        }
        // Send safari event when visible
        else if (this.safariWait && !this.safariEvent) {
          // Send safari event
          EventBus.$emit('safari', this.data.vidId)
          // Safari event sent
          this.safariEvent = true
        }
      }
      // If it is not visible
      else {
        // Only truggure if toggle hasn't been triggered on pause cycle (potential speed improvments)
        if (this.toggle) {
          this.toggle = false
          this.vid.pause()
        }
      }
    },
    interactiveManager() {
      // Get the video time in seconds
      const time = Math.floor(this.vid.currentTime)
      // Get the amount of interactives that exist
      if(time === Math.floor(this.vid.duration))
      {
        for (let i = 0; i < this.interactive.length; i++)
        {
          this.interactive[i].executed = false
        }
        this.vid.currentTime = 0
        this.vid.play()
        this.shouldPlay = true
      }
      // list interactives
      for (let i = 0; i < this.interactive.length; i++) {
        // don't run if this has already been executed and run if the time point is within the time specified
        if (!this.interactive[i].executed && this.interactive[i].sec === time) {
          // Pause the video
          this.vid.pause()
          // set should play to false
          this.shouldPlay = false

          // Type end
          if (this.interactive[i].type === 'end') {
            // Jump to end
            this.vid.currentTime = this.vid.duration
          }
          // If it is something else
          else {
            // Pause A-scene
            document.querySelector('a-scene').pause()

            // Send it to interactive components
            EventBus.$emit('loadInteractive', this.interactive[i].id)
          }

          // Set it to have executed
          this.interactive[i].executed = true
        }
      }
    }
  })
}