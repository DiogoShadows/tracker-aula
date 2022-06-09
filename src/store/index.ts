import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {InjectionKey} from 'vue'
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, REMOVE_PROJETO} from "./TipoDeMutacoes";

interface Estado{
    projetos: IProjeto[],
    tarefas: ITarefa[],
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state:{
        projetos: [],
        tarefas: [],
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