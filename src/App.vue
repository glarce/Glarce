<template>
  <a-scene
    arjs="detectionMode: mono_and_matrix; matrixCodeType: 3x3;, prodcution: true"
    :stats="`${dev}`"
  >
    <a-assets>
        <video
          v-for="(vid, index) in markers"
          autoplay
          preload="auto"
          :id="'vid'+vid.videoData.id"
          class="vidh"
          loop="true"
          crossorigin
          webkit-playsinline
          playsinline
          controls
          :type="'video/'+vid.videoData.extension"
          :src="'media/'+vid.videoData.url"
        ></video>
    </a-assets>
    <slot v-for="(marker, index) in markers">
      <!-- <slot v-if="marker.style == 'marker'">
        <a-marker :preset="marker.value">
          <a-box position="0 0.5 0" material="color: black;"></a-box>
        </a-marker>
      </slot>-->
      <slot v-if="marker.scanType == 'barcode'">
        <barcodeHelper :index="index" :barcodeData="marker"/>
      </slot>
    </slot>
    <a-entity camera></a-entity>
  </a-scene>
</template>

<script>
let marker = require("./app.json");
let dev = process.env.NODE_ENV === "development";
import barcodeHelper from "./components/barcodeHelper.vue";
export default {
  name: "app",
  components: { barcodeHelper },
  data() {
    return {
      markers: marker
    };
  },
  methods: {}
};
</script>
