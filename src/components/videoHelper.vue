<template>
  <a-video
    :id="`videoScreen${index}`"
    rotation="-90 0 0"
    :src="'#vid'+videoData.id"
    autoplay="true"
    :width="videoData.width"
    :height="videoData.height"
  />
</template>

<script>
export default
{
	name: 'VideoHelper',
	props: ['index', 'videoData']
}
</script>
