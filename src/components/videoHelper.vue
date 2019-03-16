<template>
<a-video :id="`videoScreen${index}`" rotation="-90 0 0" :src="'#vid'+videoData.id" autoplay="true" :width="videoData.width" :height="videoData.height"></a-video>
</template>

<script>
export default
{
  name: 'videoHelper',
  props: ['index', 'videoData']
}
</script>
