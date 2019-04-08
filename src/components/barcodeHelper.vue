<template>
  <a-marker
    v-if="barcodeData.contentType === 'video'"
    :id="markerID"
    type="barcode"
    :value="barcodeData.scan"
  >
    <videoHelper
      v-if="barcodeData.videoData.interactive"
      :index="index"
      :video-data="barcodeData.videoData"
      :interactivity-helper="`vidId: ${barcodeData.videoData.id}; interactivity: ${JSON.stringify(barcodeData.videoData.interactive)}`"
    />
    <videoHelper
      v-else
      :index="index"
      :video-data="barcodeData.videoData"
      :interactivity-helper="`vidId: ${barcodeData.videoData.id}; interactivity: ${JSON.stringify([])}`"
    />~

    <div v-if="barcodeData.videoData.interactive">
      <div
        v-for="(inter, index) in barcodeData.videoData.interactive"
        :key="index"
      >
        <interactivity-loader
          :key="index"
          :name="index"
          :vid-id="barcodeData.videoData.id"
          :data="inter"
        />
      </div>
    </div>
  </a-marker>

  <a-marker
    v-else-if="barcodeData.contentType === 'aframe'"
    :id="markerID"
    type="barcode"
    :value="barcodeData.scan"
    v-html="aframeHTML"
  />
</template>

<script>
import videoHelper from './videoHelper.vue'
import interactivityLoader from './interactivityLoader.vue'

export default
{
	name: 'BarcodeHelper',
	components:
  {
  	videoHelper,
  	interactivityLoader
  },
	props: ['index', 'barcodeData'],
	data: function()
	{
		const id = `marker${this.barcodeData.id}`

		return {
			markerID: id,
			aframeHTML: ''
		}
	},
	mounted: function()
	{
		if (this.barcodeData.contentType === 'aframe')
		{
			this.aframeHTML = this.barcodeData.aframeData.aframe.toString()

			// Run JS
			const runJS = new Function(this.barcodeData.aframeData.js)
			runJS()
		}
	}
}
</script>
