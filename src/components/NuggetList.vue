<template>
  <div>
    <ul>
      <li class="button is-white is-fullwidth" v-for="n in nuggets" v-bind:key="n">
        <a v-on:click="$emit('addToLingot', n)">Add</a>&nbsp;
        <a v-on:click="$emit('previewNugget', n)">Preview</a>&nbsp;
        <span>{{ n }}</span>
      </li>
    </ul>
  </div>
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