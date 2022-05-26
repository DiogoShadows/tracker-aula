<template>
    <div class="box" :style="estiloBox">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Box',
    data () {
        return {
            estiloBox: {
                backgroundColor: '#f5f5f5'
            },
        }
    },
})
</script>
