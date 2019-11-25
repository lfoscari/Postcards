<template>
  <ul>
    <li class="button is-white is-fullwidth" v-for="nugget in nuggets" v-bind:key="nugget">
      <a v-on:click="addToLingotHandler(nugget)">Add</a>&nbsp;
      <span>{{ nugget }}</span>
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex"; // , mapGetter, mapActions

export default {
  name: "NuggetList",
  computed: {
    ...mapState(["nuggets"])
    // ...mapActions(["addToLingot"]) // NON FUNZIONA???
  },
  methods: {
    addToLingotHandler(nugget) {
      this.$store.dispatch("addToLingot", nugget);
    }
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