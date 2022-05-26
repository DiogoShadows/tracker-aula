<template>
  <div class="is-flex is-align-itens-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
    <Botao :cronometroRodando="cronometroRodando" @comandoBotao="iniciarCronometro"/>
    <Botao :buttonClass="botaoFinalizar.botao" :iClass="botaoFinalizar.i" :cronometroRodando="!cronometroRodando" @comandoBotao="finalizarCronometro"/>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Cronometro from './Cronometro.vue';
    import Botao from './Botao.vue'

    export default defineComponent({
        name: "Temporizador",
        emits: ["aoTemporizadoFinalizado"],
        components: {
            Cronometro,
            Botao,
        },
        data() {
            return {
                cronometro: 0,
                tempoEmSegundos: 0,
                cronometroRodando: false,
                botaoFinalizar: {botao: "button is-danger", i: "fas fa-stop"},
            }
        },

        methods: {
            iniciarCronometro(){
                this.cronometroRodando = true;
                this.cronometro = setInterval(() => {
                    this.tempoEmSegundos++;
                }, 1000);
            },

            finalizarCronometro(){
                this.cronometroRodando = false;
                clearInterval(this.cronometro);
                this.$emit('aoTemporizadoFinalizado', this.tempoEmSegundos)
                this.tempoEmSegundos = 0;
            },
        },

    });
</script>

<style scoped>
</style>
