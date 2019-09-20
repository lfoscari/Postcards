<template>
  <div class="field">
    <label class="label">Add {{ target }}</label>
    <div class="control">
      <input
        class="input"
        type="text"
        placeholder="Url or path"
        v-model="source"
        v-on:keyup.enter="addToArchive"
      />
    </div>
    <ul>
      <li v-for="url in archive" v-bind:key="url">
        <code>{{ url }}</code>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AddField",
  props: {
    target: String,
    archive: Array
  },
  data() {
    return {
      source: ""
    };
  },
  methods: {
    addToArchive() {
      if (this.archive.indexOf(this.source) < 0) this.archive.push(this.source);
      this.source = "";
    }
  }
};
</script>