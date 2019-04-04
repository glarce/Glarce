<template>
<a-marker v-if="barcodeData.contentType === 'video'" type='barcode' :value='barcodeData.scan' :id="markerID">
  <videoHelper :index="index" :videoData="barcodeData.videoData" :interactivity-helper="`vidId: ${barcodeData.videoData.id}; interactivity: ${JSON.stringify(barcodeData.videoData.interactive)}`" />

  <div v-for="(inter, index) in barcodeData.videoData.interactive" :key="index">
    <interactivity-loader :key="index" :name="index" :vidId="barcodeData.videoData.id" :data="inter" />
  </div>
</a-marker>

<a-marker v-else-if="barcodeData.contentType === 'aframe'" type='barcode' :value='barcodeData.scan' :id="markerID" v-html="aframeHTML"></a-marker>
</template>

<script>
import videoHelper from './videoHelper.vue'
import interactivityLoader from './interactivityLoader.vue'

export default
{
  name: 'barcodeHelper',
  props: ['index', 'barcodeData'],
  data: function () {
    let id = `marker${this.barcodeData.id}`

    return {
      markerID: id,
      aframeHTML:''
    }
  },
  components:
  {
    videoHelper,
    interactivityLoader
  },
  mounted: function()
  {
    if (this.barcodeData.contentType === 'aframe') 
    {
      this.aframeHTML = this.barcodeData.aframeData.aframe.toString()  

      eval(this.barcodeData.aframeData.js)
    }
  }
}
</script>
