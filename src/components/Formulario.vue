<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          text="text"
          class="input"
          placeholder="Nova tarefa"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione um projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
              >{{ projeto.nome }}</option
            >
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @aoTemporizadoFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { key } from "@/store";
import { NOTIFICAR } from "@/store/TipoDeMutacoes";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
  name: "Formulario",
  emits: ["aoCriarTarefa"],
  components: {
    Temporizador,
  },
  setup(props, { emit }) {
    const descricao = ref("");
    const idProjeto = ref("");
    const store = useStore(key);
    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoEmSegundos: number): void => {
      var projeto = projetos.value.find((x) => x.id === idProjeto.value);
      if (projeto == null) {
        store.commit(NOTIFICAR, {
          titulo: "Erro ao salvar a tarefa",
          texto: "Selecione um projeto",
          tipo: TipoNotificacao.FALHA,
        });
      } else {
        emit("aoCriarTarefa", {
          descricao: descricao.value,
          duracaoEmSegundos: tempoEmSegundos,
          projeto: projetos.value.find((x) => x.id == idProjeto.value),
        });
      }

      descricao.value = "";
    };

    return {
      projetos,
      descricao,
      idProjeto,
      finalizarTarefa,
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
