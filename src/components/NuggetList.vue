<template>
  <ul>
    <li class="button is-white is-fullwidth" v-for="nugget in nuggets" v-bind:key="nugget">
      <a v-on:click="$emit('addToLingot', nugget)">Add</a>&nbsp;
      <a v-on:click="$emit('previewNugget', nugget)">Preview</a>&nbsp;
      <span>{{ nugget }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "NuggetList",
  props: {
    nuggets: Array
  }
};
</script>

<style scoped>
.button {
  justify-content: flex-start;
  cursor: pointer;
}

.button:hover,
.button:active {
  background-color: transparent !important;
}
</style>