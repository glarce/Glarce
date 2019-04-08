<template>
  <div>
    <alert
      v-if="data.type == 'alert'"
      :vid-id="vidId"
      :data="data"
    />
    <question
      v-if="data.type == 'question'"
      :vid-id="vidId"
      :data="data"
    />
  </div>
</template>

<script>
import alert from './interactives/alert.vue'
import question from './interactives/question.vue'

export default
{
	name: 'InteractivityLoader',
	components:
  {
  	alert,
  	question
  },
	props: ['vidId', 'data']
}
</script>
