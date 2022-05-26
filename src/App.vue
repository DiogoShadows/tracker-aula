<template>
  <main class="columns is-multiline is-gapeless" :class="{ 'modo-escuro' : modoescuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema"/>
    </div>
    <div class="column is-three-quarters conteudo">
      <Formulario @aoCriarTarefa="salvarTarefa"/>
      <div class="list">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="tarefas.length === 0">
          Não tem tarefas
        </Box>
      </div>

    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa';
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box,
  },
  data() {
      return {
          tarefas: [] as ITarefa[],
          modoescuroAtivo: false,
      }
  },

  methods: {
      salvarTarefa (tarefa: ITarefa) {
          this.tarefas.push(tarefa);
      },

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
