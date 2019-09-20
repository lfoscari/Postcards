<template>
  <div id="app" class="container hero-body">
    <div class="columns">
      <div class="column vertical is-half">
        <!-- Lista componenti diponibili -->
        <div class="scroll">
          <NuggetList
            v-bind:nuggets="this.nuggets"
            v-on:addToLingot="addToLingot"
            v-on:previewNugget="previewNugget"
          ></NuggetList>
        </div>
        <div>
          <button class="button" v-on:click="exportTemplate">Export</button>
          <pre style="margin-top: 20px"><code>{{ output }}</code></pre>
          <br />
          <AddField target="stylesheet" v-bind:archive="stylesheets"></AddField>
          <AddField target="script" v-bind:archive="scripts"></AddField>
        </div>
        <!-- Componenti inseriti -->
        <div class="scroll">
          <Lingot
            v-bind:lingot="this.lingot"
            v-on:updateLingot="updateLingot"
            v-on:removeFromLingot="removeFromLingot"
          ></Lingot>
        </div>
      </div>
      <div class="column is-half final scroll" ref="final">
        <!-- Preview componenti inseriti -->
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
import AddField from "./components/AddField.vue";

// import Title from "./components/nuggets/Title.vue";
// import Paragraph from "./components/nuggets/Paragraph.vue";
// import HorizontalLine from "./components/nuggets/HorizontalLine.vue";
// import HorizontalLine from "./components/nuggets/HorizontalLine.vue";

export default {
  name: "app",
  data() {
    return {
      lingot: [],
      nuggets: ["Title", "Paragraph", "HorizontalLine", "Custom"],
      output: "",
      currentPreview: "",
      stylesheets: [],
      scripts: []
    };
  },
  components: {
    Lingot,
    NuggetList,
    Modal,
    PreviewLingot,
    AddField

    // Nuggets
    // Title: Title,
    // Paragraph: Paragraph,
    // HorizontalLine: HorizontalLine
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
      this.output = "<html>\n<head>\n";
      this.scripts.forEach(
        // Vue ha paura della parola <\script>...
        // eslint-disable-next-line
        s => (this.output += `\t<script src="${s}"></\script>\n`)
      );
      this.stylesheets.forEach(
        s => (this.output += `\t<link href="${s}" rel="stylesheet">\n`)
      );
      this.output +=
        "</head>\n<body>\n\t" +
        this.$refs.final.childNodes[0].innerHTML +
        "</body>\n</html>";
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

.vertical {
  display: flex;
  flex-direction: column;
}

.vertical > * {
  flex: 1;
}
</style>
