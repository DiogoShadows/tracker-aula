<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="LogoSite" />
        </h1>
        <button class="button" @click="alterarTema">
            {{textoBotao}}
        </button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BarraLateral',
    emits: ["aoTemaAlterado"],
    data () {
        return {
            temaEscuro: false,
        }
    },
    methods: {
        alterarTema() {
            this.temaEscuro = !this.temaEscuro;
            this.$emit("aoTemaAlterado", this.temaEscuro);
        },
    },
    computed: {
        textoBotao() {
            if(this.temaEscuro) {
                return "Desativar modo escuro";
            }

            return "Ativar modo escuro";
        }
    }
});
</script>

<style scoped>
    header{
        padding: 1rem;
        background-color: rgb(60, 60, 243);
        width: 100%;
        height: 100vh;
        text-align: center;
    }

    @media only screen and (max-width: 769px){
        header{
            width: 100%;
            height: auto;
            justify-content: left;
        }
    }
</style>