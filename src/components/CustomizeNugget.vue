<template>
  <EditJSON
    ref="JsonEditor"
    v-bind:schema="schema"
    v-model="model"
    input-wrapping-class="control"
    v-on:submit="$emit('closeModal')"
  ></EditJSON>
</template>

<script>
import EditJSON from "vue-json-ui-editor";

export default {
  name: "CustomizeNugget",
  props: {
    attributes: Object
  },
  data() {
    return {
      schema: undefined,
      model: undefined
    };
  },
  components: {
    EditJSON
  },
  created() {
    this.model = this.attributes;
    var SCHEMA = {
      type: "object",
      title: "",
      properties: {}
    };
    for (var val in this.model)
      if (Object.prototype.hasOwnProperty.call(this.model, val)) {
        SCHEMA.properties[val] = {
          title: val,
          type: "string"
        };
      }
    this.schema = SCHEMA;
  }
};
</script>