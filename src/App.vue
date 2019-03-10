<template>
<a-scene arjs="detectionMode: mono_and_matrix; matrixCodeType: 3x3;, prodcution: true" :stats="`${dev}`">
  <safari />

  <a-assets>
    <slot v-for="(vid, index) in markers">
      <video v-if="vid.contentType == 'video'" preload="auto" :id="'vid'+vid.videoData.id" class="vidh" loop="true" crossorigin webkit-playsinline playsinline controls>
        <source v-for="(vidSrc, index) in vid.videoData.vids" :type="'video/'+vidSrc.extension" :src="vidSrc.url">
      </video>
    </slot>
  </a-assets>
  <slot v-for="(marker, index) in markers">
    <slot v-if="marker.scanType == 'barcode'">
      <barcodeHelper :index="index" :barcodeData="marker" />
    </slot>
  </slot>
  <a-entity camera></a-entity>
</a-scene>
</template>

<script>
let marker = require("./app.json");
let dev = process.env.NODE_ENV === "development";
import barcodeHelper from "./components/barcodeHelper.vue";
import Safari from "./components/safari.vue"

import interactivityHelper from './scripts/interactivityHelper'

export default
{
  name: "app",
  components:
  {
    barcodeHelper,
    Safari
  },
  data()
  {
    return {
      markers: marker,
      dev: process.env.NODE_ENV === "development"
    };
  },
  mounted: function()
  {
    interactivityHelper()

    // Load
    document.querySelector('a-scene').addEventListener('loaded', this.orientation)

    // Future orientation changes
    window.addEventListener("orientationchange", this.orientation)
  },
  methods:
  {
    orientation: function()
    {
      console.log('orientation change!');

      setTimeout(function()
      {
        if (window.innerHeight > window.innerWidth)
        { // Is portrait
          console.log('portrait')
          document.querySelector('a-scene').pause()
        }
        else
        { // Is landscape
          console.log('landscape')
          document.querySelector('a-scene').play()
        }
      }, 20)
    }
  }
};
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

@media screen and (orientation:portrait) {
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
