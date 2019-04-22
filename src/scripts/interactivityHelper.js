/* global AFRAME */
import EventBus from './eventBus'

import regulate from '../../regulate'

export default function() {
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

			this.toggle = false
			this.shouldPlay = true

			// Grab the video and initialise it
			this.vid = document.getElementById(`vid${this.data.vidId}`)
			this.vid.ontimeupdate = this.timeUpdate
			this.vid.pause()
			this.vid.currentTime = 0

			// Bypass schema change lock
			this.interactive = JSON.parse(this.data.interactivity)

			// Set tick time
			this.tick = AFRAME.utils.throttleTick(this.tick, 200, this)

			// Safari handeler and setting shouldPlay
			if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
				this.safariWait = true
				this.safariEvent = false
			}

			// =======================
			// === Event Functions ===
			// =======================

			// Play video after event is triggered
			let playVid = function(id) {
				if (this.data.vidId === id) {
					// Toggle play state with hacky event code
					const event = document.createEvent('HTMLEvents')
					event.initEvent('change', true, false)
					window.dispatchEvent(event)
				}
			}.bind(this)

			// Jump while in event
			let jump = function(id, time) {
				if (this.data.vidId === id) {
					this.vid.currentTime = time
				}
			}.bind(this)

			// Play / pause the video on tap
			let tap = function() {
				this.shouldPlay = !this.shouldPlay
				this.toggle = !this.shouldPlay
			}.bind(this)

			// Safari event
			let safariDone = function(id) {
				if (this.data.vidId === id) {
					regulate.webInfo(
						`${this.data.vidId} handeler: Enabling video for safari`
					)

					// Tell program that safari is dealt with
					this.safariWait = false

					tap()
				}
			}.bind(this)

			// Add tap handeler
			window.addEventListener('click', tap)

			// === EventBus ===
			EventBus.$on('play', id => playVid(id))
			EventBus.$on('jump', data => jump(data.id, data.sec))
			EventBus.$on('safariDone', id => safariDone(id))
		},
		tick() {
			this.objectVisibility()
			this.interactiveManager()
		},
		objectVisibility() {
			if (this.el.object3D.visible === true) {
				if (this.shouldPlay && !this.toggle && !this.safariWait) {
					this.toggle = true
					this.vid.play()
				} else if (this.safariWait && !this.safariEvent) {
					EventBus.$emit('safari', this.data.vidId)
					this.safariEvent = true
				}
			} else if (this.toggle) {
				this.toggle = false
				this.vid.pause()
			}
		},
		interactiveManager() {
			const time = Math.floor(this.vid.currentTime)
			// Get the amount of interactives that exist
			if (time === Math.floor(this.vid.duration)) {
				for (let i = 0; i < this.interactive.length; i++) {
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
					this.vid.pause()
					this.shouldPlay = false

					if (this.interactive[i].type === 'end') {
						// Jump to end
						this.vid.currentTime = this.vid.duration
					} else {
						// Pause A-scene
						document.querySelector('a-scene').pause()

						// Send it to interactive components
						EventBus.$emit('loadInteractive', this.interactive[i].id)
					}
					this.interactive[i].executed = true
				}
			}
		}
	})
}
