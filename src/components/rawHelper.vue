<template>
<slot v-html="this.data.aframe"></slot>
</template>

<script>
export default
{
  name: 'rawHelper',
  props: ['data'],
  mounted: function()
  {
    eval(this.data.js)
  }
};
</script>
