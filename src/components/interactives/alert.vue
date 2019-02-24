<template>
<div>
  <md-dialog-alert :md-active.sync="display" :md-title="data.title" :md-content="data.text" :md-confirm-text="btnText" @update:mdActive="" />
</div>
</template>

<script>
export default
{
  name: 'alert',
  props: ['vidId', 'data'],
  data: () =>
  {
    let btnText = 'Ok'

    if (this.data.button != undefined)
    {
      btnText = this.data.button
    }

    return {
      btnText: btnText,
      display: false
    }
  },
  methods:
  {
    play: function()
    {
      let vid = document.getElementById(`vid${vidId}`)
    }
  }
}
</script>
