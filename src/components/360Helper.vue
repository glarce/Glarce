<template>
  <div>
    <div v-if="displayClose" class="close" @click="close360()">&times;</div>

    <md-dialog :md-active.sync="display" :md-backdrop="false">
      <md-dialog-title>360° Viewing</md-dialog-title>

      <md-dialog-content>
        <p>You are about to enter a 360° image. You can exit at any time. Do you want to continue?</p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-dense md-primary" @click="close()">No</md-button>
        <md-button class="md-dense md-primary" @click="start()">Yes</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import EventBus from "../scripts/eventBus";

export default {
  name: "360Helper",
  props: {
    index: {
      type: Number,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    display: false,
    displayClose: false
  }),
  methods: {
    close() {
      this.display = false;
    },
    start() {
      this.close();

      this.displayClose = true;

      document.getElementById("asky").attributes.src.nodeValue = `#imgsrc${
        this.index
      }`;
      document.body.lastChild.style.display = "none";

        document.body.insertAdjacentHTML('afterbegin', `<div class="close" onclick="document.body.lastChild.style.display = 'block';this.parentNode.removeChild(this)">&times;</div> ${document.body.innerHTML}`)

      EventBus.$emit("360img", this.data.img);
    }
  },
  mounted() {
    document.getElementById(`marker${this.index}`).addEventListener(
      "markerFound",
      function() {
        this.display = true;
      }.bind(this)
    );
  }
};
</script>

<style scoped>
.close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
}
</style>
