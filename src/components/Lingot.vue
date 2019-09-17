<template>
    <div>
        <ol>
            <li v-for="(nugget, index) in lingot" v-bind:key="index">
                <div class="tags has-addons">
                    <a class="tag is-delete is-white" v-on:click="$emit('removeFromLingot', index)"></a>
                    <span class="tag is-white">{{ nugget }}</span>
                </div>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    name: 'Lingot',
    props: {
        lingot: Array
    }
}
</script>