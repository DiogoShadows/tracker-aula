<template>
    <div class="box formulario">
        <div class="columns" role="form" aria-label="Formulário para criação de uma nova tarefa">
            <div class="column is-three-quarters">
                <input text="text" class="input" placeholder="Nova tarefa" v-model="descricao"/>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadoFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Temporizador from './Temporizador.vue';

    export default defineComponent({
        name: "Formulario",
        emits: ['aoCriarTarefa'],
        components: {
            Temporizador,
        },
        data(){
            return{
                descricao: "",
            }
        },
        methods: {
            finalizarTarefa(tempoEmSegundos: number): void{
                this.$emit("aoCriarTarefa", {
                    descricao: this.descricao,
                    duracaoEmSegundos: tempoEmSegundos,
                });
                this.descricao = '';
            },
        },
    });
</script>

<style>
    .formulario{
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }
</style>
