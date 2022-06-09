<template>
      <Formulario @aoCriarTarefa="salvarTarefa"/>
      <div class="list">
        <Tarefa v-for="tarefa in tarefas" :key="tarefa.id" :tarefa="tarefa"/>
        <Box v-if="tarefas.length === 0">
          Não tem tarefas
        </Box>
      </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';
import { ADICIONA_TAREFA } from '@/store/TipoDeMutacoes';
import { useStore } from '@/store';

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box,
  },

  methods: {
      salvarTarefa (tarefa: ITarefa) {
        this.store.commit(ADICIONA_TAREFA, tarefa)
      },
  },

  setup (){
      const store = useStore()

      return {
          tarefas: computed(() => store.state.tarefas),
          store
      }
  }
});
</script>

<style>
</style>
