<template>
  <p
    v-bind:style="{ fontSize: attributes.fontSize, color: attributes.color }"
  >{{ attributes.value }}</p>
</template>

<script>
export default {
  name: "Paragraph",
  data() {
    return {
      attributes: {
        value: "Paragraph",
        color: "#000",
        fontSize: "15px"
      }
    };
  }
};
</script>