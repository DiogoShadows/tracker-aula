<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input text="text" class="input" placeholder="Nova tarefa" v-model="descricao"/>
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione um projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">{{ projeto.nome }}</option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadoFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { key } from '@/store';
    import { computed, defineComponent } from 'vue';
    import { useStore } from 'vuex';
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
                idProjeto: "",
            }
        },
        methods: {
            finalizarTarefa(tempoEmSegundos: number): void{
                this.$emit("aoCriarTarefa", {
                    descricao: this.descricao,
                    duracaoEmSegundos: tempoEmSegundos,
                    projeto: this.projetos.find(x => x.id == this.idProjeto)
                });
                this.descricao = '';
            },
        },
        setup() {
            const store = useStore(key)
            return {
                projetos: computed(() => store.state.projetos),
            }
        }
    });
</script>

<style>
    .formulario{
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }
</style>
