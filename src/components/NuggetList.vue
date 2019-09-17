<template>
    <div>
        <ul>
            <li v-for="n in nuggets" v-bind:key="n">
                {{ n }}
                <a href="#" v-on:click="$emit('addToLingot', n)">Add</a>&nbsp;
                <a href="#" v-on:click="$emit('previewNugget', n)">Preview</a>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'NuggetList',
    props: {
        nuggets: Array
    }
}
</script>