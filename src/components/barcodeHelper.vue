<template>
    <a-marker v-if="barcodeData.contentType == 'videos'" type='barcode' :value='barcodeData.scan' :vidhandler="barcodeData.videoData.id">
        <videoHelper :index="index" :videoData="barcodeData.videoData"/>
    </a-marker>
</template>

<script>
import videoHelper from "./videoHelper.vue";
export default 
{
    name: "barcodeHelper",
    props: ['index', 'barcodeData'],
    components: {
        videoHelper
    }
}
</script>
