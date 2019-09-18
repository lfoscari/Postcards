<template>
  <div class="modal is-active">
    <div class="modal-background" v-on:click="$emit('clearPreview')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-subtitle">
          <slot name="header"></slot>
        </p>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot"></footer>
    </div>
    <button class="modal-close is-large" aria-label="close" v-on:click="$emit('clearPreview')"></button>
  </div>
</template>

<script>
export default {
  name: "Modal"
};
</script>