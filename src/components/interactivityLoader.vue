<template>
<div>
  <alert v-if="data.type == 'alert'" :vidId="vidId" :data="data" />
  <question v-if="data.type == 'question'" :vidId="vidId" :data="data" />
</div>
</template>

<script>
import alert from './interactives/alert.vue'
import question from './interactives/question.vue'

export default
{
  name: 'interactivityLoader',
  props: ['vidId', 'data'],
  components:
  {
    alert,
    question
  }
}
</script>
