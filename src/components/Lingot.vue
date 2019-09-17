<template>
    <div>
        <ol>
            <draggable v-model="lingotCopy" @end="$emit('updateLingot', lingotCopy)">
                <li v-for="(nugget, index) in lingot" v-bind:key="index">
                    <div class="tags has-addons">
                        <a class="tag is-delete is-white" v-on:click="$emit('removeFromLingot', index)"></a>
                        <span class="tag is-white">{{ nugget }}</span>
                    </div>
                </li>
            </draggable>
        </ol>
    </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
    name: 'Lingot',
    props: {
        lingot: Array
    },
    data() {
        return {
            lingotCopy: undefined
        }
    },
    components: {
        draggable
    },
    mounted() {
        this.lingotCopy = this.lingot
    }
}
</script>