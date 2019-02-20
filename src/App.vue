<template>
<a-scene arjs='detectionMode: mono_and_matrix; matrixCodeType: 3x3;, prodcution: true' :stats="`${dev}`">
  <a-assets>
    <slot v-if="contentTypes.videos">
      <video v-for="(vid, index) in media.videos" autoplay preload="auto" :id="'vid'+vid.key" class="vidh" loop="true" crossorigin webkit-playsinline playsinline controls type="video/webm" :src="vid.url"></video>
    </slot>
  </a-assets>
  <slot v-for="(marker, index) in markers">
    <!-- <slot v-if="marker.style == 'marker'">
        <a-marker :preset="marker.value">
          <a-box position="0 0.5 0" material="color: black;"></a-box>
        </a-marker>
      </slot> -->
    <slot v-if="marker.scanType == 'barcode'">
      <barcodeHelper :index="index" :barcodeData="marker.barcodeData" />
    </slot>
  </slot>
  <a-entity camera></a-entity>
</a-scene>
</template>

<script>
let dev = process.env.NODE_ENV === 'development'
import barcodeHelper from "./components/barcodeHelper.vue";
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
      contentTypes:
      {
        videos: "true"
      },
      media:
      {
        videos: [
        {
          key: "spook",
          url: "vids/5.webm"
        }]
      },
      markers: [
      {
        scanType: 'barcode',
        barcodeData:
        {
          scan: 5,
          contentType: "video",
          videoData:
          {
            id: "spook",
            width: 16 / 3,
            height: 9 / 3
          }
        }
      }]
    }
  },
  methods:
  {

  }
};
</script>
