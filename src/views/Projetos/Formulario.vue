<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/TipoDeAcoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },

  setup(props) {
    const store = useStore();
    const router = useRouter();
    const { notificar } = useNotificador();
    const nomeDoProjeto = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (projeto) => projeto.id == props.id
      );
      nomeDoProjeto.value = projeto?.nome || "";
    }

    const lidarComOSucesso = () => {
      notificar(
        TipoNotificacao.SUCESSO,
        "Excelente",
        "Projeto salvo com sucesso"
      );
      nomeDoProjeto.value = "";
      router.push("/projetos");
    };

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto.value,
          })
          .then(() => {
            lidarComOSucesso();
          });
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value).then(() => {
          lidarComOSucesso();
        });
      }
    };

    return {
      projetos: computed(() => store.state.projeto.projetos),
      nomeDoProjeto,
      salvar,
    };
  },
});
</script>
