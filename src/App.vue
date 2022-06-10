<template>
  <main class="columns is-multiline is-gapeless" :class="{ 'modo-escuro' : modoescuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarters conteudo">
      <Notificacoes/>
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Notificacoes
},
  data() {
      return {
          modoescuroAtivo: false,
      }
  },

  methods: {

      trocarTema(temaEscuro: boolean) {
          this.modoescuroAtivo = temaEscuro;
      },
  }
});
</script>

<style>
  main {
    --bg-primario: #fff;
    --texto-primario: #000;
  }

  main.modo-escuro {
    --bg-primario: rgb(41, 9, 61);
    --texto-primario: white;
  }

  .conteudo{
    background-color: var(--bg-primario);
  }
</style>
