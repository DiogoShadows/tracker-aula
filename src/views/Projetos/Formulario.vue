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
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/TipoDeAcoes";

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        (projeto) => projeto.id === this.id
      );
      this.nomeDoProjeto = projeto?.nome || "";
    }
  },
  data() {
    return {
      nomeDoProjeto: "",
    };
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store
          .dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto,
          })
          .then(() => {
            this.lidarComOSucesso();
          });
      } else {
        this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto).then(() => {
          this.lidarComOSucesso();
        });
      }
    },
    lidarComOSucesso() {
      this.notificar(
        TipoNotificacao.SUCESSO,
        "Excelente",
        "Projeto salvo com sucesso"
      );
      this.nomeDoProjeto = "";
      this.$router.push("/projetos");
    },
  },

  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      projetos: computed(() => store.state.projetos),
      notificar,
    };
  },
});
</script>
