<template>
  <div id="app" class="container hero-body">
    <div class="columns">
      <div class="column vertical is-half">
        <div>
          <Modal v-if="this.editConfig" v-on:closeModal="editConfig = false">
            <button class="button" v-on:click="exportTemplate">Export</button>
            <pre style="margin-top: 20px"><code>{{ output }}</code></pre>
            <br />
            <div class="field">
              <label class="label">Page title</label>
              <div class="control">
                <input class="input" type="text" placeholder="Title" v-model="page_data.title" />
              </div>
            </div>
            <AddField target="stylesheet" v-bind:archive="page_data.stylesheets"></AddField>
            <AddField target="script" v-bind:archive="page_data.scripts"></AddField>
          </Modal>
          <button class="button is-light" v-on:click="editConfig = true">Configuration</button>
        </div>
        <hr />
        <!-- Lista componenti diponibili -->
        <div>
          <NuggetList v-bind:nuggets="this.nuggets" v-on:addToLingot="addToLingot"></NuggetList>
        </div>
        <hr />
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
        <PreviewLingot
          v-on:nuggetList="fillNuggetList"
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

export default {
  name: "app",
  data() {
    return {
      lingot: [],
      nuggets: [],
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
    fillNuggetList(list) {
      this.nuggets = list;
    },
    addToLingot(n) {
      this.lingot.push({
        component: n,
        index: this.lingot.length
      });
    },
    removeFromLingot(i) {
      this.lingot.splice(i, 1);
    },
    updateLingot(l) {
      this.lingot = l;
      if (this.output != "") this.exportTemplate();
    },

    exportTemplate() {
      this.output = "<html>\n<head>\n";
      if (this.page_data.title)
        this.output += "\t<title>" + this.page_data.title + "</title>\n";
      this.page_data.scripts.forEach(
        // Vue ha paura della parola <\script>...
        // eslint-disable-next-line
        s => (this.output += `\t<script src="${s}"></\script>\n`)
      );
      this.page_data.stylesheets.forEach(
        s => (this.output += `\t<link href="${s}" rel="stylesheet">\n`)
      );
      this.output +=
        "</head>\n<body>\n\t" +
        this.$refs.final.childNodes[0].childNodes[0].innerHTML +
        "</body>\n</html>";
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

.ignore-css,
.ignore-css * {
  all: initial;
  display: block;
}
</style>
