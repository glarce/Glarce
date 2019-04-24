<template>
	<a-image :src="`#imgsrc${index}`" :width="data.width" :height="data.height" rotation="-90 0 0"></a-image>
</template>

<script>
export default {
	name: 'imgHandeler',
	props: {
		index: {
			type: Number,
			required: true
		},
		data: {
			type: Object,
			required: true
		}
	}
}
</script>
