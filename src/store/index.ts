
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import {
  NOTIFICAR,
} from "./TipoDeMutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

export interface Estado {
  tarefa: EstadoTarefa;
  notificacoes: INotificacao[];
  projeto: EstadoProjeto;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    tarefa: {
      tarefas: [],
    },
    notificacoes: [],
    projeto: {
      projetos:[],
    }
  },
  mutations: {

    [NOTIFICAR](state, notificacao: INotificacao) {
      notificacao.id = new Date().getTime();
      state.notificacoes.push(notificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (n) => n.id != notificacao.id
        );
      }, 3000);
    },
  },
  actions: {

  },
  modules: {
    projeto,
    tarefa
  }
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
