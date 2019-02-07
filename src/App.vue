<template>
  <a-scene embedded arjs='detectionMode: mono_and_matrix; matrixCodeType: 3x3;'>
    <slot v-for="(marker, index) in markers">
      <slot v-if="marker.style == 'marker'">
      <a-marker :preset="marker.value">
        <a-box position="0 0.5 0" material="color: black;"></a-box>
      </a-marker>
      </slot>
      <slot v-else-if="marker.style == 'barcode'">
        <a-marker type='barcode' :value='marker.value'>
          <a-box position="0 0.5 0" material="color: green;"></a-box>
        </a-marker>
      </slot>
    </slot>
    <a-entity camera></a-entity>
  </a-scene>
</template>

<script>

export default {
  name: "app",
  components: {
  },
data() {
  return {
    markers: [
      {style: 'marker', value: 'hiro'},
      {style: 'marker', value: 'kanji'},
      {style: 'barcode', value: 5}
    ]
  }
}
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
