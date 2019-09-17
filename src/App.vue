<template>
  <div id="app" class="container hero-body">
    <div class="columns">
      <div class="column is-half"> <!-- Lista componenti diponibili -->
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
      <div class="column is-half final scroll" ref="final"> <!-- Componenti inseriti -->
        <div>
          <div v-for="(n, index) in lingot" v-bind:key="index">
            <component v-bind:is="n"></component>
          </div>
        </div>
      </div>
    </div>

    <Modal
      v-bind:active="this.currentPreview != ''"
      v-on:clearPreview="currentPreview = ''"
    >
      <template v-slot:header>
        {{ currentPreview }}
      </template>
      <component v-bind:is="currentPreview"></component>
    </Modal>

  </div>
</template>

<script>
import NuggetList from './components/NuggetList.vue'
import Lingot from './components/Lingot.vue'
import Modal from './components/Modal.vue'

import Title from './components/nuggets/Title.vue'
import Paragraph from './components/nuggets/Paragraph.vue'
import HorizontalLine from './components/nuggets/HorizontalLine.vue'

export default {
  name: 'app',
  data() {
    return {
      lingot: [],
      nuggets: ['Title', 'Paragraph', 'HorizontalLine'],
      output: "",
      currentPreview: ""
    }
  },
  components: {
    Lingot,
    NuggetList,
    Modal,

    // Nuggets
    Title,
    Paragraph,
    HorizontalLine
  },
  methods: {
    addToLingot(n) {
      this.lingot.push(n)
    },
    removeFromLingot(i) {
      this.lingot.splice(i, 1)
    },
    updateLingot(l) {
      this.lingot = l
    },
    previewNugget(n) {
      this.currentPreview = this.currentPreview == n ? '' : n
    },

    exportTemplate() {
      this.output = this.$refs.final.innerHTML
    },
  }
}

</script>

<style>
  @import url('assets/bulma.min.css');

  body, html, .container {
    height: 100%;
  }

  pre {
    height: calc(100% - 2.5rem - 20px);
  }

  .container, .columns, .column {
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
