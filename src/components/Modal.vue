<template>
    <div class="modal" v-bind:class="{ 'is-active' : active }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title"><slot name="header"></slot></p>
                <button class="delete" aria-label="close" v-on:click="$emit('clearPreview')"></button>
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
    name: "Modal",
    props: {
        active: Boolean
    }
}
</script>