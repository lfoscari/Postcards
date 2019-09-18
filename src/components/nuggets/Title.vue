<template>
  <h1
    v-bind:style="{ fontSize: attributes.fontSize, color: attributes.color }"
  >{{ attributes.value }}</h1>
</template>

<script>
export default {
  name: "Title",
  data() {
    return {
      attributes: {
        value: "Title",
        color: "#000",
        fontSize: "30px"
      }
    };
  }
};
</script>