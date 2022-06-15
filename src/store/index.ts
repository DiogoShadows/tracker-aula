import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from 'vue'
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, REMOVE_PROJETO, NOTIFICAR, DEFINIR_PROJETOS} from "./TipoDeMutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { OBTER_PROJETOS } from "./TipoDeAcoes";
import http from "@/http";

interface Estado{
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state:{
        projetos: [],
        tarefas: [],
        notificacoes: [],
    },
    mutations:{
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto

            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto){
            const index = state.projetos.findIndex(p => p.id === projeto.id);
            state.projetos[index] = projeto;
        },
        [REMOVE_PROJETO](state, id: string){
            state.projetos = state.projetos.filter(p => p.id != id);
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]){
            state.projetos = projetos;
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa){
            tarefa.id = new Date().toISOString();
            state.tarefas.push(tarefa);
        },
        [NOTIFICAR](state, notificacao: INotificacao){
            notificacao.id = new Date().getTime();
            state.notificacoes.push(notificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(n => n.id != notificacao.id);
            }, 3000)
        }
    },
    actions:{
        [OBTER_PROJETOS]({ commit }){
            http.get("projetos")
            .then(response => 
                commit(DEFINIR_PROJETOS, response.data)
            )
        }
    }
})  

export function useStore() :Store<Estado> {
    return vuexUseStore(key);
}