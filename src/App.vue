<template>
  <div id="app" class="container hero-body">
    <div class="columns">
      <div class="column vertical">
        <div>
          <Modal v-if="this.editConfig" v-on:closeModal="editConfig = false">
            <div class="field">
              <label class="label">Page title</label>
              <div class="control">
                <input class="input" type="text" placeholder="Title" v-model="page_data.title" />
              </div>
            </div>
            <AddField target="stylesheet" v-bind:archive="page_data.stylesheets"></AddField>
            <AddField target="script" v-bind:archive="page_data.scripts"></AddField>
            <br />
            <pre style="margin-top: 20px"><code>{{ output }}</code></pre>
          </Modal>
          <button class="button is-light" v-on:click="openConfiguration">Configuration</button>&nbsp;
          <button class="button is-light" v-on:click="exportTemplate">Export</button>
        </div>
        <hr />
        <!-- Lista componenti diponibili -->
        <NuggetList></NuggetList>
        <hr />
        <!-- Componenti inseriti -->
        <div class="scroll">
          <Lingot></Lingot>
        </div>
        <div class="scroll"></div>
      </div>
      <div class="column is-three-quarters final scroll" ref="final">
        <!-- Preview componenti inseriti -->
        <PreviewLingot
          v-bind:output="this.output"
          v-on:clearExport="output = ''"
          v-bind:lingot="this.lingot"
        ></PreviewLingot>
      </div>
    </div>
  </div>
</template>

<script>
import NuggetList from "./components/NuggetList.vue";
import Lingot from "./components/Lingot.vue";
import PreviewLingot from "./components/PreviewLingot.vue";
import AddField from "./components/AddField.vue";
import Modal from "./components/Modal.vue";

import { mapState } from "vuex"; // , mapGetter, mapActions

export default {
  name: "app",
  data() {
    return {
      output: "",
      editConfig: false,
      page_data: {
        title: "",
        stylesheets: [],
        scripts: []
      }
    };
  },
  components: {
    Lingot,
    NuggetList,
    PreviewLingot,
    AddField,
    Modal
  },
  methods: {
    openConfiguration() {
      this.exportTemplate();
      this.editConfig = true;
    },

    exportTemplate() {
      // this.output = "data:text/html,<html><head>";
      this.output = "";
      this.output +=
        "<title>" +
        (this.page_data.title != "" ? this.page_data.title : "Insert title") +
        "</title>";
      this.page_data.stylesheets.forEach(
        s => (this.output += `<link href="${s}" rel="stylesheet">`)
      );
      this.page_data.scripts.forEach(
        // Vue ha paura della parola <\script>...
        // eslint-disable-next-line
        s => (this.output += `<script src="${s}"></\script>`)
      );
      this.output +=
        "</head><body>" +
        this.$refs.final.childNodes[0].childNodes[0].innerHTML +
        "</body></html>";
    }
  },
  computed: {
    ...mapState(["lingot", "nuggets"])
  }
};
</script>

<style>
@import url("assets/bulma.min.css");

html,
body {
  height: 100vh;
}

body,
.container {
  height: 100%;
}

.columns {
  height: 100%;
}

.columns,
.column {
  max-height: 100%;
}

.scroll {
  max-height: 100%;
  overflow-y: scroll;
}

.vertical {
  display: flex;
  flex-direction: column;
}
</style>
