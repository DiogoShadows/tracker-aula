import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import {
  OBTER_PROJETOS,
  CADASTRAR_PROJETO,
  ALTERAR_PROJETO,
  REMOVER_PROJETO,
} from "@/store/TipoDeAcoes";
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  REMOVE_PROJETO,
  DEFINIR_PROJETOS,
} from "@/store/TipoDeMutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
  projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;

      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((p) => p.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [REMOVE_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((p) => p.id != id);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http
        .get("projetos")
        .then((response) => commit(DEFINIR_PROJETOS, response.data));
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post("/projetos", {
        nome: nomeDoProjeto,
      });
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
      return http.put("/projetos/" + projeto.id, projeto);
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return http
        .delete("/projetos/" + id)
        .then(() => commit(REMOVE_PROJETO, id));
    },
  },
};
