<template>
  <div>
    <!-- <draggable v-model="lingotCopy" @end="updateLingot"> -->
    <a class="button is-white is-fullwidth" v-for="(nugget, index) in lingot" v-bind:key="index">
      <a v-on:click="removeFromLingot(index)">✕</a>&nbsp;
      <span class="tag">{{ nugget.index + 1 }}</span>&nbsp;
      <span>{{ nugget.component }}</span>
    </a>
    <!-- </draggable> -->
  </div>
</template>

<script>
// import draggable from "vuedraggable";
import { mapState } from "vuex";

export default {
  name: "Lingot",
  // components: {
  //   draggable
  // },
  computed: {
    ...mapState(["lingot"])
  },
  methods: {
    removeFromLingot(index) {
      this.$store.dispatch("removeFromLingot", index);
    }
    // updateLingot() {
    //   this.$store.dispatch("updateLingot", this.lingotCopy);
    // }
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