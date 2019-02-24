<template>
<a-scene arjs="detectionMode: mono_and_matrix; matrixCodeType: 3x3;, prodcution: true" :stats="`${dev}`">
  <a-assets>
    <slot>
      <video v-for="(vid, index) in markers" v-if="vid.contentType == 'video'" autoplay preload="auto" :id="'vid'+vid.videoData.id" class="vidh" loop="true" crossorigin webkit-playsinline playsinline controls :type="'video/'+vid.videoData.extension"
        :src="vid.videoData.url"></video>
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

import interactivityHelper from './scripts/interactivityHelper'

export default
{
  name: "app",
  components:
  {
    barcodeHelper
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
