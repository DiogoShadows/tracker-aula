import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from 'vue'
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, REMOVE_PROJETO} from "./TipoDeMutacoes";
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";

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
        notificacoes: [
            {
                id: 1,
                texto: "Uma notificação de sucesso",
                titulo: "Sucesso",
                tipo: TipoNotificacao.SUCESSO
            },
            {
                id: 2,
                texto: "Uma notificação de atenção",
                titulo: "atenção",
                tipo: TipoNotificacao.ATENCAO
            },
            {
                id: 3,
                texto: "Uma notificação de falha",
                titulo: "falha",
                tipo: TipoNotificacao.FALHA
            },
        ]
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
        [ADICIONA_TAREFA](state, tarefa: ITarefa){
            tarefa.id = new Date().toISOString();
            state.tarefas.push(tarefa);
        },
    }
})  

export function useStore() :Store<Estado> {
    return vuexUseStore(key);
}