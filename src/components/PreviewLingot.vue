<template>
  <div>
    <div class="ignore-css">
      <div v-for="el in lingot" v-bind:key="el.index" v-on:click="customizeAttributes(el)">
        <keep-alive>
          <component :ref="el.index + '-' + el.component" v-bind:is="el.component"></component>
        </keep-alive>
      </div>
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

import { mapState } from "vuex"; // , mapGetter, mapActions

// Import all nuggets in directory ./nuggets
const req = require.context("./nuggets/", true, /\.(js|vue)$/i);
req.keys().map(key => {
  const name = key.match(/\w+/)[0];
  return Vue.component(name, req(key).default);
});

export default {
  name: "PreviewLingot",
  components: {
    CustomizeNugget,
    Modal
  },
  computed: {
    ...mapState(["lingot"])
  },
  data() {
    return {
      currentCustomization: undefined
    };
  },
  methods: {
    customizeAttributes(el) {
      this.currentCustomization = this.$refs[el.index + "-" + el.component][0];
    },
    closeModal() {
      this.currentCustomization = undefined;
      this.$emit("clearExport");
    }
  },
  mounted() {
    // this.$emit(
    //   "nuggetList",
    //   req
    //     .keys()
    //     .map(l => l.match(/\w+/)[0])
    //     .reverse()
    // );
    this.$store.dispatch(
      "initNuggetList",
      req
        .keys()
        .map(l => l.match(/\w+/)[0])
        .reverse()
    );
  }
};
</script>