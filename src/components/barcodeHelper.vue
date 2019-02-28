<template>
<a-marker v-if="barcodeData.contentType == 'video'" type='barcode' :value='barcodeData.scan' :vidhandler="barcodeData.videoData.id">
  <videoHelper :index="index" :videoData="barcodeData.videoData" :interactivity-helper="`vidId: ${barcodeData.videoData.id}; interactivity: ${JSON.stringify(barcodeData.videoData.interactive)}`" />

  <!-- <interactive v-for="inter in barcodeData.videoData.interactive" :key="inter.id" :vidId="barcodeData.videoData.id" :data="inter" /> -->
</a-marker>
</template>

<script>
import videoHelper from "./videoHelper.vue";
import interactivityLoader from './interactivityLoader.vue'

export default
{
  name: "barcodeHelper",
  props: ['index', 'barcodeData'],
  components:
  {
    videoHelper,
    interactivityLoader
  }
}
</script>
