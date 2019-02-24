<template>
<div v-if="display">

</div>
</template>

<script>
export default
{
  name: 'alert',
  props: ['vidId', 'data'],
  data: () =>
  {
    return {
      display: false
    }
  }
}
</script>
