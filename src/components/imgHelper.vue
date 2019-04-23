<template>
	<a-image :src="`#imgsrc${data.id}`" :width="data.width" :height="data.heigth"></a-image>
</template>

<script>
export default {
	name: 'imgHandeler',
	props: ['data']
}
</script>
