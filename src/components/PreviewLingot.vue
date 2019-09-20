<template>
  <div class="ignore-css">
    <div
      v-for="(el, index) in lingot"
      v-bind:key="index"
      v-on:click="customizeAttributes(index, el)"
    >
      <keep-alive>
        <component :ref="index + '-' + el" v-bind:is="el"></component>
      </keep-alive>
    </div>
    <Modal v-if="currentCustomization != undefined" v-on:clearPreview="clearPreview">
      <template v-slot:header></template>
      <CustomizeNugget
        v-on:closeModal="clearPreview"
        v-bind:attributes="currentCustomization.attributes"
      ></CustomizeNugget>
    </Modal>
  </div>
</template>

<script>
import CustomizeNugget from "./CustomizeNugget.vue";
import Modal from "./Modal.vue";

import Title from "./nuggets/Title.vue";
import Paragraph from "./nuggets/Paragraph.vue";
import HorizontalLine from "./nuggets/HorizontalLine.vue";
import Custom from "./nuggets/Custom.vue";

export default {
  name: "PreviewLingot",
  props: {
    lingot: Array
  },
  components: {
    CustomizeNugget,
    Modal,

    Title,
    Paragraph,
    HorizontalLine,
    Custom
  },
  data() {
    return {
      currentCustomization: undefined
    };
  },
  methods: {
    customizeAttributes(index, el) {
      this.currentCustomization = this.$refs[index + "-" + el][0];
    },
    clearPreview() {
      this.currentCustomization = undefined;
      this.$emit("clearExport");
    }
  }
};
</script>