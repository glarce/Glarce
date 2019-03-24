<template>
<a-marker type='barcode' :value='barcodeData.scan' :id="'marker' + barcodeData.videoData.id">
  <videoHelper v-if="barcodeData.contentType === 'video'" :index="index" :videoData="barcodeData.videoData" :interactivity-helper="`vidId: ${barcodeData.videoData.id}; interactivity: ${JSON.stringify(barcodeData.videoData.interactive)}`" />
  <rawHelper v-if="barcodeData.contentType === 'aframe'" :aframe="barcodeData.aframeData" />

  <div v-if="barcodeData.contentType === 'video'" v-for="(inter, index) in barcodeData.videoData.interactive">
    <interactivity-loader :key="index" :name="index" :vidId="barcodeData.videoData.id" :data="inter" />
  </div>
</a-marker>
</template>

<script>
import videoHelper from './videoHelper.vue'
import interactivityLoader from './interactivityLoader.vue'
import rawHelper from './rawHelper.vue'

export default
{
  name: 'barcodeHelper',
  props: ['index', 'barcodeData'],
  components:
  {
    videoHelper,
    interactivityLoader,
    rawHelper
  }
}
</script>
