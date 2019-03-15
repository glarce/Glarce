<template>
<a-marker v-if="barcodeData.contentType == 'video'" type='barcode' :value='barcodeData.scan' :id="'marker' + barcodeData.videoData.id">
  <videoHelper :index="index" :videoData="barcodeData.videoData" :interactivity-helper="`vidId: ${barcodeData.videoData.id}; interactivity: ${JSON.stringify(barcodeData.videoData.interactive)}`" />

  <div v-for="(inter, index) in barcodeData.videoData.interactive">
    <interactivity-loader :key="index" :name="index" :vidId="barcodeData.videoData.id" :data="inter" />
  </div>
</a-marker>
</template>

<script>
import videoHelper from './videoHelper.vue';
import interactivityLoader from './interactivityLoader.vue'

export default
{
  name: 'barcodeHelper',
  props: ['index', 'barcodeData'],
  components:
  {
    videoHelper,
    interactivityLoader
  }
}
</script>
