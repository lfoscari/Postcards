<template>
  <div v-html="attributes.content"></div>
</template>

<script>
export default {
  name: "Custom",
  data() {
    return {
      attributes: {
        content: "<code>Custom</code>"
      }
    };
  }
};
</script>