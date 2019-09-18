<template>
  <div id="app" class="container hero-body">
    <div class="columns">
      <div class="column is-half">
        <!-- Lista componenti diponibili -->
        <div class="third scroll">
          <NuggetList
            v-bind:nuggets="this.nuggets"
            v-on:addToLingot="addToLingot"
            v-on:previewNugget="previewNugget"
          ></NuggetList>
        </div>
        <div class="third">
          <button class="button" v-on:click="exportTemplate">Export</button>
          <pre style="margin-top: 20px"><code>{{ output }}</code></pre>
        </div>
        <div class="third scroll">
          <Lingot
            v-bind:lingot="this.lingot"
            v-on:updateLingot="updateLingot"
            v-on:removeFromLingot="removeFromLingot"
          ></Lingot>
        </div>
      </div>
      <div class="column is-half final scroll" ref="final">
        <!-- Componenti inseriti -->
        <PreviewLingot v-on:clearExport="clearExport" v-bind:lingot="this.lingot"></PreviewLingot>
      </div>
    </div>

    <Modal v-if="this.currentPreview != ''" v-on:clearPreview="currentPreview = ''">
      <template v-slot:header>{{ currentPreview }}</template>
      <component v-bind:is="currentPreview"></component>
    </Modal>
  </div>
</template>

<script>
import NuggetList from "./components/NuggetList.vue";
import Lingot from "./components/Lingot.vue";
import Modal from "./components/Modal.vue";
import PreviewLingot from "./components/PreviewLingot.vue";

import Title from "./components/nuggets/Title.vue";
import Paragraph from "./components/nuggets/Paragraph.vue";
import HorizontalLine from "./components/nuggets/HorizontalLine.vue";

export default {
  name: "app",
  data() {
    return {
      lingot: [],
      nuggets: ["Title", "Paragraph", "HorizontalLine"],
      output: "",
      currentPreview: ""
    };
  },
  components: {
    Lingot,
    NuggetList,
    Modal,
    PreviewLingot,

    // Nuggets
    Title: Title,
    Paragraph: Paragraph,
    HorizontalLine: HorizontalLine
  },
  methods: {
    addToLingot(n) {
      this.lingot.push(n);
    },
    removeFromLingot(i) {
      this.lingot.splice(i, 1);
    },
    updateLingot(l) {
      this.lingot = l;
      if (this.output != "") this.exportTemplate();
    },

    previewNugget(n) {
      this.currentPreview = this.currentPreview == n ? "" : n;
    },

    exportTemplate() {
      this.output = this.$refs.final.childNodes[0].innerHTML;
    },
    clearExport() {
      this.output = "";
    }
  }
};
</script>

<style>
@import url("assets/bulma.min.css");

html,
body,
.container {
  height: 100%;
}

pre {
  height: calc(100% - 2.5rem - 20px);
}

.container,
.columns,
.column {
  max-height: 100%;
  height: 100%;
}

.scroll {
  max-height: 100%;
  overflow-y: scroll;
}

.third {
  height: 33%;
}

.third + .third {
  padding-top: 20px;
}
</style>
