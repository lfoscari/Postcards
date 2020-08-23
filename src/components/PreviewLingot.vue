<template>
  <div class="preview-container">
    <div class="hide" ref="output">
      <div v-for="el in lingot" v-bind:key="el.index" v-on:click="customizeAttributes(el)">
        <!-- <keep-alive> -->
        <component :ref="el.index + '-' + el.component" v-bind:is="el.component"></component>
        <!-- </keep-alive> -->
      </div>
    </div>

    <div class="frame-container">
      <iframe :srcdoc="lingotOutput"></iframe>
    </div>

    <Modal v-if="currentCustomization != undefined" v-on:closeModal="closeModal">
      <template v-slot:header></template>
      <CustomizeNugget
        v-on:closeModal="closeModal"
        v-bind:attributes="currentCustomization.attributes"
      ></CustomizeNugget>
    </Modal>
  </div>
</template>

<script>
import Vue from "vue";
import CustomizeNugget from "./CustomizeNugget.vue";
import Modal from "./Modal.vue";

import { mapState } from "vuex"; // mapGetters, mapGetter, mapActions

// Import all nuggets in directory ./nuggets
const req = require.context("./nuggets/", true, /\.(js|vue)$/i);
req.keys().map((key) => {
  const name = key.match(/\w+/)[0];
  return Vue.component(name, req(key).default);
});

export default {
  name: "PreviewLingot",
  components: {
    CustomizeNugget,
    Modal,
  },
  computed: {
    // Get data from the $store
    ...mapState(["lingot"]),
  },
  data() {
    return {
      lingotOutput: undefined,
      currentCustomization: undefined,
    };
  },
  methods: {
    customizeAttributes(el) {
      this.currentCustomization = this.$refs[el.index + "-" + el.component][0];
    },
    closeModal() {
      this.currentCustomization = undefined;
      this.$emit("clearExport");
    },
  },
  mounted() {
    this.$store.dispatch(
      "initNuggetList",
      req
        .keys()
        .map((l) => l.match(/\w+/)[0])
        .reverse()
    );
  },
  watch: {
    lingot() {
      // Watch events are fired before the DOM update, this trick prevents this issue
      setTimeout(() => {
        this.lingotOutput = this.$refs.output.innerHTML;
        this.$emit("lingotUpdate", this.lingotOutput);
      }, 0);
    },
  },
};
</script>

<style scoped>
.preview-container {
  height: 100%;
}

.frame-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.hide {
  display: none;
}

iframe {
  height: 100%;
  width: 100%;
}
</style>