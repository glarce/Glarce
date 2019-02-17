<template>
<a-scene embedded arjs='detectionMode: mono_and_matrix; matrixCodeType: 3x3;' stats>
  <a-assets>
    <video v-for="(marker, index) in markers" autoplay preload="auto" :id="'vid' + marker.value" class="vidh" loop="true" crossorigin webkit-playsinline playsinline controls>
      <source type="video/webm" :src="marker.vid">
      <h3>Error: Your browser does not support this program.</h3>
    </video>
  </a-assets>

  <slot v-for="(marker, index) in markers">
    <!-- <slot v-if="marker.style == 'marker'">
        <a-marker :preset="marker.value">
          <a-box position="0 0.5 0" material="color: black;"></a-box>
        </a-marker>
      </slot> -->
    <slot v-if="marker.style == 'barcode'">
      <a-marker type='barcode' :value='marker.value' :vidhandler="marker.value">
        <a-video id="videoScreen" rotation="-90 0 0" :src="'#vid'+marker.value" autoplay=true></a-video>
      </a-marker>
    </slot>
  </slot>
  <a-entity camera></a-entity>
</a-scene>
</template>

<script>
export default
{
  name: "app",
  components:
  {},
  data()
  {
    return {
      markers: [
        /*{
        style: 'marker',
        value: 'hiro'
      },
      {
        style: 'marker',
        value: 'kanji'
      },
      */
        {
          style: 'barcode',
          value: 5,
          vid: 'vids/5.webm'
        }
      ]
    }
  },
  methods:
  {
    refrespage()
    {
      location.reload();
    },
    playvid()
    {
      vid.play();
    }
  },
  mounted: function()
  {
    AFRAME.registerComponent('vidhandler',
    {
      schema:
      {
        default: 0
      },
      init: function()
      {
        this.vid = document.getElementById(`vid${this.data}`)
        this.vid.pause()

        this.tick = AFRAME.utils.throttleTick(this.tick, 200, this);
      },
      tick: function()
      {
        console.log('tick')
        if (this.el.object3D.visible == true)
        {
          if (!this.toggle)
          {
            this.toggle = true
            this.vid.play()
          }
        }
        else
        {
          this.toggle = false
          this.vid.pause()
        }
      }
    });

    function refrespage()
    {
      location.reload();
    }

    function playvid()
    {
      vid.play();
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
