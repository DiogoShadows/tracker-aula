<template>
    <button :class="buttonClass" @click="botaoClick" :disabled="cronometroRodando">
      <i :class="iClass" />
    </button>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: "Botao",
        props: {
            cronometroRodando: {
                type: Boolean,
                default: false,
            },
            buttonClass: {
                type: String,
                default: 'button is-primary',
            },
            iClass: {
                type: String,
                default: 'fas fa-play',
            }
        },
        emits: ["comandoBotao"],
        methods: {
            botaoClick(){
                this.$emit('comandoBotao');
            },
        },
    });
</script>