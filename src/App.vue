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
  },
  methods:
  {}
};
</script>
