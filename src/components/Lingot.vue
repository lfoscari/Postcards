<template>
  <div>
    <draggable v-model="lingotCopy" @end="$emit('updateLingot', lingotCopy)">
      <a class="button is-white is-fullwidth" v-for="(nugget, index) in lingot" v-bind:key="index">
        <a v-on:click="$emit('removeFromLingot', index)">✕</a>&nbsp;
        <span class="tag">{{ nugget.index + 1 }}</span>&nbsp;
        <span>{{ nugget.component }}</span>
      </a>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Lingot",
  props: {
    lingot: Array
  },
  data() {
    return {
      lingotCopy: undefined
    };
  },
  components: {
    draggable
  },
  mounted() {
    this.lingotCopy = this.lingot;
  }
};
</script>

<style scoped>
.button {
  cursor: move;
  justify-content: flex-start;
}

a {
  cursor: pointer;
}
</style>