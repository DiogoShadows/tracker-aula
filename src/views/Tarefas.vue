<template>
  <Formulario @aoCriarTarefa="salvarTarefa" />
  <div class="list">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro"/>
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa
      v-for="tarefa in tarefas"
      :key="tarefa.id"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <Box v-if="tarefas?.length === 0">
      Não tem tarefas
    </Box>
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando tarefa</p>
          <button
            class="delete"
            @click="fecharModal"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <label for="descricaoDaTarefa" class="label"
            >Descrição da tarefa</label
          >
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          />
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="atualizarTarefa">
            Salvar alterações
          </button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";

import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/TipoDeAcoes";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },

  methods: {
    atualizarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada);
      this.fecharModal();
    },
    salvarTarefa(tarefa: ITarefa) {
      tarefa.id = new Date().toISOString();
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
  },

  setup() {
    const store = useStore();
    store.dispatch(OBTER_PROJETOS);
    store.dispatch(OBTER_TAREFAS);

    const filtro = ref("");
    // const tarefas = computed(() =>
    //   store.state.tarefa.tarefas?.filter(
    //     (x) => !filtro.value || x.descricao.includes(filtro.value)
    //   )
    // );

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro,
    };
  },
});
</script>

<style></style>
