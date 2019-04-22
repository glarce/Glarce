<template>
  <a-scene
    arjs="detectionMode: mono_and_matrix; matrixCodeType: 3x3;, prodcution: true"
    :stats="`${dev}`"
  >
    <safari />

    <a-assets>
      <slot v-for="(media) in markers">
        <video
          v-if="media.contentType == 'video'"
          :id="'vid'+media.videoData.id"
          :key="media.videoData.id"
          preload="auto"
          class="vidh"
          loop="true"
          crossorigin
          webkit-playsinline
          playsinline
          controls
        >
          <source
            v-for="(vidSrc, index) in media.videoData.vids"
            :key="index"
            :type="'video/'+vidSrc.extension"
            :src="vidSrc.url"
          >
        </video>

        <slot
          v-else-if="media.contentType === 'aframe'"
          v-html="media.aframeData.assets"
        />
      </slot>
    </a-assets>
    <slot v-for="(marker, index) in markers">
      <slot v-if="marker.scanType == 'barcode'">
        <barcodeHelper
          :index="index"
          :barcode-data="marker"
        />
      </slot>
    </slot>
    <a-entity camera />
  </a-scene>
</template>

<script>
const dev = process.env.NODE_ENV === 'development'
import barcodeHelper from './components/barcodeHelper.vue'
import Safari from './components/safari.vue'

import interactivityHelper from './scripts/interactivityHelper'

export default {
	name: 'App',
	components: {
		barcodeHelper,
		Safari
	},
	data() {
		const markers = require('./app.json')
		return {
			markers,
			dev: process.env.NODE_ENV === 'development'
		}
	},
	mounted() {
		interactivityHelper()

		// Load
		document
			.querySelector('a-scene')
			.addEventListener('loaded', this.orientation)

		// Future orientation changes
		window.addEventListener('orientationchange', this.orientation)
	},
	methods: {
		/**
     * Call when the window orientation changes. 
     * Desigened to reduce CPU and GPU load while not in the correct orientation.
     */
		orientation() {
			console.log('orientation change!')

			// Get CSS orientation data
			let orientation = window.matchMedia('(orientation: portrait)').matches

			/**
       * Safari recognises portrait as landscape and vice versa
       * This fucntion reverses orientation if Safari is the current browser
       */
			if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
				orientation = !orientation
			}

			if (orientation) {
				// Is portrait
				console.log('portrait')
				document.querySelector('a-scene').pause()
			} else {
				// Is landscape
				console.log('landscape')
				document.querySelector('a-scene').play()
			}
		}
	}
}
</script>

<style lang="scss">
// Kill list
#arjsDebugUIContainer,
#orientation,
.a-enter-vr {
  display: none !important;
}

#orientation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media screen and (orientation: portrait) {
  #orientation {
    display: block !important;

    width: 25%;
    height: 25%;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .a-canvas,
  video {
    display: none;
  }
}
</style>
